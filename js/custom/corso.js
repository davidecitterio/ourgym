/*Print all courses*/

$(document).ready(ready);

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
     var id = get['id'];
    
    console.log(id);
    
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: 'http://ourgym.altervista.org/getCorso.php?id='+id,
        //Relative or absolute path to file.php file
        data: {istr:id},

        success: function(response) {
            console.log(JSON.parse(response));
            var istr=JSON.parse(response);
           var titolo ='';
           var  descr ='';
            var img ='';
            
         for(var i=0;i<istr.length;i++){

                img += ('<figure><img src="http://ourgym.altervista.org/'+istr[i].percorso+'"></figure>');   
                
            }
                
            console.log(titolo);
             console.log(descr);
             console.log(img);

            $("h1").html(istr[0].titolo);
            $("title").html('OURGYM - '+istr[0].titolo);
            $("#sottotitolo").html('<h2>'+istr[0].sottotitolo+'</h2>');
            $(".descr").html(istr[0].descrizione);
            $(".descr").css("text-align","justify");
            $("#motto").html('<p>" '+istr[0].motto+' "</p>');
            $("#foto").html(img);
            $('#forza').html('<div role="progressbar" aria-valuenow="'+istr[0].forza+'" aria-valuemin="0" aria-valuemax="100" style="width: '+istr[0].forza+'%;" class="progress-bar"><span>Forza - '+istr[0].forza+'%</span></div>');
            $('#resistenza').html('<div role="progressbar" aria-valuenow="'+istr[0].resistenza+'" aria-valuemin="0" aria-valuemax="100" style="width: '+istr[0].resistenza+'%;" class="progress-bar"><span>Resistenza - '+istr[0].resistenza+'%</span></div>');
            $('#equilibrio').html('<div role="progressbar" aria-valuenow="'+istr[0].equilibrio+'" aria-valuemin="0" aria-valuemax="100" style="width: '+istr[0].equilibrio+'%;" class="progress-bar"><span>Equilibrio - '+istr[0].equilibrio+'%</span></div>');
            $('#riflessi').html('<div role="progressbar" aria-valuenow="'+istr[0].riflessi+'" aria-valuemin="0" aria-valuemax="100" style="width: '+istr[0].riflessi+'%;" class="progress-bar"><span>Riflessi - '+istr[0].riflessi+'%</span></div>');
            $('#domanda1').html(''+istr[0].domanda1+'');
            $('#domanda2').html(''+istr[0].domanda2+'');
            $('#risposta1').html(''+istr[0].risposta1+'');
            $('#risposta1').css("text-align","justify");
            $('#risposta2').html(''+istr[0].risposta2+'');
            $('#risposta2').css("text-align","justify");
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
        url: 'http://ourgym.altervista.org/getCorsoIstruttore.php?id='+id,
        //Relative or absolute path to file.php file
        data: {istr:id},

        success: function(response) {
            console.log(JSON.parse(response));
            var istr=JSON.parse(response);
          var el = '';
            
         for(var i=0;i<istr.length;i++){

                el += ('<li><a href="./istruttore.html?id='+istr[i].id_istruttore+'"><i class="fa fa-angle-right"></i>'+istr[i].nome+'</a></li>');
                
            }
                

            $("#istruttori").html(el);
           
            
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
    
}


