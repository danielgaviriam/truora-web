/*
Autor: Daniel Eduardo Gaviria Mazuera
Proyecto: Truora - Libro de Recetas
*/

//Definicion de Instancia VUE
new Vue({
  el: '#main',
  data :{
    ingrediente : [],
    unidades:null,
    unidade_id:'',
    validate:false,
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
      .get("https://truora-rest-daniel-gaviria.c9users.io/ingredientes/"+id)
      .then(response => (this.ingrediente = response.data))
      axios
      .get("https://truora-rest-daniel-gaviria.c9users.io/unidades/")
      .then(response => (this.unidades = response.data))
    },
    //Actualizar y Validar Ingrediente
    ActualizarIngrediente(){
      
      if(this.ingrediente.Nombre == '' || this.ingrediente.Descripcion == '' || this.unidade_id == ''){
        this.validate = true
      }
      else{
          var ingrediente = {
          Nombre: this.ingrediente.Nombre,
          Descripcion: this.ingrediente.Descripcion,
          UnidadeID:Number(this.unidade_id),
        }
      
        axios
        .put('https://truora-rest-daniel-gaviria.c9users.io/ingredientes/'+this.ingrediente.ID, ingrediente)
        .then(function(response) {
          window.location.replace("ingredientes.html?state=updated") 
        })
        
      }
    }
  },
})

