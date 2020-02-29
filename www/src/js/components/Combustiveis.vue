<template>
  <div class="form-group">
        <label for="combustivel" class="col-form-label">{{label}}:</label>
        <select required class="form-control" id="combustivel" v-bind:value="value" v-on:input="$emit('input', $event.target.value)">
            <option>Gasolina</option>
            <option>Gasolina Comum</option>
            <option>Gasolina Adtivada</option>
            <option>Gasolina Premium</option>
            <option>Etanol</option>
            <option>Etanol + Gasolina</option>
            <option>GNV</option>
            <option>Disel</option>
        </select>
    </div>
</template>

<script>
// Explicação de como passa v-model par o componente filho
// https://br.vuejs.org/v2/guide/components.html#Usando-v-model-em-Componentes
export default {
    data () {
        return {
            
        }
    },
    props: [
        "value",
        "label",
    ],
}
</script>
