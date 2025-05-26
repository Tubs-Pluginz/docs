<script setup>
import { computed } from 'vue';

// Access plugin configurations passed from config.ts
// @ts-ignore
const pluginConfigs = __PLUGIN_CONFIGS__;

const plugins = computed(() => {
  const activePlugins = [];
  for (const key in pluginConfigs) {
    const plugin = pluginConfigs[key];
    if (plugin && plugin.latest && plugin.basePath && plugin.label) {
      activePlugins.push({
        label: plugin.label,
        latestVersion: plugin.latest,
        // Link directly to the latest directory which is physically created
        link: `/${plugin.basePath}/latest/`
      });
    }
  }
  return activePlugins;
});
</script>

<template>
  <div class="latest-plugin-docs">
    <div v-if="plugins.length > 0">
      <div v-for="plugin in plugins" :key="plugin.label" class="plugin-card">
        <h3>{{ plugin.label }}</h3>
        <p>
          <a :href="plugin.link" class="vp-button brand">
            View Latest Docs (v{{ plugin.latestVersion }}) &rarr;
          </a>
        </p>
      </div>
    </div>
    <div v-else>
      <p>No plugin documentation is currently configured.</p>
    </div>
  </div>
</template>

<style scoped>
.latest-plugin-docs {
  display: grid;
  gap: 20px; /* Space between cards */
  /* Adjust columns based on screen size */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  margin-top: 24px;
  margin-bottom: 24px;
}

.plugin-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background-color: var(--vp-c-bg-soft);
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Pushes button to bottom if content varies */
}

.plugin-card h3 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 1.25em;
  border-bottom: none; /* Remove default h3 border if present */
}

.plugin-card p {
  margin-bottom: 0; /* Remove default p margin if button is the only content */
}

/* VitePress default button styling for consistency */
.vp-button {
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
}

.vp-button.brand {
  border-color: var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
}
.vp-button.brand:hover {
  border-color: var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text);
  background-color: var(--vp-button-brand-hover-bg);
}
</style>