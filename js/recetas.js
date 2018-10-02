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
    //Actualiza segun respuesta REST
    created(){
        axios
        .get("https://truora-rest-daniel-gaviria.c9users.io/recetas/")
        .then(response => (this.lists = response.data))
        
        
    },
    //ACtualiza los campos si hay cambios en la template
    mounted(){
        this.mensajeActualizado()
    },
    methods:{
        //Redirecciona a la pagina VER-RECETA
        VerReceta(id){
            window.location.replace("ver-receta.html?id="+id) 
        },
        //Elimina una Receta
        EliminarReceta(id){
            axios
            .delete("https://truora-rest-daniel-gaviria.c9users.io/recetas/"+id)
            .then(function(response) {
                if(response.data.Num == 1){
                    window.location.replace("recetas.html?state=deleted") 
                    }  
                })
            
        },
        //Redirecciona a la pagina EDITAR-RECETA
        EditarReceta(id){
            window.location.replace("edit_receta.html?id="+id)
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