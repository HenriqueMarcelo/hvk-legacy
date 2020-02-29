<template>
    <div class="container">
        <!-- Modal Hodometro -->
        <div class="modal fade" id="modalHodometro" tabindex="-1" role="dialog" aria-labelledby="modalHodometroLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalHodometroLabel">Atualizando Hodêmetro</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Novo Valor:</label>
                        <input type="text" class="form-control" id="recipient-name" v-model="novoHodometro">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click="atualizarHodometro(novoHodometro)" >Salvar Alterações</button>
                </div>
                </div>
            </div>
        </div>
        <!-- Modal Combustível -->
        <div class="modal fade" id="modalCombustivel" tabindex="-1" role="dialog" aria-labelledby="modalCombustivelLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalCombustivelLabel">Atualizando Combustível</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <combustiveis v-model="novoCombustivel" label="Novo"></combustiveis>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click="atualizarCombustivel(novoCombustivel)" >Salvar Alterações</button>
                </div>
                </div>
            </div>
        </div>

        <!-- Modal Exclusão Abastecimento -->
        <div class="modal fade" id="exclusaoAbastecimento" role="dialog">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                <div class="modal-body">
                    <p> Deseja realmente excluir? Essa ação não pode ser revertida</p>
                </div>
                <div class="modal-footer">
                    <button type="button" data-dismiss="modal" class="btn btn-danger" v-on:click="deletaAbastecimento(idExclusaoAbastecimento)" v-bind:data-id="idExclusaoAbastecimento">Apagar Registo</button>
                    <button type="button" data-dismiss="modal" class="btn btn-primary">Cancelar</button>
                </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12" v-for="notificacao in $route.params.notificacoes" v-bind:key="notificacao.mensagem">
                <div v-bind:class="'alert alert-dismissible fade show alert-'+notificacao.tipo" role="alert">
                    <strong>{{notificacao.mensagem}}</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </div>
        
        <div class="row justify-content-center">
            <div class="col-12 col-sm-8 mb-4">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-9 d-flex align-items-center">
                                Hodômetro (Quiilometragem): {{hodometro}} Km
                            </div>
                            <div class="col-3">
                                <button data-toggle="modal" data-target="#modalHodometro" class="btn btn-sucess btn-primary w-100 btn-lg">
                                    <i class="mdi mdi-update"></i>
                                </button>
                            </div>
                        </div>                    
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-8 mb-4">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                        <div class="col-9 d-flex align-items-center">
                                Combustível atual: {{combustivelAtual}}
                            </div>
                            <div class="col-3">
                                <button data-toggle="modal" data-target="#modalCombustivel" class="btn btn-sucess btn-primary w-100 btn-lg">
                                    <i class="mdi mdi-update"></i>
                                </button>
                            </div>
                        </div>                    
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-8 mb-4" v-if="consumo">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-7 d-flex justify-content-center flex-column">
                                    Média de consumo:
                                    <small class="fs-10">
                                        ({{consumeDe}} até {{consumeAte}})
                                    </small>
                            </div>
                            <div class="col-5">
                                <div class="alert alert-primary text-center" role="alert">
                                    {{consumo}} Km/l
                                </div>
                            </div>
                        </div>                    
                    </div>
                </div>
            </div>
            <div class="col-6 mb-4">
                <div class="card">
                    <router-link :to="{ name: 'abastecer'}"  class="btn btn-primary text-center pb-3">
                        <i class="mdi mdi-gas-station fs-3"></i>
                        <span class="mt-m-1 d-inline-block">Relatar Abastecimento</span>
                    </router-link>
                </div>
            </div>
            
            <div class="col-6 mb-4">
                <div class="card">
                    <router-link :to="{ name: 'trocar-oleo'}"  class="btn btn-primary text-center pb-3 disabled">
                        <i class="mdi mdi-oil fs-3"></i>
                        <span class="mt-m-1 d-inline-block">Relatar troca de Óleo</span>
                    </router-link>
                </div>
            </div>
            <div class="col-12">
            <table class="table table-responsive text-nowrap">
                <thead>
                    <tr>
                        <th scope="col">Data</th>
                        <th scope="col">Litros</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Combustível</th>
                        <th scope="col">&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="abastecimento in abastecimentos" v-bind:key="abastecimento.id">
                        <td>{{ dataFormatada(abastecimento.data) }}</td>
                        <td>{{ abastecimento.quantidade }}</td>
                        <td>R$ {{ abastecimento.valorTotal }}</td>
                        <td>{{ abastecimento.combustivel }}</td>
                        <td>
                            <router-link :to="{ name: 'editar-abastecimento', params: {id: abastecimento.id}}"  class="btn btn-warning btn-primary btn-sm">
                                <i class="mdi mdi-pencil"></i>
                            </router-link>
                            <button class="btn btn-danger btn-primary btn-sm" data-toggle="modal" data-target="#exclusaoAbastecimento" v-bind:data-id="abastecimento.id" v-on:click="abreModalExclusaoAbastecimento(abastecimento.id)">
                                <i class="mdi mdi-delete"></i>
                            </button>
                            <button class="btn btn-sucess btn-primary btn-sm" v-bind:data-id="abastecimento.id">
                                <i class="mdi mdi-eye"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
    import db from '../banco-de-dados';
    export default {
        mounted() {
            this.novoHodometro = this.hodometro;
            this.novoCombustivel = this.combustivelAtual;
            this.calculaUltimaMedia();
            this.$store.dispatch('carregaAbastecimentos');
        },
        data () {
            return {
                "novoHodometro" : "",
                "novoCombustivel" : "",
                "idExclusaoAbastecimento": 0,
                "consumo": 0.00,
                "consumeDe": null,
                "consumeAte": null,
            }
        },
        props: {
            "notificacoes": Array,
        },
        computed: {
            ...mapState(["combustivelAtual", "hodometro", "abastecimentos"]),
        },
        methods: {
            ...mapMutations(["ATUALIZAR_HODOMETRO","ATUALIZAR_COMBUSTIVEL"]),
            ...mapActions(["atualizarHodometro","atualizarCombustivel","deletaAbastecimento"]),
            dataFormatada( data ){
                let dia = new Date(data).getDay();
                let mes = new Date(data).getMonth();
                dia = String("00" + dia).slice(-2);
                mes = String("00" + mes).slice(-2);
                return `${dia}/${mes}`;
            },
            abreModalExclusaoAbastecimento( id ){
                this.idExclusaoAbastecimento = id;
            },
            calculaUltimaMedia() {
                db.abastecimento
                .where("completoInt")
                .equals(1)
                .reverse()
                .sortBy("id")
                .then((array) => {
                    // Se não encontrou 2 registros de "Completo" não é feito o cálculo
                    if(!array[0] || !array[1]){
                        return;
                    }

                    let ultimoAbastecimento = array[0];
                    let penultimoAbastecimento = array[1];
                    console.log(ultimoAbastecimento)
                    this.consumeDe = this.dataFormatada(penultimoAbastecimento.data);
                    this.consumeAte = this.dataFormatada(ultimoAbastecimento.data);

                    db.abastecimento
                    .where("id")
                    .between(penultimoAbastecimento.id, ultimoAbastecimento.id, true, true)
                    .reverse()
                    .sortBy("id")
                    .then((arrayMenor) => {
                        this.consumo = this.calculo(arrayMenor).toFixed(2);
                    }).catch((error) => {
                        alert ("Ooops: " + error);
                    }); 
                }).catch((error) => {
                    alert ("Ooops: " + error);
                });  
            },

            calculo(vetor){
                let primeiroValor = vetor[0];
                let ultimoValor = vetor[vetor.length - 1];
                let diferenca = primeiroValor.hodometro - ultimoValor.hodometro;
                let somaCombustivel = 0;
                for(let a of vetor){
                    somaCombustivel += a.quantidade;
                }
                somaCombustivel -= ultimoValor.quantidade;
                console.log(diferenca, somaCombustivel);
                return diferenca / somaCombustivel;
            },
            
        },
        props : [
            // "novoHodometro"
        ]
    }
</script>