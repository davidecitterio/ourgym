/*Print all courses*/

$(document).ready(ready);

$(window).resize(function() {
  console.log('window was resized');
    $(".grid").css("height","auto");
});



    
//funzione che restituisce i parametri passati trmite url
function parseGetVars()
{
  // creo una array
  var args = new Array();
  // individuo la query (cioè tutto quello che sta a destra del ?)
  // per farlo uso il metodo substring della proprietà search
  // dell'oggetto location
  var query = window.location.search.substring(1);
  // se c'è una querystring procedo alla sua analisi
  if (query)
  {
    // divido la querystring in blocchi sulla base del carattere &
    // (il carattere & è usato per concatenare i diversi parametri della URL)
    var strList = query.split('&');
    // faccio un ciclo per leggere i blocchi individuati nella querystring
    for(str in strList)
    {
      // divido ogni blocco mediante il simbolo uguale
      // (uguale è usato per l'assegnazione del valore)
      var parts = strList[str].split('=');
      // inserisco nella array args l'accoppiata nome = valore di ciascun
      // parametro presente nella querystring
      args[unescape(parts[0])] = unescape(parts[1]);
    }
  }
  return args;
}

function ready(){
    console.log("I'm ready!");
    var id=1;
    
     var get = parseGetVars();
     var id = get['ord'];
    
    console.log(id);

    if (typeof(id)=="undefined")
        var php = "http://ourgym.altervista.org/getElencoCorsi.php";
        else
        var php = "http://ourgym.altervista.org/getElencoCorsi.php?ord="+id;
            
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: php,
        data: {corso:id},

        success: function(response) {
            console.log(JSON.parse(response));
            var corso=JSON.parse(response);
            var el="";
            for(var i=0;i<corso.length;i++){

               if (i==0)
                el+='<a href="corso.html?id='+corso[i].corso+'" class="'+corso[i].livello+'"><figure class="image-over"><img src="'+corso[i].percorso+'" alt="//"><p>'+corso[i].titolo+'</p></figure></a>';
                
                else if (i>0 && corso[i].titolo != corso[i-1].titolo)
                     el+='<a href="corso.html?id='+corso[i].corso+'" class="'+corso[i].livello+'"><figure class="image-over"><img src="'+corso[i].percorso+'" alt="//"><figcaption><p>'+corso[i].titolo+'</p></figcaption></figure></a>';
        }

            $(".grid").html(el);
            $(".grid").css("height","auto");
            
        
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });

    
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://ourgym.altervista.org/getElencoLivelli.php", //Relative or absolute path to file.php file
        data: {corso:id},

        success: function(response) {
            console.log(JSON.parse(response));
            var corso=JSON.parse(response);
            if (typeof(id)=="undefined")
            var el='<a href="corsi.html" data-filter="*" class="btn btn-filters active">All</a>';
            else
             var el='<a href="corsi.html" data-filter="*" class="btn btn-filters ">All</a>';
            
            for(var i=0;i<corso.length;i++){
                if (corso[i].id == id)
                el+='<a href="corsi.html?ord='+corso[i].id+'" data-filter=".'+corso[i].id+'" class="btn btn-filters active">'+corso[i].nome+'</a>';
                else
                      el+='<a href="corsi.html?ord='+corso[i].id+'" data-filter=".'+corso[i].id+'" class="btn btn-filters">'+corso[i].nome+'</a>';
            }

            $(".filters").html(el);
            
            
        
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });

}
