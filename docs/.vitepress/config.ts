import { defineConfig } from 'vitepress';

function versionToPath(version: string): string {
  return version.replace(/\./g, '-');
}

// --- VERSIONING CONFIGURATION ---
interface PluginVersionConfig {
  latest: string;
  versions: string[];
  label: string;
  basePath: string;
  sidebarItems: { text: string; link: string }[];
}

// IMPORTANT: Make sure basePath here matches exactly with your folder structure
const pluginConfigs: Record<string, PluginVersionConfig> = {
  'VelocityPteroPower': {
    label: 'VelocityPteroPower',
    basePath: 'VelocityPteroPower',
    latest: '0.9.4',
    versions: ['0.9.4'],
    sidebarItems: [
      { text: 'Introduction', link: '/' },
      { text: 'Installation', link: '/installation' },
      { text: 'Configuration', link: '/configuration' },
      { text: 'Core Mechanics', link: '/core-mechanics' },
      { text: 'Commands', link: '/commands' },
      { text: 'Permissions', link: '/permissions' },
      { text: 'FAQ', link: '/faq' },
      { text: 'Troubleshooting', link: '/troubleshooting' },
    ],
  },
  'BT Graves': { // New entry for BTGraves
    label: 'BT Graves',
    basePath: 'bt-graves',
    latest: '1.2.1',
    versions: ['1.2.1'], // Add older versions here if you document them
    sidebarItems: [
      { text: 'Introduction', link: '/' },
      { text: 'Installation', link: '/installation' },
      { text: 'Configuration', link: '/configuration' },
      { text: 'Core Mechanics', link: '/core-mechanics' },
      { text: 'Commands', link: '/commands' },
      { text: 'Permissions', link: '/permissions' },
      { text: 'FAQ', link: '/faq' },
      { text: 'Troubleshooting', link: '/troubleshooting' },
    ],
  },
};

// Generate the navigation bar
function getNav() {
  const nav: any[] = [
    { text: 'Home', link: '/' },
    { text: 'Docs Archive', link: '/archive' }
  ];

  // Add direct links to the latest version of each plugin
  for (const key in pluginConfigs) {
    const config = pluginConfigs[key];
    nav.push({
      text: config.label,
      link: `/${config.basePath}/latest/`
    });
  }
  return nav;
}

// Generate the sidebar configuration
function getSidebar() {
  const sidebar: Record<string, any[]> = {};

  for (const key in pluginConfigs) {
    const config = pluginConfigs[key];

    // Add sidebar for "latest" directory (which physically exists)
    sidebar[`/${config.basePath}/latest/`] = [
      {
        text: `${config.label} v${config.latest} (Latest)`,
        collapsible: true,
        items: config.sidebarItems.map(item => ({
          ...item,
          link: `/${config.basePath}/latest${item.link.startsWith('/') ? '' : '/'}${item.link}`
        }))
      }
    ];

    // Create sidebars for all version-specific paths
    config.versions.forEach(version => {
      const versionPathSegment = versionToPath(version);
      // The key for the sidebar should match the base path of the versioned docs
      sidebar[`/${config.basePath}/${versionPathSegment}/`] = [
        {
          text: `${config.label} v${version}${version === config.latest ? ' (Latest)' : ''}`,
          collapsible: true,
          items: config.sidebarItems.map(item => ({
            ...item,
            link: `/${config.basePath}/${versionPathSegment}${item.link.startsWith('/') ? '' : '/'}${item.link}`
          }))
        }
      ];
    });
  }
  return sidebar;
}

export default defineConfig({
  title: "Tub Pluginz Docs",
  description: "Documentation for My Minecraft Plugins",
  lang: 'en-US',
  srcDir: './',
  base: '/',

  head: [
    ['link', { rel: 'stylesheet', href: '/.vitepress/theme/custom.css' }]
  ],

  themeConfig: {
    logo: '/logo.png',
    nav: getNav(),
    sidebar: getSidebar(),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/TubYoub/' },
      { icon: 'discord', link: 'https://discord.pluginz.dev' }
    ],

    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} TubYoub`
    },

    search: {
      provider: 'local'
    },
  },

  outDir: '../dist',

  vite: {
    define: {
      __PLUGIN_CONFIGS__: JSON.stringify(pluginConfigs)
    }
  }
});