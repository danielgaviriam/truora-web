/*
Autor: Daniel Eduardo Gaviria Mazuera
Proyecto: Truora - Libro de Recetas
*/

//Definicion de Instancia VUE
new Vue({
  el: '#main',
  data :{
    receta:null,
    tipos:null,
    ingredientes:null,
    unidades:null,
    Descripcion:'',
    Nombre:'',
    Tipos:[],
    validate:false,
    objIngredientes: [{
        id: '',
        cantidad: '',
        
      }],
  },
  created() {
    this.getCampos();
  },
  methods :{
    //ACtualizar y Validar
    ValidarIngredientes(array){
      
      var output=false
      for(item in array){
        
        if(array[item].ingredienteID == '' || array[item].cantidad == ''){
          var output=true
        }
      }
      return output;
      
    },
    //Add item en la plantilla
    NuevoIngrediente(){
      this.objIngredientes.push({
        id: '',
        cantidad: '',
      })
    },
    //Eliminar item en la plantilla
    deleteIngrediente(index){
      this.objIngredientes.splice(index,1)
    },
    //Actualizar los campos segun respuesta REST
    getCampos(){
      var url_string = window.location.href
      var url = new URL(url_string);
      var id = url.searchParams.get("id");
      
      axios
      .get("https://truora-rest-daniel-gaviria.c9users.io/tipos/")
      .then(response => (this.tipos = response.data))
      
      axios
      .get("https://truora-rest-daniel-gaviria.c9users.io/recetas/"+id)
      .then(r => (this.receta = r.data))
      
      axios
      .get("https://truora-rest-daniel-gaviria.c9users.io/ingredientes/")
      .then(response => (this.ingredientes = response.data))
    },
    //Funcion de Validacion
    ValidarIngredientes(){
      for(item in this.objIngredientes){
        var output=false
        if(this.objIngredientes[item].id=='' || this.objIngredientes[item].id==''){
          output=true
        }
      }
      return output
    },
    //Actualiza y Valida Antes de guardar en REST
    ActualizarReceta(){
      
      if(this.receta.Nombre == '' || this.receta.Descripcion == '' || this.ValidarIngredientes() || this.Tipos.length == 0){
        this.validate = true
      }
      else{
        //Creando el JSON para enviar al REST
      console.log(this.Tipos)
      var listaTipos = []
      for(tipo in this.Tipos){
        listaTipos.push({
          "id":this.Tipos[tipo]
        })
      }
      
      var recetaIngrediente = []
      for(ingrediente in this.objIngredientes){
        recetaIngrediente.push({
          "IngredienteID":Number(this.objIngredientes[ingrediente].id),
          "Ingrediente":{
            id: this.objIngredientes[ingrediente].id,
          },
          "Cantidad":Number(this.objIngredientes[ingrediente].cantidad)
        })
      }
      console.log(listaTipos);
      var newreceta = {
        Nombre: this.receta.Nombre,
        Descripcion: this.receta.Descripcion,
        Tipos: listaTipos,
        RecetaIngrediente: recetaIngrediente,
      }
      
      axios
      .put('https://truora-rest-daniel-gaviria.c9users.io/recetas/'+this.receta.ID, newreceta)
      .then(function(response) {
            window.location.replace("recetas.html?state=updated") 
        })
        
      }
      
    },
  }
})

