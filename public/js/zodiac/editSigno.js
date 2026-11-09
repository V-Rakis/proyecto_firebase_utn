// JavaScript Document
var db = firebase.apps[0].firestore();

const txtId = document.querySelector('#txtId');
const txtPosic = document.querySelector('#txtPosic');
const txtSigno = document.querySelector('#txtSigno');
const txtRango = document.querySelector('#txtRango');
const txtElemento = document.querySelector('#txtElemento');
const txtAstro = document.querySelector('#txtAstro');
const txtPiedra = document.querySelector('#txtPiedra');
const imgPreview = document.querySelector('#imgPreview');
const btnUpdate = document.querySelector('#btnUpdate');
const btnCancel = document.querySelector('#btnCancel');

// obtener el id del signo desde la URL (?id=...)
const params = new URLSearchParams(window.location.search);
const docId = params.get('id');

if(!docId){
  alert('No se selecciono ningun signo.');
  document.location.href = 'lista.html';
}

// cargar los datos del signo seleccionado para presentarlos en el formulario
db.collection("datosZodiaco").doc(docId).get().then(function(doc){
  if(!doc.exists){
    alert('El signo no existe.');
    document.location.href = 'lista.html';
    return;
  }
  var d = doc.data();
  txtId.value = doc.id;
  txtPosic.value = d.posic || '';
  txtSigno.value = d.signo || '';
  txtRango.value = d.rango || '';
  txtElemento.value = d.elemento || 'Fuego';
  txtAstro.value = d.astro || '';
  txtPiedra.value = d.piedra || '';
  if(d.url){
    imgPreview.src = d.url;
    imgPreview.classList.remove('oculto');
  }
}).catch(function(error){
  alert('Error al cargar el signo: ' + error.message);
  document.location.href = 'lista.html';
});

// volver a la lista sin guardar
btnCancel.addEventListener('click', function(){
  document.location.href = 'lista.html';
});

// actualizar los datos del signo seleccionado (requiere regla de acceso 'update')
btnUpdate.addEventListener('click', function(){
  db.collection("datosZodiaco").doc(docId).update({
    posic: parseInt(txtPosic.value),
    signo: txtSigno.value,
    rango: txtRango.value,
    elemento: txtElemento.value,
    astro: txtAstro.value,
    piedra: txtPiedra.value
  }).then(function(){
    alert('Signo actualizado satisfactoriamente.');
    document.location.href = 'lista.html';
  }).catch(function(error){
    alert('Error al actualizar el signo: ' + error.message);
  });
});