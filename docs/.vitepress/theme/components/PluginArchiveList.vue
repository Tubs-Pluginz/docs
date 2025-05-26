<script setup>
import { computed } from 'vue';

// Access plugin configurations passed from config.ts
// @ts-ignore
const pluginConfigs = __PLUGIN_CONFIGS__;

const archiveData = computed(() => {
  const data = [];
  for (const key in pluginConfigs) {
    const plugin = pluginConfigs[key];
    data.push({
      label: plugin.label,
      basePath: plugin.basePath,
      latest: plugin.latest,
      versions: plugin.versions.map(version => ({
        version,
        pathSegment: version.replace(/\./g, '-'),
        isLatest: version === plugin.latest,
      })),
    });
  }
  return data;
});
</script>

<template>
  <div class="plugin-archive-container">
    <div v-for="plugin in archiveData" :key="plugin.basePath" class="plugin-section">
      <h2>{{ plugin.label }}</h2>
      <ul>
        <li v-for="v in plugin.versions" :key="v.version">
          <a :href="`/${plugin.basePath}/${v.pathSegment}/`">
            Version {{ v.version }}
            <span v-if="v.isLatest" class="latest-badge">(Latest)</span>
          </a>
        </li>
      </ul>
    </div>
    <div v-if="archiveData.length === 0">
        <p>No plugin documentation versions found in the configuration.</p>
    </div>
  </div>
</template>

<style scoped>
.plugin-archive-container {
  margin-top: 20px;
}

.plugin-section {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.plugin-section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.plugin-section h2 {
  border-bottom: none; /* Override default h2 styling if needed */
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.5em;
}

.plugin-section ul {
  list-style: none;
  padding-left: 0;
}

.plugin-section li {
  margin-bottom: 8px;
}

.plugin-section li a {
  text-decoration: none;
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.plugin-section li a:hover {
  text-decoration: underline;
}

.latest-badge {
  font-size: 0.85em;
  font-weight: bold;
  color: var(--vp-c-green-1); /* Or your preferred color for "latest" */
  margin-left: 5px;
  background-color: var(--vp-c-green-soft);
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
