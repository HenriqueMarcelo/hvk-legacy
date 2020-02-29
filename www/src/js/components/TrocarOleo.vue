<template>
    <div class="container">
    <div class="row justify-content-center">
        <div class="col-12">
            <h1 class="mb-3">Troca de Óleo</h1>
            <form>
                <div class="form-group">
                    <label for="hodometro">Hodômetro Total</label>
                    <div class="input-group">
                        <input type="number" step="0.01" class="form-control" id="hodometro">
                        <div class="input-group-prepend">
                            <div class="input-group-text">Km</div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                  <label for="tipo">Tipo</label>
                    <select class="form-control" id="tipo">
                        <option>Óleo sintético</option>
                        <option>Óleo sintético</option>
                        <option>Óleo semissintético</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="marca">Marca</label>
                    <input type="text" class="form-control" id="marca">
                  </div>
                <div class="form-group">
                    <label for="viscosidade">Viscosidade</label>
                    <input type="text" class="form-control" id="viscosidade" placeholder="9W-90">
                </div>
                
                <div class="form-group">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="filtro">
                        <label class="form-check-label" for="filtro">
                          Troca de Filtro de Óleo
                        </label>
                      </div>
                </div>
                <div class="form-group">
                    <label for="valorTotal">Valor Total</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">R$</div>
                        </div>
                        <input type="number" step="0.01" class="form-control" id="valorTotal">
                    </div>
                </div>
                <div class="form-group text-right">
                    <button class="btn btn-danger btn-lg">Voltar</button>
                    <button v-on:click="counter += 1" type="submit" class="btn btn-success btn-lg">Salvar</button>
                </div>
              </form>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        mounted() {
            // console.log('Navegação montada.');
            // this.idade++;
        },
        data () {
            return {
                "hodometro" : this.hodometro,
                // "idade" : this.idade,
                // "time" : this.time,
            }
        },
        props : [
            // 'hodometro',
            // 'idade',
            // 'time',
        ]
    }
</script>
