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
        url: 'http://ourgym.altervista.org/getIstruttore.php?id='+id,
        //Relative or absolute path to file.php file
        data: {istr:id},

        success: function(response) {
            console.log(JSON.parse(response));
            var istr=JSON.parse(response);
           var nome ='';
           var  bio ='';
            var img ='';
            
         for(var i=0;i<istr.length;i++){

                nome += (''+istr[i].nome+'');   
                bio += (''+istr[i].bio+'');
                img += ('<img src="'+istr[i].percorso+'">');   
                
            }
                
            console.log(nome);
             console.log(bio);
             console.log(img);

            $("h1").html(nome);
            $("title").html('OURGYM - '+nome);
            $(".bio").html(bio);
            $(".bio").css("text-align","justify");
            $("#foto").html(img);
            $("#p1").html('<div data-percent='+istr[0].p1+' class="chart easyPieChart"><span class="percent">'+istr[0].p1+'</span><canvas width="190" height="190"> </div><h3>Forza</h3>');
            $("#p2").html('<div data-percent='+istr[0].p2+' class="chart"><span class="percent">'+istr[0].p2+'</span></div><h3>Resistenza</h3>');
            $("#p3").html('<div data-percent='+istr[0].p3+' class="chart"><span class="percent">'+istr[0].p3+'</span></div><h3>Equilibrio</h3>');
            $("#p4").html('<div data-percent='+istr[0].p4+' class="chart"><span class="percent">'+istr[0].p4+'</span></div><h3>Riflessi</h3>');
            
            
            if(istr[0].r1!=""){
                $("#f1").html(istr[0].r1);
                $("#f1").css("text-align","justify");
            }else{
                $("#uno").css("display","none");
            }
            if(istr[0].r2!=""){
                $("#f2").html(istr[0].r2);
                $("#f2").css("text-align","justify");
            }else{
                $("#due").css("display","none");
            }
            if(istr[0].r3!=""){
                $("#f3").html(istr[0].r3);
                $("#f3").css("text-align","justify");
            }else{
                $("#tre").css("display","none");
            }
            if(istr[0].r3!=""){
                $("#f4").html(istr[0].r4);
                $("#f4").css("text-align","justify");
            }else{
                $("#quattro").css("display","none");
            }
            
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
        url: 'http://ourgym.altervista.org/getIstruttorePremi.php?id='+id,
        //Relative or absolute path to file.php file
        data: {istr:id},

        success: function(response) {
            console.log(JSON.parse(response));
            var istr=JSON.parse(response);
          var el = '';
            
         for(var i=0;i<istr.length;i++){

                el += ('<div class="testimonials-item"><figure><img src="'+istr[i].immagine+'" alt="//"></figure><p>'+istr[i].descrizione+'<span>'+istr[i].luogo+'</span></p></div>');
                
            }
                

            $(".premi").html(el);
           
            
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
        url: 'http://ourgym.altervista.org/getIstruttoreCorsi.php?id='+id,
        //Relative or absolute path to file.php file
        data: {istr:id},

        success: function(response) {
            console.log(JSON.parse(response));
            var istr=JSON.parse(response);
          var el = '';
            
         for(var i=0;i<istr.length;i++){

                el += ('<li><a href="./corso.html?id='+istr[i].id_corso+'"><i class="fa fa-angle-right"></i>'+istr[i].titolo+'</a></li>');
                
            }
                

            $("#corsi").html(el);
           
            
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
    
    
    
     
    
    
}
