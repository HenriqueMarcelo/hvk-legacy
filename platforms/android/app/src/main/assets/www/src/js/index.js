require('./bootstrap');

import Vue from 'vue';
import router from './router';
import Navegacao from './components/Navegacao';
import Combustiveis from './components/Combustiveis';
import store from './store';

Vue.component('navegacao', Navegacao);
Vue.component('combustiveis', Combustiveis);

const app = new Vue({
    store,
    router,
    el: '#app',
    data: {
        "hodometro": localStorage.hodometro ?? 0,
        "combustivelAtual": localStorage.combustivelAtual ?? "Indefinido"
    }
});

