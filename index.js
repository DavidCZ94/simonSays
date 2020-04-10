const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');
const ULTIMO_NIVEL = 10;

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this);
    this.inicializar();
    this.generarSecuencia();
    setTimeout(() => {
      this.siguenteNivel();
    }, 500);
  }
  inicializar() {
    /*
      when an event happens the reference of this change, 
      this ==> object, change to this ==> when event happens.
      to bind the original this (object) we use the function bind(this) 
      
      this.colores.celeste.addEventListener('click', this.elegirColor.bind(self));
    */
    this.siguenteNivel = this.siguenteNivel.bind(this); 
    this.elegirColor = this.elegirColor.bind(this);
    this.toggleBtnEmpezar();
    this.nivel = 1;
    //Creating object with the color buttoms
    this.colores = {
      celeste: celeste,
      violeta: violeta,
      naranja: naranja, 
      verde: verde
    };
  }
  
  toggleBtnEmpezar(){
    if (btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('hide');
    }else{
      btnEmpezar.classList.add('hide');
    }
  }

  generarSecuencia(){
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0);
    this.secuencia = this.secuencia.map(n => Math.floor(Math.random() * 4));
  }

  siguenteNivel(){
    this.subnivel = 0;
    this.ilumarSecuencia();
    this.agregarEventosClick();
  }

  transformarNumeroAColor(numero){
    switch (numero){
      case 0:
        return 'celeste';
      case 1:
        return 'violeta';
      case 2:
        return 'naranja';
      case 3:
        return 'verde';
    }
  }
  transformarColorANumero(color){
    switch (color){
      case 'celeste':
        return 0;
      case 'violeta':
        return 1;
      case 'naranja':
        return 2;
      case 'verde':
        return 3;
    }
  }

  ilumarSecuencia(){
    for (let i = 0 ; i < this.nivel ; i++){
      const color = this.transformarNumeroAColor(this.secuencia[i]);
      setTimeout(() => this.iluminarColor(color), 1000 * i);
    }
  }

  iluminarColor(color){
    this.colores[color].classList.add('light');
    setTimeout(() => this.apagarColor(color), 350);
  }

  apagarColor(color){
    this.colores[color].classList.remove('light');
  }

  agregarEventosClick(){
    /*
      when an event happens the reference of this change, 
      this ==> object, change to this ==> when event happens.
      to bind the original this (object) we use the function bind(this) 

      this.colores.celeste.addEventListener('click', this.elegirColor.bind(self));
    */
    this.colores.celeste.addEventListener('click', this.elegirColor);
    this.colores.violeta.addEventListener('click', this.elegirColor);
    this.colores.naranja.addEventListener('click', this.elegirColor);
    this.colores.verde.addEventListener('click', this.elegirColor);
  }

  eliminarEventosClick(){
    this.colores.celeste.removeEventListener('click', this.elegirColor);
    this.colores.violeta.removeEventListener('click', this.elegirColor);
    this.colores.naranja.removeEventListener('click', this.elegirColor);
    this.colores.verde.removeEventListener('click', this.elegirColor);
  }

  elegirColor(ev){
    const nombreColor = ev.target.dataset.color;
    const numeroColor = this.transformarColorANumero(nombreColor);
    this.iluminarColor(nombreColor);
    if (numeroColor === this.secuencia[this.subnivel]){
      this.subnivel++;
      if(this.subnivel === this.nivel){
        this.nivel++;
        this.eliminarEventosClick();
        if (this.nivel === (ULTIMO_NIVEL + 1)) {
          this.ganoElJuego();
        }else{
          setTimeout(this.siguenteNivel, 1500);
        }
      }
    }else{
      this.perdioElJuego();
    }
  }

  ganoElJuego(){
    swal('David', 'Felicitaciones, ganaste el juego', 'success')
    .then(this.inicializar);
  }

  perdioElJuego(){
    swal('David', 'Lo lamento, perdiste :(', 'error')
    .then(() => {
      this.eliminarEventosClick();
      this.inicializar();
    });
  }

}

function empezarJuego() {
  this.juego = new Juego();
}