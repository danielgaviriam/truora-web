/*
Autor: Daniel Eduardo Gaviria Mazuera
Proyecto: Truora - Libro de Recetas
*/

//Definicion de Instancia VUE
new Vue({
    el:'#main',
    data : {
        lists: [],
    },
    created(){
        axios
        .get("https://truora-rest-daniel-gaviria.c9users.io/tipos/")
        .then(response => (this.lists = response.data))
    },
});