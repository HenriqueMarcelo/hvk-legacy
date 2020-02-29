<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-primary shadow-sm">
            <div class="container">
                <router-link :to="{ name: 'home'}" class="navbar-brand">
                    <span class="arabic lh-0 fs-15 pr-1">ك</span>HVK
                </router-link>
                <!-- <router-link :to="{ name: 'home'}" class="navbar-brand arabic">حرك</router-link> -->
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link disabled" href="">Configurações</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="">Meu veículo</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
</template>

<script>
    export default {
        mounted() {
            // console.log('Navegação montada.');
            // this.idade++;
        },
        data () {
            return {
                // "nome" : this.nome,
                // "idade" : this.idade,
                // "time" : this.time,
            }
        },
        props : [
            // 'nome',
            // 'idade',
            // 'time',
        ]
    }
</script>