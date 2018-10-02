/*
Autor: Daniel Eduardo Gaviria Mazuera
Proyecto: Truora - Libro de Recetas
*/

//Definicion de Instancia VUE
new Vue({
    el:'#main',
    data : {
        lists: [],
        actualizo : false,
        guardo: false,
        error: false,
        elimino: false,
    },
    created(){
        //Actualiza los campos segun rest
        axios
        .get("https://truora-rest-daniel-gaviria.c9users.io/tipos/")
        .then(response => (this.lists = response.data))
    },
    mounted(){
        //Actualiza cunado hay cambios en la template
        this.mensajeActualizado()
    },
    methods:{
        //Elimina un Tipo
        EliminarTipo(id){
            axios
            .delete("https://truora-rest-daniel-gaviria.c9users.io/tipos/"+id)
            .then(function(response) {
                if(response.data.Num == 1){
                    window.location.replace("tipos.html?state=deleted") 
                    }  
        })
        },
        //Redirecciona a la pagina de editar tipo
        EditarTipo(id){
            window.location.replace("edit_tipo.html?id="+id)
        },
        //Actualiza los campos
        mensajeActualizado(){
            var url_string = window.location.href
            var url = new URL(url_string);
            var state = url.searchParams.get("state");
            
            if(state == "updated"){
                this.actualizo = true;
            }
            else if(state == "saved"){
                this.guardo = true;
            }
            else if(state == "error"){
                this.error = true;
            }
            else if(state == "deleted"){
                this.elimino = true;
            }
        },
    }
});