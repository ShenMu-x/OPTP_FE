import { createApp } from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import installElementPlus from './plugins/element';

const app = createApp(App);
installElementPlus(app);
app.use(router);
app.use(store);
app.mount('#app');
