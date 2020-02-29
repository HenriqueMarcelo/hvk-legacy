import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home';
import Abastecer from './components/Abastecer';
import TrocarOleo from './components/TrocarOleo';

Vue.use(Router);

export default new Router({
    routes: [
        { 
            path: '/', 
            component: Home,
            name: 'home',
        },
        { 
            path: '/abastecer', 
            component: Abastecer,
            name: 'abastecer',
        },
        { 
            path: '/abastecimento/:id', 
            component: Abastecer,
            name: 'editar-abastecimento',
        },
        { 
            path: '/trocar-oleo', 
            component: TrocarOleo,
            name: 'trocar-oleo',
        },
    ]
}) 
