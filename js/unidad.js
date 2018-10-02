/*
Autor: Daniel Eduardo Gaviria Mazuera
Proyecto: Truora - Libro de Recetas
*/

//Definicion de Instancia VUE
new Vue({
  el: '#main',
  data :{
    Abrev:'',
    Nombre:'',
    validate:false,
  },
  updated(){
    
  },
  methods:{
    //Valida y GUarda una Unidad en REST
    GuardarUnidad(){
      if(this.Nombre == '' || this.Abrev == ''){
        this.validate = true
      }
      else{
        //Creando el JSON para enviar al REST
      var unidad = {
        Nombre: this.Nombre,
        Abrev: this.Abrev,
      }
      
      axios
      .post('https://truora-rest-daniel-gaviria.c9users.io/unidades/', unidad)
      .then(function(response) {
            if(response.data.Num == 1){
              window.location.replace("unidades.html?state=saved") 
            }  
            else{
              window.location.replace("unidades.html?state=error") 
            }
        })
      }
    },
  },
})

