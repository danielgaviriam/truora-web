/*
Autor: Daniel Eduardo Gaviria Mazuera
Proyecto: Truora - Libro de Recetas
*/

//Definicion de Instancia VUE
new Vue({
  el: '#main',
  data :{
    tiporequest : [],
    validate:false,
  },
  created () {
      this.getCampos();
  },
  methods :{
    //Actualizar campos segun respuesta REST
    getCampos(){
      var url_string = window.location.href
      var url = new URL(url_string);
      var id = url.searchParams.get("id");
      
      axios
      .get("https://truora-rest-daniel-gaviria.c9users.io/tipos/"+id)
      .then(response => (this.tiporequest = response.data))
      
      
    },
    //Actualiza y Valida antes de guardar en REST
    ActualizarTipo(){
      
        if(this.tiporequest.Descripcion == '' || this.tiporequest.Nombre == ''){
          this.validate = true
        }
        else{
          var unidad = {
          Nombre: this.tiporequest.Nombre,
          Descripcion: this.tiporequest.Descripcion,
        }
      
        axios
        .put('https://truora-rest-daniel-gaviria.c9users.io/tipos/'+this.tiporequest.ID, unidad)
        .then(function(response) {
            window.location.replace("tipos.html?state=updated") 
        })
      }
    },
  },
})

