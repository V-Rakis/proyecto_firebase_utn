// JavaScript Document
var db = firebase.apps[0].firestore();

const txtId = document.querySelector('#txtId');
const txtPosic = document.querySelector('#txtPosic');
const txtSigno = document.querySelector('#txtSigno');
const txtRango = document.querySelector('#txtRango');
const txtElemento = document.querySelector('#txtElemento');
const txtAstro = document.querySelector('#txtAstro');
const txtAstroOtro = document.querySelector('#txtAstroOtro');
const txtPiedra = document.querySelector('#txtPiedra');
const txtPiedraOtro = document.querySelector('#txtPiedraOtro');
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
  // Si el valor guardado no está en las opciones del select, mostrar el input "Otro"
  if (d.astro && !['Sol','Luna','Mercurio','Venus','Marte','Júpiter','Saturno','Urano','Neptuno','Plutón','Otro'].includes(d.astro)) {
    txtAstro.value = 'Otro';
    document.getElementById('divOtroAstro').classList.remove('oculto');
    txtAstroOtro.value = d.astro;
    txtAstroOtro.required = true;
  }
  if (d.piedra && !['Amatista','Aguamarina','Diamante','Esmeralda','Topacio','Rubí','Zafiro','Ópalo','Granate','Perla','Otro'].includes(d.piedra)) {
    txtPiedra.value = 'Otro';
    document.getElementById('divOtroPiedra').classList.remove('oculto');
    txtPiedraOtro.value = d.piedra;
    txtPiedraOtro.required = true;
  }
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
  // Si se seleccionó "Otro", usar el valor del input de texto
  const astroFinal = txtAstro.value === 'Otro' ? txtAstroOtro.value : txtAstro.value;
  const piedraFinal = txtPiedra.value === 'Otro' ? txtPiedraOtro.value : txtPiedra.value;
  db.collection("datosZodiaco").doc(docId).update({
    posic: parseInt(txtPosic.value),
    signo: txtSigno.value,
    rango: txtRango.value,
    elemento: txtElemento.value,
    astro: astroFinal,
    piedra: piedraFinal
  }).then(function(){
    alert('Signo actualizado satisfactoriamente.');
    document.location.href = 'lista.html';
  }).catch(function(error){
    alert('Error al actualizar el signo: ' + error.message);
  });
});