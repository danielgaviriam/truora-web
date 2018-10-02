/*
Autor: Daniel Eduardo Gaviria Mazuera
Proyecto: Truora - Libro de Recetas
*/

//Definicion de Instancia VUE
new Vue({
  el: '#main',
  data :{
    unidadrequest : [],
    validate:false
  },
  created () {
      this.getCampos();
  },
  methods :{
    //Actualizar los campos segun respuesta REST
    getCampos(){
      var url_string = window.location.href
      var url = new URL(url_string);
      var id = url.searchParams.get("id");
      
      axios
      .get("https://truora-rest-daniel-gaviria.c9users.io/unidades/"+id)
      .then(response => (this.unidadrequest = response.data))
    },
    //Actualizar y Valida antes de guardar en REST
    ActualizarUnidad(){
      if(this.unidadrequest.Nombre == '' || this.unidadrequest.Abrev == ''){
        this.validate = true
      }
      else{
        var unidad = {
        Nombre: this.unidadrequest.Nombre,
        Abrev: this.unidadrequest.Abrev,
        }
      
        axios
        .put('https://truora-rest-daniel-gaviria.c9users.io/unidades/'+this.unidadrequest.ID, unidad)
        .then(function(response) {
          window.location.replace("unidades.html?state=updated") 
        })
      }
    }
  },
})

