/*
Autor: Daniel Eduardo Gaviria Mazuera
Proyecto: Truora - Libro de Recetas
*/

//Definicion de Instancia VUE
new Vue({
    el:'#main',
    data : {
        lists: [],
        tipo: null,
    },
    created(){
        
        var url_string = window.location.href
        var url = new URL(url_string);
        var id = url.searchParams.get("id");
        
        axios
        .get("https://truora-rest-daniel-gaviria.c9users.io/tipos/"+id)
        .then(response => (this.tipo = response.data))
        
        axios
        .get("https://truora-rest-daniel-gaviria.c9users.io/tipos-agrupados/"+id)
        .then(response => (this.lists = response.data))
        
        
    },
    methods:{
        //Redirecciona a la plantilla de ver-receta
        VerReceta(id){
            window.location.replace("ver-receta.html?id="+id) 
        },
        //elimina una receta
        EliminarReceta(id){
            axios
            .delete("https://truora-rest-daniel-gaviria.c9users.io/recetas/"+id)
            .then(function(response) {
                if(response.data.Num == 1){
                    window.location.replace("recetas.html?state=deleted") 
                    }  
                })
            
        },
        //redirecciona a la plantilla de editar-receta
        EditarReceta(id){
            window.location.replace("edit_receta.html?id="+id)
        },
    }
});