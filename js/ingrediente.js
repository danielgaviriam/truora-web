/*
Autor: Daniel Eduardo Gaviria Mazuera
Proyecto: Truora - Libro de Recetas
*/

//Definicion de Instancia VUE
new Vue({
  el: '#main',
  data :{
    unidades:[],
    Descripcion:'',
    Nombre:'',
    unidade_id:'',
    disponible:true,
    validate:false,
  },
  created () {
      //Actualizar los campos segun respuesta REST
      axios
      .get("https://truora-rest-daniel-gaviria.c9users.io/unidades/")
      .then(response => (this.unidades = response.data))
  },
      //Actualiza los campos si hay modificaciones
  updated(){
    
      if(this.unidades.length == 0){
        this.disponible=false
      }
      else{
        this.disponible=true
      }
  },
  methods:{
    //Actualiza y Valida antes de enviar a REST
    GuardarIngrediente(){
      
      if(this.Nombre == '' || this.Descripcion == '' || this.unidade_id == ''){
        this.validate = true
      }
      else{
        
        //Creando el JSON para enviar al REST
        var ingrediente = {
        Nombre: this.Nombre,
        Descripcion: this.Descripcion,
        UnidadeID:Number(this.unidade_id),
      }
      
      axios
      .post('https://truora-rest-daniel-gaviria.c9users.io/ingredientes/', ingrediente)
      .then(function(response) {
            if(response.data.Num == 1){
              window.location.replace("ingredientes.html?state=saved") 
            }  
            else{
              window.location.replace("ingredientes.html?state=error") 
            }
        })
        
      }
    },
  },
})

