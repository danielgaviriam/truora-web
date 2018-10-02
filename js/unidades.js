//Variable de Enlace App Rest
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
        axios
        .get("https://truora-rest-daniel-gaviria.c9users.io/unidades/")
        .then(response => (this.lists = response.data))
    },
    mounted(){
        this.mensajeActualizado()
    },
    methods:{
        EliminarUnidad(id){
            axios
            .delete("https://truora-rest-daniel-gaviria.c9users.io/unidades/"+id)
            .then(function(response) {
                if(response.data.Num == 1){
                    window.location.replace("unidades.html?state=deleted") 
                    }  
        })
            //window.location.replace("unidades.html?state=deleted") 
        },
        EditarUnidad(id){
            window.location.replace("edit_unidad.html?id="+id)
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