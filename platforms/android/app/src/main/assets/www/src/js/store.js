import Vue from 'vue'
import Vuex from 'vuex'
import db from './banco-de-dados'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        "combustivelAtual": localStorage.combustivelAtual ? localStorage.combustivelAtual : "Indefinido",
        "hodometro": localStorage.hodometro ? localStorage.hodometro : 0,
        "abastecimentos": []
    },
    mutations: {
        ATUALIZAR_HODOMETRO(store, payload){
            store.hodometro = payload;
        },
        ATUALIZAR_COMBUSTIVEL(store, payload){
            store.combustivelAtual = payload; 
        },
        CARREGA_ABASTECIMENTOS(store, payload){
            store.abastecimentos = payload; 
        }
    },
    // getters: {
    //     nomeFuncao(){
    //         return [];
    //     },
    // },
    actions: {
        atualizarCombustivel (context, payload){
            context.commit('ATUALIZAR_COMBUSTIVEL',payload);
            localStorage.combustivelAtual = payload;
        },
        atualizarHodometro (context, payload){
            context.commit('ATUALIZAR_HODOMETRO',payload);
            localStorage.hodometro = payload;
        },
        carregaAbastecimentos (context){
            db.abastecimento.toArray()
                .then((all) => {
                    context.commit('CARREGA_ABASTECIMENTOS', all);
                });
        },
        deletaAbastecimento(context, payload){
            db.abastecimento.delete(payload)
            .then( () => {
                context.dispatch('carregaAbastecimentos');
            } );
        }
    },
});
