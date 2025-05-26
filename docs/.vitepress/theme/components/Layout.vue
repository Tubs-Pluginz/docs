<script setup>
import DefaultTheme from 'vitepress/theme';
import { useRoute } from 'vitepress';
import { computed } from 'vue';

const pluginConfigs = __PLUGIN_CONFIGS__;

const { Layout } = DefaultTheme;
const route = useRoute();

function pathSegmentToVersion(segment) {
  if (!segment) return null;
  return segment.replace(/-/g, '.');
}

const isPluginDocsPage = computed(() => {
  const pathSegments = route.path.split('/').filter(s => s !== '');
  if (pathSegments.length >= 2) {
     const basePathSegment = pathSegments[0];
     const versionPathSegment = pathSegments[1];
     const pluginConfig = Object.values(pluginConfigs).find(config => config.basePath === basePathSegment);
     const result = pluginConfig && pluginConfig.versions.some(v => v.replace(/\./g, '-') === versionPathSegment);
     return !!result;
  }
  return false;
});

const sidebarVersionLinks = computed(() => {
  if (isPluginDocsPage.value) {
    const pathSegments = route.path.split('/').filter(s => s !== '');
    const basePathSegment = pathSegments[0];
    const currentVersionPathSegment = pathSegments[1];
    const currentPagePath = pathSegments.slice(2).join('/')

    const pluginConfig = Object.values(pluginConfigs).find(config => config.basePath === basePathSegment);

    if (pluginConfig) {
      const links = pluginConfig.versions
        .filter(version => version.replace(/\./g, '-') !== currentVersionPathSegment)
        .map(version => {
          const versionPathSegment = version.replace(/\./g, '-');
          const link = `/${basePathSegment}/${versionPathSegment}/${currentPagePath ? currentPagePath + (route.path.endsWith('/') ? '/' : '') : ''}`;
          return {
            text: `View in v${version} Docs`,
            link: link,
            isLatest: version === pluginConfig.latest
          };
        });
      return links;
    }
  }
  return [];
});

const isOutdatedVersion = computed(() => {
  if (isPluginDocsPage.value) {
    const pathSegments = route.path.split('/').filter(s => s !== '');
    const basePathSegment = pathSegments[0];
    const versionPathSegment = pathSegments[1];
    const pluginConfig = Object.values(pluginConfigs).find(config => config.basePath === basePathSegment);

    if (pluginConfig) {
      const currentVersion = pathSegmentToVersion(versionPathSegment);
      const result = currentVersion && pluginConfig.versions.includes(currentVersion) && currentVersion !== pluginConfig.latest;
      return !!result;
    }
  }
  return false;
});

const outdatedVersionDetails = computed(() => {
  if (isOutdatedVersion.value) {
    const pathSegments = route.path.split('/').filter(s => s !== '');
    const basePathSegment = pathSegments[0];
    const versionPathSegment = pathSegments[1];
    const pluginConfig = Object.values(pluginConfigs).find(config => config.basePath === basePathSegment);

    if (pluginConfig) {
       const currentVersion = pathSegmentToVersion(versionPathSegment);
       const latestVersionPathSegment = pluginConfig.latest.replace(/\./g, '-');
       return {
         pluginLabel: pluginConfig.label,
         currentVersion: currentVersion,
         latestVersion: pluginConfig.latest,
         latestLink: `/${pluginConfig.basePath}/${latestVersionPathSegment}/`
       };
    }
  }
  return null;
});
</script>

<template>
  <Layout>
    <template #doc-before>
      <div v-if="isOutdatedVersion" class="vp-doc-outdated-banner">
        <p>⚠️ You are viewing documentation for an outdated version (<strong>v{{ outdatedVersionDetails.currentVersion }}</strong>) of {{ outdatedVersionDetails.pluginLabel }}.</p>
        <p>Some information may no longer be accurate. For the latest features and support, please see the <a :href="outdatedVersionDetails.latestLink">latest version (v{{ outdatedVersionDetails.latestVersion }}) documentation</a>.</p>
        <p>This version is no longer actively supported.</p>
      </div>
    </template>

  </Layout>
</template>

<style scoped>
/* Styles for the banner (from previous steps) */
.vp-doc-outdated-banner {
  background-color: var(--vp-c-warning-soft);
  border: 1px solid var(--vp-c-warning-2);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  color: var(--vp-c-text-1);
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
}

.vp-doc-outdated-banner p { margin: 0 0 8px 0; line-height: 1.7; }
.vp-doc-outdated-banner p:last-child { margin-bottom: 0; }
.vp-doc-outdated-banner strong { font-weight: 600; }
.vp-doc-outdated-banner a {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  text-decoration: underline;
}
.vp-doc-outdated-banner a:hover { color: var(--vp-c-brand-2); }
@media (max-width: 768px) {
  .vp-doc-outdated-banner { padding: 12px; margin-bottom: 16px; }
}

/* Styles for the sidebar version links (if you re-enable them) */

.vp-sidebar-version-links {
    padding: 16px 24px;
    border-bottom: 1px solid var(--vp-c-divider);
    margin-bottom: 16px;
    font-size: 0.9em;
}
.vp-sidebar-version-links p { font-weight: bold; margin-bottom: 8px; }
.vp-sidebar-version-links ul { list-style: none; padding: 0; margin: 0; }
.vp-sidebar-version-links li { margin-bottom: 4px; }
.vp-sidebar-version-links li a { color: var(--vp-c-text-2); text-decoration: none; display: block; padding: 2px 0; }
.vp-sidebar-version-links li a:hover { color: var(--vp-c-brand-1); }
.vp-sidebar-version-links li a.latest-version-link { font-weight: bold; color: var(--vp-c-text-1); }

</style>
