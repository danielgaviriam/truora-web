//Variable de Enlace App Rest
new Vue({
    el:'#main',
    data : {
        lists: [],
    },
    created () {
      this.getCampos();
  },
  methods :{
    getCampos(){
      var url_string = window.location.href
      var url = new URL(url_string);
      var id = url.searchParams.get("id");
      
      axios
      .get("https://truora-rest-daniel-gaviria.c9users.io/recetas/"+id)
      .then(response => (this.lists = response.data))
    },
  },
});