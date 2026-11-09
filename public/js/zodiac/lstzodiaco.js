var db = firebase.apps[0].firestore();

const tabla = document.querySelector('#tabla');

db.collection("datosZodiaco").orderBy('posic', 'asc').get().then(function(query){
  tabla.innerHTML="";
  var salida = "";
  query.forEach(function(doc){
    var d = doc.data();
    salida += '<div class="divAnuncio m-3" onclick="location.href=\'editar.html?id='+doc.id+'\'" title="Editar signo">';
    salida += '<div class="imgBlock"><img src="'+ (d.url || '') +'" width="100%"/></div>';
    salida += '<div class="signo-titulo">'+ (d.signo || '-') +'</div>';
    salida += '<div class="dato-extra">'+ (d.rango || '-') +'</div>';
    salida += '<div class="dato-extra">Elemento: ' + (d.elemento || '-') + '</div>';
    salida += '<div class="dato-extra">Astro: ' + (d.astro || '-') + '</div>';
    salida += '<div class="dato-extra">Piedra: ' + (d.piedra || '-') + '</div>';
    salida += '<br/><div class="accion">Haz clic para editar</div>';
    salida += '</div>';
  });
  tabla.innerHTML = salida;
})
.catch(function(error){
  console.error("Error obteniendo signos: ", error);
  tabla.innerHTML = "<p>Error al cargar los signos zodiacales.</p>";
});