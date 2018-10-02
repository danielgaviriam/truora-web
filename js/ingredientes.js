
/*
Autor: Daniel Eduardo Gaviria Mazuera
Proyecto: Truora - Libro de Recetas
*/

//Definicion de Instancia VUE
new Vue({
    el:'#main',
    data : {
        lists: [],
        message: '',
        actualizo : false,
        guardo: false,
        error: false,
        elimino: false,
    },
    created(){
        //Actualizar los campos segun respuesta REST
        axios
        .get("https://truora-rest-daniel-gaviria.c9users.io/ingredientes/")
        .then(response => (this.lists = response.data))
    },
    mounted(){
        //Actualiza los campos si hay cambios en la plantilla
        this.mensajeActualizado()
    },
    methods:{
        //Valida y elimina un ingrdiente en REST
        EliminarIngrediente(id){
            axios
            .delete("https://truora-rest-daniel-gaviria.c9users.io/ingredientes/"+id)
            .then(function(response) {
                if(response.data.Num == 1){
                    window.location.replace("ingredientes.html?state=deleted") 
                    }  
        })
        },
        //Redirecciona a la pagina de edicion
        EditarIngrediente(id){
            window.location.replace("edit_ingrediente.html?id="+id)
        },
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