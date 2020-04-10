const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')

class Juego {
  constructor() {
    this.inicializar();
    this.generarSecuencia();
  }
  inicializar() {
    btnEmpezar.classList.add('hide');
    this.nivel = 1;
    //Creating object with the color buttoms
    this.colores = {
      celeste: celeste,
      violeta: violeta,
      naranja: naranja, 
      verde: verde
    }
  }
  
  generarSecuencia(){
    this.secuencia = new Array(10).fill(0);
    this.secuencia = this.secuencia.map(n => Math.floor(Math.random() * 4));
  }
}

function empezarJuego() {
  window.juego = new Juego();
}