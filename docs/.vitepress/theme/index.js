import DefaultTheme from 'vitepress/theme';
import Layout from './components/Layout.vue';
import PluginArchiveList from './components/PluginArchiveList.vue';
import './custom.css';

export default {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }) {
    app.component('PluginArchiveList', PluginArchiveList);
  }
};
