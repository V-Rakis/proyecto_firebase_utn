// JavaScript Document
var db = firebase.apps[0].firestore();
var container = firebase.apps[0].storage().ref();

const txtPosic = document.querySelector('#txtPosic');
const txtSigno = document.querySelector('#txtSigno');
const txtRango = document.querySelector('#txtRango');
const txtElemento = document.querySelector('#txtElemento');
const txtAstro = document.querySelector('#txtAstro');
const txtAstroOtro = document.querySelector('#txtAstroOtro');
const txtPiedra = document.querySelector('#txtPiedra');
const txtPiedraOtro = document.querySelector('#txtPiedraOtro');
const txtArchi = document.querySelector('#txtArchi');
const btnLoad  = document.querySelector('#btnLoad');

btnLoad.addEventListener('click', function(){
  const archivo = txtArchi.files[0];
  const nomarch = archivo.name;
  if(archivo == null){
    alert('Debe seleccionar una imagen');
  }else{
    const metadata = {
      contentType : archivo.type
    }
    const subir = container.child('zodiaco/'+nomarch).put(archivo, metadata);
    subir
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then( url =>{
        // Si se seleccionó "Otro", usar el valor del input de texto
        const astroFinal = txtAstro.value === 'Otro' ? txtAstroOtro.value : txtAstro.value;
        const piedraFinal = txtPiedra.value === 'Otro' ? txtPiedraOtro.value : txtPiedra.value;
        db.collection("datosZodiaco").add({
          "posic" : parseInt(txtPosic.value),
          "signo" : txtSigno.value,
          "rango" : txtRango.value,
          "url"   : url,
          "elemento" : txtElemento.value,
          "astro" : astroFinal,
          "piedra" : piedraFinal
        }).then(function(docRef) {
          alert("ID del registro: " + docRef.id);
          limpiar();
        }).catch(function(FirebaseError) {
          alert("Error al subir la imagen: " + FirebaseError);
        });
      });
  }
});

function limpiar(){
  txtPosic.value = ''
  txtSigno.value = '';
  txtRango.value = '';
  txtElemento.value = '';
  txtAstro.value = '';
  txtAstroOtro.value = '';
  txtPiedra.value = '';
  txtPiedraOtro.value = '';
  txtArchi.value = '';
  txtPosic.focus();
  // ocultar divs de "Otro" por si quedaban abiertos
  document.querySelectorAll('.oculto').forEach(d => d.classList.add('oculto'));
}

function limpiar(){
  txtPosic.value = ''
  txtSigno.value = '';
  txtRango.value = '';
  txtElemento.value = '';
  txtAstro.value = '';
  txtPiedra.value = '';
  txtArchi.value = '';
  txtPosic.focus();
}