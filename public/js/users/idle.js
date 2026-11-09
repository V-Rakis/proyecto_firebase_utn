// JavaScript Document
// Cierre de sesion automatico tras 3 minutos de inactividad
var auth = firebase.apps[0].auth();
var idleTimer;
const IDLE_TIME = 3 * 60 * 1000; // 180.000 ms = 3 minutos

function resetIdleTimer(){
  clearTimeout(idleTimer);
  idleTimer = setTimeout(function(){
    auth.signOut().then(function(){
      alert('Sesion cerrada por inactividad (3 minutos sin movimiento).');
      document.location.href = 'login.html';
    }).catch(function(error){
      alert('Error al cerrar la sesion por inactividad: ' + error.message);
      document.location.href = 'login.html';
    });
  }, IDLE_TIME);
}

function activarIdleLogout(){
  window.addEventListener('mousemove', resetIdleTimer);
  window.addEventListener('keydown', resetIdleTimer);
  window.addEventListener('click', resetIdleTimer);
  window.addEventListener('scroll', resetIdleTimer);
  resetIdleTimer();
}

window.addEventListener('load', function(){
  auth.onAuthStateChanged(function(user){
    if (user){
      activarIdleLogout();
    }
  });
});