<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-12">
            <h1 class="mb-3">Abastecimento</h1>
            <form v-on:submit.prevent="submit">
                <combustiveis v-model="combustivel" label="Combustível"></combustiveis>
                <div class="form-group">
                  <label for="Bandeira">Bandeira</label>
                  <select class="form-control" id="Bandeira" v-model="bandeira">
                    <option>Shell</option>
                    <option>Petrobas</option>
                    <option>Ipiranga</option>
                    <option>Ale</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div class="form-group">
                    <label for="nome">Nome do Posto</label>
                    <input type="text" class="form-control" id="nome" placeholder="Posto de exemplo" v-model="nome">
                  </div>
                <div class="form-group">
                    <label for="hodometro">Hodômetro Total</label>
                    <div class="input-group">
                        <input type="number" step="0.01" class="form-control" id="hodometro" v-model.number="hodometro" required>
                        <div class="input-group-prepend">
                            <div class="input-group-text">Km</div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="completo" v-model="completo">
                        <label class="form-check-label" for="completo">
                          Tanque Completo
                        </label>
                      </div>
                </div>
                <div class="form-group">
                    <label for="litros">Quantidade</label>
                    <div class="input-group">
                        <input type="number" step="0.01" class="form-control" id="litros" v-model.number="quantidade">
                        <div class="input-group-prepend">
                            <div class="input-group-text">Litros</div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="valorTotal">Valor Total</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">R$</div>
                        </div>
                        <input type="number" step="0.01" class="form-control" id="valorTotal" v-model.number="valorTotal">
                    </div>
                </div>
                <div class="form-group">
                    <label for="valorLitro">Preço por Litro</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">R$</div>
                        </div>
                        <input type="number" step="0.01" class="form-control" id="valorLitro" v-model.number="valorLitro">
                    </div>
                </div>
                <div class="form-group text-right">
                    <router-link :to="{ name: 'home'}" class="btn btn-danger btn-lg">Voltar</router-link>
                    <button v-if="!id" type="submit" class="btn btn-success btn-lg">Salvar</button>
                    <button v-else  type="submit" class="btn btn-warning btn-lg">Editar</button>
                </div>
              </form>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="confirmacao" tabindex="-1" role="dialog" aria-labelledby="confirmacaoLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="confirmacaoLabel">Registro Salvo</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>
    import db from '../banco-de-dados';
    import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

    export default {
        mounted() {            
            if(this.$route.params.id){
                this.id = parseInt(this.$route.params.id);
                this.getById(this.id);
            }else{
                delete this.$data.id;
            }
        },
        data () {
            return {
                "combustivel" : "",
                "nome" : "",
                "bandeira" : "",
                "hodometro" : "",
                "completo" : false,
                "quantidade" : "",
                "valorLitro" : "",
                "valorTotal" : "",

                "id": null,
            }
        },
        methods: {
            ...mapActions(["atualizarHodometro","atualizarCombustivel"]),
            submit: function() {
                if(!this.id){
                    console.log("Salvar");
                    this.salvar();
                }else{
                    console.log("Editar ", this.id);
                    this.editar();
                }
            },
            salvar: function() {
                this.calculaValorTotal();
                db.abastecimento.add({
                    ...this.$data,
                    "completoInt": this.completo ? 1 : 0,
                    "data": new Date(),
                })
                .then (() => {
                    this.atualizarHodometro(this.$data.hodometro);
                    this.atualizarCombustivel(this.$data.combustivel);
                    this.$router.push({ 
                        name: 'home',
                        params: {
                            "notificacoes": [
                                {
                                    "tipo": "success",
                                    "mensagem": "Abastecimento registrado com sucesso",
                                },
                            ],
                        }
                    });
                }).catch((error) => {
                    alert ("Ooops: " + error);
                }); 
            },
            editar: function() {
                this.calculaValorTotal();
                db.abastecimento.put({
                    ...this.$data,
                    "completoInt": this.completo ? 1 : 0,
                    "data": new Date(),
                })
                .then (() => {
                    this.$router.push({ 
                        name: 'home',
                        params: {
                            "notificacoes": [
                                {
                                    "tipo": "success",
                                    "mensagem": "Abastecimento registrado com sucesso",
                                },
                            ],
                        }
                    });
                }).catch((error) => {
                    alert ("Ooops: " + error);
                }); 
            },
            getById: function(id) {
                db.abastecimento.get(parseInt(id))
                .then((c) => {
                    this.combustivel = c.combustivel;
                    this.nome = c.nome;
                    this.bandeira = c.bandeira;
                    this.hodometro = c.hodometro;
                    this.completo = c.completo;
                    this.quantidade = c.quantidade.toFixed(2);
                    this.valorLitro = c.valorLitro.toFixed(2);
                    this.valorTotal = c.valorTotal.toFixed(2);
                });
            },
            calculaValorTotal(){
                // Se o usuário não preencher um dos 3 valores ele calcula o outro automáticamente
                if(!this.$data.quantidade || !this.$data.valorLitro || !this.$data.valorTotal ){
                    if( this.$data.quantidade ){
                        if(this.$data.valorLitro){
                            this.$data.valorTotal = this.$data.valorLitro * this.$data.quantidade;
                        }else if(this.$data.valorTotal){
                            this.$data.valorLitro = this.$data.valorTotal / this.$data.quantidade;
                        }
                    }else if(this.$data.valorLitro && this.$data.valorTotal){
                            this.$data.quantidade = this.$data.valorTotal / this.$data.valorLitro;
                    }
                }
            },
        },
        props : [
            // "abastecimento"
        ]
    }
</script>
