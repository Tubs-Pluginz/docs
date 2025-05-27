// docs/scripts/update-latest-links.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory where this script is located
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the docs directory (parent of scripts dir)
const docsDir = path.resolve(__dirname, '..');

console.log('Starting latest links update script...');
console.log('Docs directory:', docsDir);

// Hard-code the plugin configuration for now to avoid parsing issues
const pluginConfigs = {
  'VelocityPteroPower': {
    basePath: 'VelocityPteroPower',
    latest: '0.9.4'
  },
  'BT Graves': {
    basePath: 'bt-graves',
    latest: '1.2.1'
  },
  'BTs CombatLogger': {
    basePath: 'combatlogger',
    latest: '1.1'
  },
  'Tubs Status Plugin': {
    basePath: 'tubs-statusplugin',
    latest: '1.5.2.1'
  }
};

console.log('Plugin configurations:', pluginConfigs);

// Create symbolic links for each plugin's latest version
for (const [pluginName, config] of Object.entries(pluginConfigs)) {
  const { basePath, latest } = config;

  // Convert version to path format (e.g., 0.9.4 -> 0-9-4)
  const latestPath = latest.replace(/\./g, '-');

  const pluginDir = path.join(docsDir, basePath);
  const latestDir = path.join(pluginDir, 'latest');
  const versionDir = path.join(pluginDir, latestPath);

  console.log(`Processing plugin ${pluginName}:`);
  console.log(`- Plugin directory: ${pluginDir}`);
  console.log(`- Latest directory: ${latestDir}`);
  console.log(`- Version directory: ${versionDir}`);

  // Check if the version directory exists
  if (!fs.existsSync(versionDir)) {
    console.error(`Version directory for ${pluginName} does not exist: ${versionDir}`);
    continue;
  }

  // Remove existing latest directory if it exists
  if (fs.existsSync(latestDir)) {
    console.log(`Removing existing latest directory: ${latestDir}`);
    fs.rmSync(latestDir, { recursive: true, force: true });
  }

  // Create the "latest" directory
  console.log(`Creating latest directory: ${latestDir}`);
  fs.mkdirSync(latestDir, { recursive: true });

  // Copy all files from the version directory to the latest directory
  const files = fs.readdirSync(versionDir);
  console.log(`Found ${files.length} files to copy from ${versionDir}`);

  files.forEach(file => {
    const srcPath = path.join(versionDir, file);
    const destPath = path.join(latestDir, file);

    const stats = fs.statSync(srcPath);

    if (stats.isFile()) {
      // Copy the file
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied file: ${srcPath} → ${destPath}`);
    } else if (stats.isDirectory()) {
      // Create the directory and recursively copy its contents
      fs.mkdirSync(destPath, { recursive: true });

      // Recursive function to copy directory contents
      const copyDir = (src, dest) => {
        const entries = fs.readdirSync(src);

        entries.forEach(entry => {
          const srcEntry = path.join(src, entry);
          const destEntry = path.join(dest, entry);

          const entryStats = fs.statSync(srcEntry);

          if (entryStats.isFile()) {
            fs.copyFileSync(srcEntry, destEntry);
            console.log(`Copied file: ${srcEntry} → ${destEntry}`);
          } else if (entryStats.isDirectory()) {
            fs.mkdirSync(destEntry, { recursive: true });
            copyDir(srcEntry, destEntry);
          }
        });
      };

      copyDir(srcPath, destPath);
      console.log(`Copied directory: ${srcPath} → ${destPath}`);
    }
  });

  console.log(`Created "latest" directory for ${pluginName} pointing to version ${latest}`);
}

console.log('All "latest" directories have been updated successfully!');