/*
Autor: Daniel Eduardo Gaviria Mazuera
Proyecto: Truora - Libro de Recetas
*/

//Definicion de Instancia VUE
new Vue({
  el: '#main',
  data :{
    Descripcion:'',
    Nombre:'',
    validate:false,
  },
  methods:{
    //Valida y Crea el tipo en rest
    GuardarTipo(){
      if(this.Descripcion == '' || this.Nombre == ''){
        this.validate = true
      }
      else{
        //Creando el JSON para enviar al REST
      var tipo = {
        Nombre: this.Nombre,
        Descripcion: this.Descripcion,
      }
      
      axios
      .post('https://truora-rest-daniel-gaviria.c9users.io/tipos/', tipo)
      .then(function(response) {
            console.log(response.data)
            if(response.data.Num == 1){
              window.location.replace("tipos.html?state=saved") 
            }  
            else{
              window.location.replace("tipos.html?state=error") 
            }
        })
        
      }
    },
  },
})

