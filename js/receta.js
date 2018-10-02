/*
Autor: Daniel Eduardo Gaviria Mazuera
Proyecto: Truora - Libro de Recetas
*/

//Definicion de Instancia VUE
new Vue({
  el: '#main',
  data :{
    resp:null,
    tipos:null,
    ingredientes:null,
    Descripcion:'',
    Nombre:'',
    Tipos:[],
    validate:false,
    objIngredientes: [
      {
        id: '',
        cantidad: '',
      }
    ],
  },
  //Actualiza los campos segun REST
  created () {
      
      axios
      .get("https://truora-rest-daniel-gaviria.c9users.io/tipos/")
      .then(response => (this.tipos = response.data))
      axios
      .get("https://truora-rest-daniel-gaviria.c9users.io/ingredientes/")
      .then(response => (this.ingredientes = response.data))
  },
  methods:{
    //Add item en formulario
    NuevoIngrediente(){
      this.objIngredientes.push({
        ingredienteID: '',
        cantidad: '',
      })
    },
    //Delete item en formulario
    deleteIngrediente(index){
      this.objIngredientes.splice(index,1)
    },
    ValidarIngredientes(){
      for(item in this.objIngredientes){
        var output=false
        if(this.objIngredientes[item].id=='' || this.objIngredientes[item].id==''){
          output=true
        }
      }
      return output
    },
    //Valida y Guarda una reseta en REST
    GuardarReceta(){
      if(this.Nombre == '' || this.Descripcion == '' || this.Tipos.length == 0 || this.ValidarIngredientes()){
        this.validate = true
      }
      else{
        //Creando el JSON para enviar al REST
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
      var data2;
      var receta = {
        Nombre: this.Nombre,
        Descripcion: this.Descripcion,
        Tipos: listaTipos,
        RecetaIngrediente: recetaIngrediente,
      }
      axios
      .post('https://truora-rest-daniel-gaviria.c9users.io/recetas/', receta)
      .then(function(response) {
        console.log(response.data)
        if(response.data.Num == 1){
          window.location.replace("recetas.html?state=saved") 
        }  
        else{
          window.location.replace("recetas.html.html?state=error") 
        }
      })
      }
    },
  },
})

