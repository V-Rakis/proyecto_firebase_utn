// JavaScript Document
// create local database firestore variable
var db = firebase.apps[0].firestore();
var auth = firebase.apps[0].auth();

// create local from webpage inputs
const txtNombre = document.querySelector('#txtNombre');
const txtEmail = document.querySelector('#txtEmail');
const txtContra = document.querySelector('#txtContra');
const txtFecCreacion = document.querySelector('#txtFecCreacion');
const txtUltAcceso = document.querySelector('#txtUltAcceso');

// create local insert button
const btnInsUser = document.querySelector('#btnInsUser');

// asignar fecha de creacion y fecha de ultimo acceso al momento del registro
function formatearFecha(dt){
  return dt.toLocaleString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

function asignarFechas(){
  const dt = new Date();
  txtFecCreacion.value = formatearFecha(dt);
  txtUltAcceso.value = formatearFecha(dt);
  return dt;
}

window.addEventListener('DOMContentLoaded', function(){
  asignarFechas();
});

// assign button listener
btnInsUser.addEventListener('click', function () {
  const dt = asignarFechas();
  auth.createUserWithEmailAndPassword(txtEmail.value, txtContra.value)
    .then((userCredential) => {
      const user = userCredential.user;
      db.collection("datosUsuarios").add({
        "idemp": user.uid,
        "usuario": txtNombre.value,
        "email": user.email,
        "fecCreacion": dt,
        "ultAcceso": dt
      }).then(function (docRef) {
        alert("Usuario agregado satisfactoriamente");
        limpiar();
      }).catch(function (FirebaseError) {
        alert("Error al registrar datos del usuario." + FirebaseError);
      });
    })
    .catch((error) => {
      alert("Error al agregar el nuevo usuario: " + error.message);
    });
});

function limpiar(){
  txtNombre.value = '';
  txtEmail.value = '';
  txtContra.value = '';
  txtFecCreacion.value = '';
  txtUltAcceso.value = '';
  txtNombre.focus();
}