/**
 * Webflow Plugin for Colab
 *
 * Provides integration with Webflow's ecosystem:
 * - DevLink: Sync visual components from Webflow Designer to code
 * - Code Components: Share React components from code to Webflow Designer
 * - Webflow Cloud: Deploy Next.js/Astro apps to Webflow's edge infrastructure
 * - Assets: Upload and inject custom code/assets into Webflow sites
 */

import type { PluginAPI, Disposable } from '../../src/main/plugins/types';
import { WebflowClient } from './api/client';
import { StorageManager } from './storage/manager';
import { handleWfCommand } from './commands/wf';

const disposables: Disposable[] = [];

let client: WebflowClient | null = null;
let storage: StorageManager | null = null;
let pluginApi: PluginAPI | null = null;

// Export for use by GUI
export function getClient(): WebflowClient | null {
  return client;
}

export function getStorage(): StorageManager | null {
  return storage;
}

export function getApi(): PluginAPI | null {
  return pluginApi;
}

/**
 * Called when the plugin is activated
 */
export async function activate(api: PluginAPI): Promise<void> {
  api.log.info('Webflow plugin activating...');
  pluginApi = api;

  // Initialize storage manager
  storage = new StorageManager(api);
  await storage.initialize();

  // Initialize API client (will use stored auth if available)
  client = new WebflowClient(storage, api);

  // Create status bar item early so it can be used by settings handlers
  const statusBarItem = api.statusBar.createItem({
    id: 'webflow-status',
    text: 'Webflow',
    tooltip: 'Webflow Plugin - Click to open settings',
    color: '#4353ff',
    alignment: 'right',
    priority: 50,
  });
  disposables.push(statusBarItem);

  // Unified token type
  interface WebflowToken {
    id: string;
    token: string;
    label?: string;
    type: 'oauth' | 'site' | 'workspace';
    siteId?: string;
    workspaceId?: string;
    scopes?: string[];
    status: 'idle' | 'validating' | 'valid' | 'invalid';
    error?: string;
  }

  // Fetch and store sites for the current token
  const fetchAndStoreSites = async (token: string) => {
    try {
      const response = await fetch('https://api.webflow.com/v2/sites', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        api.state.set('sites', data.sites || []);
        api.log.info(`Fetched ${data.sites?.length || 0} sites`);
      }
    } catch (e) {
      api.log.warn('Failed to fetch sites:', e);
    }
  };

  // Update status bar based on valid tokens
  const updateStatusBar = async () => {
    const tokens = api.state.get<WebflowToken[]>('tokens') || [];
    const validTokens = tokens.filter(t => t.status === 'valid');

    if (validTokens.length > 0) {
      const labels = validTokens.map(t => t.label || t.type).slice(0, 2);
      const extra = validTokens.length > 2 ? ` +${validTokens.length - 2}` : '';

      statusBarItem.update({
        text: `Webflow: ${labels.join(', ')}${extra}`,
        color: '#00c853',
        tooltip: `Connected to Webflow - ${validTokens.length} token${validTokens.length !== 1 ? 's' : ''}`,
      });
    } else if (tokens.length > 0) {
      statusBarItem.update({
        text: 'Webflow: Validating...',
        color: '#ff9800',
        tooltip: 'Verifying tokens...',
      });
    } else {
      statusBarItem.update({
        text: 'Webflow: Not connected',
        color: '#ff9800',
        tooltip: 'Click to connect your Webflow account',
      });
    }
  };

  // Validate any token - determines type automatically
  const validateToken = async (id: string, token: string) => {
    try {
      // First try the introspect endpoint to get token info
      const introspectResponse = await fetch('https://api.webflow.com/v2/token/introspect', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (introspectResponse.ok) {
        const data = await introspectResponse.json();
        api.log.info('Token introspect response:', JSON.stringify(data));

        // Extract scopes
        const scopes: string[] = [];
        if (data.authorization?.scopes) {
          scopes.push(...data.authorization.scopes);
        }

        // Check for workspace access (OAuth or workspace token)
        if (data.workspaces && data.workspaces.length > 0) {
          const workspace = data.workspaces[0];
          api.settings.postMessage({
            type: 'tokenValidated',
            id,
            label: workspace.displayName || workspace.shortName || 'Workspace',
            tokenType: 'oauth',
            workspaceId: workspace.id,
            scopes,
          });
          // Fetch sites and update status bar
          await fetchAndStoreSites(token);
          setTimeout(() => updateStatusBar(), 500);
          return;
        }

        // Check for site access
        if (data.sites && data.sites.length > 0) {
          const site = data.sites[0];
          api.settings.postMessage({
            type: 'tokenValidated',
            id,
            label: site.displayName || site.shortName || 'Site',
            tokenType: 'site',
            siteId: site.id,
            scopes,
          });
          await fetchAndStoreSites(token);
          setTimeout(() => updateStatusBar(), 500);
          return;
        }

        // Token is valid but no clear access - try listing sites
        const tempStorage = { async getAuth() { return { accessToken: token }; } } as any;
        const tempClient = new WebflowClient(tempStorage, api);

        try {
          const sites = await tempClient.listSites();
          if (sites.length > 0) {
            // Store sites in state
            api.state.set('sites', sites);
            const site = sites[0];
            api.settings.postMessage({
              type: 'tokenValidated',
              id,
              label: site.displayName || site.shortName || 'Site',
              tokenType: sites.length > 1 ? 'oauth' : 'site',
              siteId: site.id,
              scopes,
            });
            setTimeout(() => updateStatusBar(), 500);
            return;
          }
        } catch {
          // Ignore - will fall through to error
        }

        api.settings.postMessage({
          type: 'tokenInvalid',
          id,
          error: 'Token valid but no sites or workspaces accessible',
        });
      } else {
        // Introspect failed - try direct site listing as fallback
        const tempStorage = { async getAuth() { return { accessToken: token }; } } as any;
        const tempClient = new WebflowClient(tempStorage, api);

        try {
          const sites = await tempClient.listSites();
          if (sites.length > 0) {
            const site = sites[0];
            api.settings.postMessage({
              type: 'tokenValidated',
              id,
              label: site.displayName || site.shortName || 'Site',
              tokenType: sites.length > 1 ? 'oauth' : 'site',
              siteId: site.id,
            });
            setTimeout(() => updateStatusBar(), 500);
            return;
          }
        } catch (e) {
          api.log.warn('Site listing failed:', e);
        }

        // Both introspect and site listing failed
        if (introspectResponse.status === 401) {
          api.settings.postMessage({
            type: 'tokenInvalid',
            id,
            error: 'Invalid or expired token',
          });
        } else {
          api.settings.postMessage({
            type: 'tokenInvalid',
            id,
            error: `API error: ${introspectResponse.status}`,
          });
        }
      }
    } catch (e) {
      api.log.error('Token validation error:', e);
      api.settings.postMessage({
        type: 'tokenInvalid',
        id,
        error: e instanceof Error ? e.message : 'Network error',
      });
    }
    await updateStatusBar();
  };

  // Start browser-based OAuth flow using Webflow CLI
  const startBrowserAuth = async () => {
    api.log.info('=== startBrowserAuth called ===');

    try {
      // Create a temp folder for auth
      const home = process.env.HOME || '/tmp';
      const channel = process.env.COLAB_CHANNEL || 'dev';
      const colabDir = `${home}/.colab-${channel}`;
      const authDir = `${colabDir}/.tmp-auth`;
      const envPath = `${authDir}/.env`;

      api.log.info('Step 2: Setting up auth directory: ' + authDir);

      // Create the temp auth directory
      const { mkdir, rm, exists, watch } = await import('fs/promises');
      const { existsSync, readFileSync } = await import('fs');

      try {
        await mkdir(authDir, { recursive: true });
      } catch (e) {
        api.log.warn('Could not create auth dir:', e);
      }

      api.log.info('Step 3: Running auth command...');

      // Use expect to handle interactive prompts - auto-select first site
      // Set WEBFLOW_TELEMETRY=false and DO_NOT_TRACK=1 to skip telemetry consent prompt
      const expectScript = `
        cd "${authDir}"
        export WEBFLOW_TELEMETRY=false
        export DO_NOT_TRACK=1
        expect -c '
          set timeout 120
          spawn npx -y @webflow/webflow-cli auth login --force
          expect {
            "Select the Webflow site" {
              send "\\r"
              exp_continue
            }
            "Authentication complete" {
              # Done
            }
            timeout {
              exit 1
            }
            eof
          }
        '
      `;

      api.shell.exec(expectScript, {
        cwd: authDir,
        timeout: 130000,
      }).then(r => {
        api.log.info('Auth command finished:', r.exitCode);
      }).catch(e => {
        api.log.warn('Auth command error:', e);
      });

      api.notifications.showInfo('Complete authentication in your browser...');

      // Watch for the .env file to be created using Bun's file APIs
      api.log.info('Step 4: Watching for token...');

      const checkForToken = (): string | null => {
        try {
          const fileExists = existsSync(envPath);
          api.log.info(`Checking ${envPath}: exists=${fileExists}`);
          if (fileExists) {
            const content = readFileSync(envPath, 'utf-8');
            api.log.info(`File content (${content.length} chars): ${content.slice(0, 100)}`);
            // Look for either WEBFLOW_SITE_API_TOKEN or WEBFLOW_WORKSPACE_API_TOKEN
            const match = content.match(/WEBFLOW_(?:SITE_API|WORKSPACE_API)_TOKEN="?([^"\n]+)"?/);
            if (match) {
              api.log.info('Found token match!');
              return match[1].trim();
            } else {
              api.log.warn('No token match in content');
            }
          }
        } catch (e) {
          api.log.warn('checkForToken error:', e);
        }
        return null;
      };

      // Poll using Bun's sync file APIs (fast and reliable)
      let attempts = 0;
      const maxAttempts = 180;

      const poll = () => {
        attempts++;
        const token = checkForToken();

        if (token) {
          api.log.info('Found token in .env!');

          // Clean up temp directory
          rm(authDir, { recursive: true, force: true }).catch(() => {});

          api.notifications.showInfo('Successfully authenticated with Webflow!');
          api.settings.postMessage({
            type: 'browserAuthComplete',
            token,
          });
          return;
        }

        if (attempts > maxAttempts) {
          api.log.warn('Token polling timed out');
          rm(authDir, { recursive: true, force: true }).catch(() => {});
          api.settings.postMessage({
            type: 'browserAuthFailed',
            error: 'Authentication timed out. Please try again.',
          });
          return;
        }

        // Continue polling
        setTimeout(poll, 1000);
      };

      // Start polling immediately
      setTimeout(poll, 1000);

    } catch (e) {
      api.log.error('Browser auth error:', e);
      api.settings.postMessage({
        type: 'browserAuthFailed',
        error: e instanceof Error ? e.message : 'Failed to start authentication',
      });
    }
  };

  // Share Code Components library with browser-based auth
  const shareLibraryWithBrowserAuth = async (cwd: string) => {
    api.log.info('=== shareLibraryWithBrowserAuth called ===');
    api.log.info('Project directory: ' + cwd);

    try {
      api.notifications.showInfo('Sharing library to Webflow...');

      // Use expect to handle interactive prompts like workspace selection
      // Similar to startBrowserAuth, this handles the interactive CLI
      // Note: We only auto-answer Yes/No confirmation prompts, NOT name/description prompts
      // The name and description should be pre-configured in webflow.json
      const expectScript = `
        cd "${cwd}"
        export WEBFLOW_TELEMETRY=false
        export DO_NOT_TRACK=1
        export WEBFLOW_SKIP_UPDATE_CHECKS=true
        expect -c '
          set timeout 300
          spawn bunx @webflow/webflow-cli library share
          expect {
            -re "Select.*workspace" {
              send "\\r"
              exp_continue
            }
            -re "Select.*site" {
              send "\\r"
              exp_continue
            }
            -re "trusted and secure\\\\?" {
              send "y\\r"
              exp_continue
            }
            -re "Ready to (share|update).*\\\\?" {
              send "y\\r"
              exp_continue
            }
            -re "\\\\(Y/n\\\\)" {
              send "y\\r"
              exp_continue
            }
            -re "\\\\(y/N\\\\)" {
              send "y\\r"
              exp_continue
            }
            -re "Yes/No" {
              send "Yes\\r"
              exp_continue
            }
            -re "\\\\? Yes" {
              # Already answered, continue
              exp_continue
            }
            "Successfully" {
              # Done - success
            }
            "shared successfully" {
              # Done - success
            }
            "ERROR:" {
              # Error occurred, let it finish
            }
            -re "Waiting for authentication" {
              # Browser auth in progress, keep waiting
              exp_continue
            }
            -re "https://" {
              # URL being shown (e.g., browser auth URL), continue
              exp_continue
            }
            -re "Compiling|Uploading|Creating|Collecting" {
              # Progress indicators, continue waiting
              exp_continue
            }
            timeout {
              puts "TIMEOUT"
              exit 1
            }
            eof
          }
        '
      `;

      // Set initial state - share is in progress
      api.state.set('shareLibraryStatus', {
        status: 'running',
        timestamp: Date.now(),
      });

      // Run without awaiting so browser can open
      api.shell.exec(expectScript, {
        cwd,
        timeout: 310000, // 5+ minutes
      }).then(result => {
        api.log.info('Share command finished:', result.exitCode);
        api.log.info('Output:', result.stdout);
        if (result.stderr) {
          api.log.warn('Stderr:', result.stderr);
        }

        if (result.exitCode === 0 && !result.stdout.toLowerCase().includes('error:')) {
          api.notifications.showInfo('Library shared successfully!');
          // Store result in state so slate can read it
          api.state.set('shareLibraryStatus', {
            status: 'success',
            output: result.stdout,
            timestamp: Date.now(),
          });
        } else {
          api.notifications.showError('Failed to share library');
          api.state.set('shareLibraryStatus', {
            status: 'error',
            error: result.stderr || result.stdout || 'Unknown error',
            timestamp: Date.now(),
          });
        }
      }).catch(e => {
        api.log.error('Share library error:', e);
        api.notifications.showError('Failed to share library: ' + (e instanceof Error ? e.message : String(e)));
        api.state.set('shareLibraryStatus', {
          status: 'error',
          error: e instanceof Error ? e.message : 'Failed to share library',
          timestamp: Date.now(),
        });
      });

    } catch (e) {
      api.log.error('Share library setup error:', e);
      api.notifications.showError('Failed to start share: ' + (e instanceof Error ? e.message : String(e)));
      api.state.set('shareLibraryStatus', {
        status: 'error',
        error: e instanceof Error ? e.message : 'Failed to share library',
        timestamp: Date.now(),
      });
    }
  };

  // Load token from project's .env file if it exists
  const loadEnvToken = async () => {
    try {
      const workspaceFolders = await api.workspace.getWorkspaceFolders();
      if (workspaceFolders.length === 0) return;

      const cwd = workspaceFolders[0].path;
      const envPath = `${cwd}/.env`;

      if (await api.workspace.exists(envPath)) {
        const envContent = await api.workspace.readFile(envPath);
        const match = envContent.match(/WEBFLOW_WORKSPACE_API_TOKEN=(.+)/);
        if (match) {
          const token = match[1].trim();
          // Check if we already have this token
          const existingTokens = api.state.get<WebflowToken[]>('tokens') || [];
          const alreadyHave = existingTokens.some(t => t.token === token);

          if (!alreadyHave && token) {
            api.log.info('Found Webflow token in .env, importing...');
            api.settings.postMessage({
              type: 'browserAuthComplete',
              token,
            });
          }
        }
      }
    } catch (e) {
      api.log.warn('Could not load token from .env:', e);
    }
  };

  // Listen for messages from settings UI
  const messageDisposable = api.settings.onMessage(async (message: unknown) => {
    console.log('[Webflow] Received settings message:', message);
    const msg = message as { type: string; id?: string; token?: string };

    if (msg.type === 'validateToken' && msg.id && msg.token) {
      console.log('[Webflow] Handling validateToken');
      await validateToken(msg.id, msg.token);
    } else if (msg.type === 'startBrowserAuth') {
      console.log('[Webflow] Handling startBrowserAuth');
      await startBrowserAuth();
    } else if (msg.type === 'loadEnvToken') {
      console.log('[Webflow] Handling loadEnvToken');
      await loadEnvToken();
    } else if (msg.type === 'shareLibrary') {
      console.log('[Webflow] Handling shareLibrary');
      const cwd = (msg as { cwd?: string }).cwd;
      if (cwd) {
        await shareLibraryWithBrowserAuth(cwd);
      }
    }
  });
  disposables.push(messageDisposable);

  // Register settings schema with custom component for token management
  const settingsDisposable = api.settings.registerSchema({
    title: 'Webflow',
    description: 'Connect your Webflow account to sync components, deploy apps, and manage assets',
    customSettingsComponent: 'webflow-tokens',
    fields: [
      {
        key: 'autoSync',
        label: 'Auto-sync on save',
        type: 'boolean',
        default: false,
        description: 'Automatically sync DevLink components when files change',
      },
      {
        key: 'defaultFramework',
        label: 'Default Cloud Framework',
        type: 'select',
        default: 'astro',
        description: 'Default framework for new Webflow Cloud projects',
        options: [
          { label: 'Astro', value: 'astro' },
          { label: 'Next.js', value: 'nextjs' },
        ],
      },
      {
        key: 'showNotifications',
        label: 'Show Notifications',
        type: 'boolean',
        default: true,
        description: 'Show notifications for sync and deploy events',
      },
    ],
  });
  disposables.push(settingsDisposable);

  // Register terminal command: wf <subcommand> [args]
  const terminalDisposable = api.terminal.registerCommand('wf', async (ctx) => {
    await handleWfCommand(ctx, client!, storage!, api);
  });
  disposables.push(terminalDisposable);

  // Register file decoration provider for Webflow config files
  const decorationDisposable = api.fileDecorations.registerProvider({
    provideDecoration(filePath) {
      const filename = filePath.split('/').pop() || '';

      // DevLink config
      if (filename === '.webflowrc.json') {
        return {
          badge: 'WF',
          badgeColor: '#4353ff',
          tooltip: 'Webflow DevLink project',
        };
      }

      // Code Components library config
      if (filename === 'webflow.json') {
        return {
          badge: 'WF',
          badgeColor: '#4353ff',
          tooltip: 'Webflow Code Components library',
        };
      }

      // Webflow Cloud project marker
      if (filename === '.colab.json') {
        if (filePath.includes('/cloud/')) {
          return {
            badge: 'WF',
            badgeColor: '#00c853',
            tooltip: 'Webflow Cloud project',
          };
        }
      }

      return undefined;
    },
  });
  disposables.push(decorationDisposable);

  // Initial status bar update and fetch sites if we have a valid token
  const tokens = api.state.get<WebflowToken[]>('tokens') || [];
  const validToken = tokens.find(t => t.status === 'valid');
  if (validToken?.token) {
    api.log.info('Found existing valid token, fetching sites...');
    await fetchAndStoreSites(validToken.token);
  }
  await updateStatusBar();

  // Register context menu items
  const initMenuDisposable = api.contextMenu.registerItem(
    {
      id: 'webflow-init-devlink',
      label: 'Initialize Webflow DevLink',
      context: 'fileTree',
    },
    async (ctx) => {
      if (!ctx.filePath) return;

      // Get the directory path (if file selected, use parent directory)
      const { existsSync, writeFileSync, mkdirSync } = await import('fs');
      const { statSync } = await import('fs');
      const { join, dirname } = await import('path');

      let parentDir = ctx.filePath;
      try {
        const stat = statSync(ctx.filePath);
        if (!stat.isDirectory()) {
          parentDir = dirname(ctx.filePath);
        }
      } catch {
        parentDir = dirname(ctx.filePath);
      }

      // Create a "devlink" folder inside the target directory (with unique suffix if needed)
      const folderName = api.utils.getUniqueNewName(parentDir, 'devlink');
      const targetDir = join(parentDir, folderName);
      const configPath = join(targetDir, '.webflowrc.json');

      // Create the devlink folder
      mkdirSync(targetDir, { recursive: true });

      // Check authentication
      const tokens = api.state.get<WebflowToken[]>('tokens') || [];
      const validToken = tokens.find(t => t.status === 'valid');

      if (!validToken) {
        api.notifications.showError('Not connected to Webflow. Open Settings → Webflow to connect.');
        return;
      }

      api.notifications.showInfo('Fetching your Webflow sites...');

      try {
        // Fetch sites using the API
        const sitesResponse = await fetch('https://api.webflow.com/v2/sites', {
          headers: {
            'Authorization': `Bearer ${validToken.token}`,
            'Accept': 'application/json',
          },
        });

        if (!sitesResponse.ok) {
          throw new Error(`Failed to fetch sites: ${sitesResponse.status}`);
        }

        const { sites } = await sitesResponse.json() as { sites: Array<{ id: string; displayName: string; shortName: string }> };

        if (sites.length === 0) {
          api.notifications.showError('No Webflow sites found. Make sure your token has access to at least one site.');
          return;
        }

        // Store sites in plugin state for the slate UI to use
        api.state.set('sites', sites);

        // Create .webflowrc.json without siteId - user will select site in the slate UI
        const config = {
          // siteId and siteName will be set when user selects a site in the DevLink slate
          componentsPath: './devlink',
        };
        writeFileSync(configPath, JSON.stringify(config, null, 2));

        // Add .webflowrc.json to .gitignore (will contain auth token once site is selected)
        const gitignorePath = join(targetDir, '.gitignore');
        try {
          const { readFileSync: readFs } = await import('fs');
          let gitignore = '';
          if (existsSync(gitignorePath)) {
            gitignore = readFs(gitignorePath, 'utf-8');
          }
          if (!gitignore.includes('.webflowrc.json')) {
            const addition = '\n# Webflow DevLink config (contains auth token)\n.webflowrc.json\n';
            writeFileSync(gitignorePath, gitignore + addition);
          }
        } catch (e) {
          api.log.warn('Could not update .gitignore:', e);
        }

        // Create devlink directory
        const devlinkPath = join(targetDir, 'devlink');
        if (!existsSync(devlinkPath)) {
          mkdirSync(devlinkPath, { recursive: true });
        }

        // Check/update package.json
        const packageJsonPath = join(targetDir, 'package.json');
        if (existsSync(packageJsonPath)) {
          try {
            const { readFileSync } = await import('fs');
            const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
            packageJson.devDependencies = {
              ...(packageJson.devDependencies || {}),
              '@webflow/webflow-cli': '^1.1.1',
            };
            writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
          } catch (e) {
            api.log.warn('Could not update package.json:', e);
          }
        }

        api.notifications.showInfo(`DevLink initialized! Click on .webflowrc.json to select a Webflow site.`);
        api.log.info(`DevLink initialized in ${targetDir}`);

      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        api.notifications.showError(`Failed to initialize DevLink: ${message}`);
        api.log.error('DevLink init error:', e);
      }
    }
  );
  disposables.push(initMenuDisposable);

  const syncMenuDisposable = api.contextMenu.registerItem(
    {
      id: 'webflow-sync',
      label: 'Sync Webflow Components',
      context: 'fileTree',
    },
    async (ctx) => {
      if (!ctx.filePath) return;

      const { existsSync, readFileSync } = await import('fs');
      const { statSync } = await import('fs');
      const { join, dirname } = await import('path');
      const { spawn } = await import('child_process');

      // Get the directory path
      let targetDir = ctx.filePath;
      try {
        const stat = statSync(ctx.filePath);
        if (!stat.isDirectory()) {
          targetDir = dirname(ctx.filePath);
        }
      } catch {
        targetDir = dirname(ctx.filePath);
      }

      // Find .webflowrc.json (check current dir and parents)
      let configPath = join(targetDir, '.webflowrc.json');
      let searchDir = targetDir;
      while (!existsSync(configPath)) {
        const parent = dirname(searchDir);
        if (parent === searchDir) break; // reached root
        searchDir = parent;
        configPath = join(searchDir, '.webflowrc.json');
      }

      if (!existsSync(configPath)) {
        api.notifications.showError('No DevLink configuration found. Right-click a folder and select "Initialize Webflow DevLink" first.');
        return;
      }

      // Check authentication
      const tokens = api.state.get<WebflowToken[]>('tokens') || [];
      const validToken = tokens.find(t => t.status === 'valid');

      if (!validToken) {
        api.notifications.showError('Not connected to Webflow. Open Settings → Webflow to connect.');
        return;
      }

      const config = JSON.parse(readFileSync(configPath, 'utf-8'));
      api.notifications.showInfo(`Syncing components from "${config.siteName || 'Webflow'}"...`);

      try {
        // Use bundled bun from Colab
        const bunPath = api.paths.bun;

        await new Promise<void>((resolve, reject) => {
          // Token is read from .webflowrc.json by the CLI
          const proc = spawn(bunPath, ['run', 'webflow', 'devlink', 'sync'], {
            cwd: searchDir,
            stdio: ['ignore', 'pipe', 'pipe'],
            env: {
              ...process.env,
              // Use our stored token instead of relying on config file
              WEBFLOW_SITE_API_TOKEN: validToken.token,
              // Disable telemetry prompt - we're running non-interactively
              WEBFLOW_TELEMETRY: 'false',
              DO_NOT_TRACK: '1',
            },
          });

          let output = '';
          proc.stdout.on('data', (data: Buffer) => {
            output += data.toString();
          });
          proc.stderr.on('data', (data: Buffer) => {
            output += data.toString();
          });

          proc.on('close', (code) => {
            if (code === 0) {
              resolve();
            } else {
              reject(new Error(output || `Process exited with code ${code}`));
            }
          });

          proc.on('error', reject);
        });

        api.notifications.showInfo('Components synced successfully!');
        api.log.info('DevLink sync completed');

      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);

        if (message.includes('not found') || message.includes('ENOENT')) {
          api.notifications.showError('Webflow CLI not found. Run "bun install" first.');
        } else {
          api.notifications.showError(`Sync failed: ${message.slice(0, 100)}`);
        }
        api.log.error('DevLink sync error:', e);
      }
    }
  );
  disposables.push(syncMenuDisposable);

  // Context menu: Initialize Code Components library
  const initComponentsMenuDisposable = api.contextMenu.registerItem(
    {
      id: 'webflow-init-components',
      label: 'Initialize Webflow Code Components',
      context: 'fileTree',
    },
    async (ctx) => {
      if (!ctx.filePath) return;

      const { existsSync, writeFileSync, mkdirSync, readFileSync } = await import('fs');
      const { statSync } = await import('fs');
      const { join, dirname, basename } = await import('path');

      // Get the directory path where user right-clicked
      let parentDir = ctx.filePath;
      try {
        const stat = statSync(ctx.filePath);
        if (!stat.isDirectory()) {
          parentDir = dirname(ctx.filePath);
        }
      } catch {
        parentDir = dirname(ctx.filePath);
      }

      // Create a "code-components" folder inside the target directory (with unique suffix if needed)
      const folderName = api.utils.getUniqueNewName(parentDir, 'code-components');
      const targetDir = join(parentDir, folderName);
      const configPath = join(targetDir, 'webflow.json');

      // Create the code-components folder
      mkdirSync(targetDir, { recursive: true });

      // Check authentication
      const tokens = api.state.get<WebflowToken[]>('tokens') || [];
      const validToken = tokens.find(t => t.status === 'valid');

      if (!validToken) {
        api.notifications.showError('Not connected to Webflow. Open Settings → Webflow to connect.');
        return;
      }

      // Find a workspace-scoped token (oauth or workspace type) for Code Components
      const workspaceToken = tokens.find(t => t.status === 'valid' && (t.type === 'oauth' || t.type === 'workspace'));

      // Create webflow.json config file with the correct "library" structure
      // Use parent folder name for the library name (sanitized)
      const rawProjectName = basename(parentDir);
      const projectName = rawProjectName
        .replace(/[^a-zA-Z0-9]/g, ' ')  // Replace special chars with spaces
        .split(' ')
        .filter(Boolean)
        .map((word, i) => i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');  // camelCase

      const config = {
        library: {
          name: projectName || 'myLibrary',
          // Glob pattern for component files - users should create .webflow.tsx files
          components: ["./src/components/**/*.webflow.{js,ts,tsx}"],
        },
      };
      writeFileSync(configPath, JSON.stringify(config, null, 2));

      // Note: We don't automatically add the workspace token to .env for Code Components
      // because the CLI requires specific OAuth scopes that may differ from workspace API tokens.
      // The CLI will prompt for browser auth on first share, which ensures correct scopes.
      // The CLI then stores its own token in .env after successful auth.

      // Add .env to .gitignore preemptively (CLI will create it after auth)
      const gitignorePath = join(targetDir, '.gitignore');
      try {
        let gitignore = '';
        if (existsSync(gitignorePath)) {
          gitignore = readFileSync(gitignorePath, 'utf-8');
        }
        if (!gitignore.includes('.env')) {
          const addition = '\n# Environment variables (contains API tokens)\n.env\n';
          writeFileSync(gitignorePath, gitignore + addition);
        }
      } catch (e) {
        api.log.warn('Could not update .gitignore:', e);
      }

      // Create src/components directory structure
      const componentsDir = join(targetDir, 'src', 'components');
      if (!existsSync(componentsDir)) {
        mkdirSync(componentsDir, { recursive: true });
      }

      // Create the "Built with Colab" badge component
      const badgeReactPath = join(componentsDir, 'ColabBadge.tsx');
      if (!existsSync(badgeReactPath)) {
        const badgeReact = `import React, { useState, useRef, useEffect } from 'react';

// "Built with Colab" Badge Component
// A stylish black & white button with animated blob hover effect

interface ColabBadgeProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
}

export const ColabBadge: React.FC<ColabBadgeProps> = ({
  text = 'Built with Colab',
  size = 'medium',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const sizes = {
    small: { padding: '8px 16px', fontSize: '12px', blobSize: 60 },
    medium: { padding: '12px 24px', fontSize: '14px', blobSize: 80 },
    large: { padding: '16px 32px', fontSize: '16px', blobSize: 100 },
  };

  const { padding, fontSize, blobSize } = sizes[size];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <a
      ref={buttonRef}
      href="https://blackboard.sh"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding,
        fontSize,
        fontWeight: 600,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: isHovered ? '#000' : '#fff',
        backgroundColor: '#000',
        border: '2px solid #fff',
        borderRadius: '50px',
        cursor: 'pointer',
        textDecoration: 'none',
        overflow: 'hidden',
        transition: 'color 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Animated blob background */}
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: \`radial-gradient(circle \${blobSize}px at \${mousePos.x * 100}% \${mousePos.y * 100}%, #fff 0%, transparent 70%)\`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Colab logo */}
      <svg
        width={size === 'small' ? 16 : size === 'medium' ? 20 : 24}
        height={size === 'small' ? 16 : size === 'medium' ? 20 : 24}
        viewBox="0 0 24 24"
        fill="none"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="4"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="8" cy="12" r="2" fill="currentColor" />
        <circle cx="16" cy="12" r="2" fill="currentColor" />
        <path
          d="M8 12h8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Text */}
      <span style={{ position: 'relative', zIndex: 1 }}>{text}</span>
    </a>
  );
};
`;
        writeFileSync(badgeReactPath, badgeReact);
      }

      // Create the Webflow component declaration file
      const badgeComponentPath = join(componentsDir, 'ColabBadge.webflow.tsx');
      if (!existsSync(badgeComponentPath)) {
        const badgeComponent = `import { ColabBadge } from './ColabBadge';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

// "Built with Colab" Badge - Webflow Code Component
// A stylish badge linking to blackboard.sh with animated hover effect

export default declareComponent(ColabBadge, {
  name: 'ColabBadge',
  description: 'A "Built with Colab" badge with animated hover effect',
  props: {
    text: props.Text({
      name: 'Text',
      defaultValue: 'Built with Colab',
    }),
    size: props.Variant({
      name: 'Size',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    }),
  },
});
`;
        writeFileSync(badgeComponentPath, badgeComponent);
      }

      // Update or create package.json
      const packageJsonPath = join(targetDir, 'package.json');
      let packageJson: Record<string, unknown> = {};
      if (existsSync(packageJsonPath)) {
        packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      } else {
        packageJson = {
          name: projectName,
          version: '1.0.0',
          type: 'module',
        };
      }

      packageJson.dependencies = {
        ...(packageJson.dependencies as Record<string, string> || {}),
        'react': '^18.2.0',
        'react-dom': '^18.2.0',
        '@webflow/react': '^1.0.0',
        '@webflow/data-types': '^1.0.0',
      };

      packageJson.devDependencies = {
        ...(packageJson.devDependencies as Record<string, string> || {}),
        '@webflow/webflow-cli': '^1.1.1',
        '@types/react': '^18.2.0',
        'typescript': '^5.0.0',
      };

      packageJson.scripts = {
        ...(packageJson.scripts as Record<string, string> || {}),
        'webflow:bundle': 'webflow library bundle --public-path http://localhost:4000/',
        'webflow:share': 'webflow library share',
      };

      writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

      // Run bun install to install dependencies
      api.notifications.showInfo('Installing dependencies...');
      try {
        const { spawnSync } = await import('child_process');
        const installResult = spawnSync(api.paths.bun, ['install'], {
          cwd: targetDir,
          env: {
            ...process.env,
            CI: 'true', // Skip interactive prompts
          },
        });
        if (installResult.status !== 0) {
          api.log.warn(`bun install exited with status ${installResult.status}`);
          if (installResult.stderr) {
            api.log.warn(`bun install stderr: ${installResult.stderr.toString()}`);
          }
        }
      } catch (err) {
        api.log.warn(`Failed to run bun install: ${err}`);
      }

      api.notifications.showInfo(`Code Components library initialized in code-components folder! Click on webflow.json to manage.`);
      api.log.info(`Code Components library initialized in ${targetDir}`);
    }
  );
  disposables.push(initComponentsMenuDisposable);

  // Context menu: Initialize Webflow Cloud App
  const initCloudMenuDisposable = api.contextMenu.registerItem(
    {
      id: 'webflow-init-cloud',
      label: 'Initialize Webflow Cloud App',
      context: 'fileTree',
    },
    async (ctx) => {
      if (!ctx.filePath) return;

      const { existsSync, writeFileSync, mkdirSync, readFileSync } = await import('fs');
      const { statSync } = await import('fs');
      const { join, dirname, basename } = await import('path');

      // Get the directory path
      let targetDir = ctx.filePath;
      try {
        const stat = statSync(ctx.filePath);
        if (!stat.isDirectory()) {
          targetDir = dirname(ctx.filePath);
        }
      } catch {
        targetDir = dirname(ctx.filePath);
      }

      // Check if already initialized
      const configPath = join(targetDir, '.colab.json');
      if (existsSync(configPath)) {
        try {
          const existing = JSON.parse(readFileSync(configPath, 'utf-8'));
          if (existing.type === 'webflow-cloud') {
            api.notifications.showWarning('Webflow Cloud is already initialized in this directory');
            return;
          }
        } catch {
          // Not a valid JSON, continue
        }
      }

      // Check authentication
      const tokens = api.state.get<WebflowToken[]>('tokens') || [];
      const validToken = tokens.find(t => t.status === 'valid');

      if (!validToken) {
        api.notifications.showError('Not connected to Webflow. Open Settings → Webflow to connect.');
        return;
      }

      // Create .colab.json config file for Webflow Cloud
      const projectName = basename(targetDir);
      const config = {
        v: 1,
        name: projectName,
        type: 'webflow-cloud',
        framework: 'astro', // Default to Astro
        siteId: '', // Will be filled in slate UI
        siteName: '',
        mountPath: '/app',
        config: {},
      };
      writeFileSync(configPath, JSON.stringify(config, null, 2));

      // Update or create package.json
      const packageJsonPath = join(targetDir, 'package.json');
      let packageJson: Record<string, unknown> = {};
      if (existsSync(packageJsonPath)) {
        packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      } else {
        packageJson = {
          name: projectName,
          version: '1.0.0',
          type: 'module',
        };
      }

      packageJson.devDependencies = {
        ...(packageJson.devDependencies as Record<string, string> || {}),
        '@webflow/webflow-cli': '^1.1.1',
      };

      packageJson.scripts = {
        ...(packageJson.scripts as Record<string, string> || {}),
        'dev': 'astro dev',
        'build': 'astro build',
        'webflow:deploy': 'webflow cloud deploy',
      };

      writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

      api.notifications.showInfo(`Webflow Cloud app initialized! Configure your site in the slate UI.`);
      api.log.info(`Webflow Cloud app initialized in ${targetDir}`);
    }
  );
  disposables.push(initCloudMenuDisposable);

  // Register keyboard shortcut for quick sync
  const keybindingDisposable = api.keybindings.register({
    key: 'cmd+shift+w',
    command: 'webflow.sync',
    when: 'global',
  });
  disposables.push(keybindingDisposable);

  // Register slates for custom file handlers
  const devlinkSlateDisposable = api.slates.register({
    id: 'devlink-project',
    name: 'Webflow DevLink Project',
    description: 'Manage DevLink component sync with Webflow Designer',
    icon: '🔗',
    patterns: ['.webflowrc.json'],
    component: 'WebflowDevLinkSlate',
  });
  disposables.push(devlinkSlateDisposable);

  const componentsSlateDisposable = api.slates.register({
    id: 'code-components',
    name: 'Webflow Code Components',
    description: 'Manage your Code Components library',
    icon: '📦',
    patterns: ['webflow.json'],
    component: 'WebflowComponentsSlate',
  });
  disposables.push(componentsSlateDisposable);

  const dashboardSlateDisposable = api.slates.register({
    id: 'dashboard',
    name: 'Webflow Dashboard',
    description: 'Overview of your Webflow sites and projects',
    icon: '🌐',
    patterns: [],
    component: 'WebflowDashboardSlate',
  });
  disposables.push(dashboardSlateDisposable);

  // Note: Cloud slate uses .colab.json which is handled by Colab's native slate system.
  // The context menu "Initialize Webflow Cloud App" creates .colab.json with type: webflow-cloud
  // which is then handled by the native getSlateForNode() function.
  // We still register the component for the PluginSlate system:
  const cloudSlateDisposable = api.slates.register({
    id: 'cloud',
    name: 'Webflow Cloud',
    description: 'Deploy apps to Webflow Cloud infrastructure',
    icon: '☁',
    patterns: [], // Uses .colab.json with type: webflow-cloud (handled natively)
    component: 'WebflowCloudSlate',
  });
  disposables.push(cloudSlateDisposable);

  // Register commands
  const initCmdDisposable = api.commands.registerCommand('webflow.init', async () => {
    api.notifications.showInfo('Use "wf init" in terminal to initialize a Webflow project');
  });
  disposables.push(initCmdDisposable);

  const syncCmdDisposable = api.commands.registerCommand('webflow.sync', async () => {
    api.notifications.showInfo('Use "wf devlink pull" in terminal to sync components');
  });
  disposables.push(syncCmdDisposable);

  const shareCmdDisposable = api.commands.registerCommand('webflow.share', async () => {
    api.notifications.showInfo('Use "wf components share" in terminal to share your library');
  });
  disposables.push(shareCmdDisposable);

  const deployCmdDisposable = api.commands.registerCommand('webflow.deploy', async () => {
    api.notifications.showInfo('Use "wf cloud deploy" in terminal to deploy');
  });
  disposables.push(deployCmdDisposable);

  const uploadCmdDisposable = api.commands.registerCommand('webflow.uploadAssets', async () => {
    api.notifications.showInfo('Use "wf assets upload" in terminal to upload assets');
  });
  disposables.push(uploadCmdDisposable);

  api.log.info('Webflow plugin activated!');
}

/**
 * Called when the plugin is deactivated
 */
export async function deactivate(): Promise<void> {
  for (const disposable of disposables) {
    disposable.dispose();
  }
  disposables.length = 0;
  client = null;
  storage = null;
}
