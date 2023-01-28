/* Este código es un juego de lotería llamado Quiniele v0.1. 
El usuario cuenta con una cantidad de créditos para apostar. 
El usuario ingresa los números y posiciones (1,5,10 o 20) a los que desea apostar,
así como la cantidad de créditos que desea apostar. Después de confirmar 
la apuesta, el usuario puede agregar una nueva apuesta o realizar 
el sorteo. Una vez que el usuario confirma el sorteo, se generan 
números aleatorios entre 0 y 999, para luego comparar si el usuario 
ganó alguna vez con las apuestas hechas. Si el usuario ganó alguna 
vez, el dinero ganado se suma a los créditos disponibles, mostrando 
el resultado final. */

// Función para mostrar mensaje de bienvenida
function mostrarMensajeBienvenida(dinero){
    console.log(`Bienvenido a Quiniele! Usted dispone de ${dinero} créditos para apostar.`);
  }
  
  // Función para validar número de apuesta
  function validarNumeroApuesta(apuestaNum) {
    if (apuestaNum.length !== 2 && apuestaNum.length !== 3) {
      alert("DEBE INGRESAR UN NÚMERO DE 2 O 3 CIFRAS.");
      return false;
    }
    return true;
  }
  
  // Función para validar posición de apuesta
  function validarPosicionApuesta(apuestaPos) {
    if (!["1", "5", "10", "20"].includes(apuestaPos)) {
      alert("LA POSICIÓN A APOSTAR SÓLO PUEDE SER 1, 5, 10 O 20.");
      return false;
    }
    return true;
  }
  
  // Función para validar cantidad de dinero
  function validarDineroApuesta(apuestaDinero, dinero) {
    if (apuestaDinero > dinero) {
      alert(`NO DISPONE DE SUFICIENTES CRÉDITOS PARA REALIZAR ESTA APUESTA. CRÉDITOS DISPONIBLES: ${dinero}`);
      return false;
    }
    return true;
  }
  
  // Función para validar confirmación de apuesta
  function validarConfirmacion(confirmacion) {
    if (confirmacion.toLowerCase() === "no") {
      console.log("APUESTA CANCELADA.");
      return false;
    }
    console.log("APUESTA CONFIRMADA.");
    return true;
  }
  
  // Función para validar si se desea agregar una apuesta
  function validarAgregarApuesta(agregar) {
    return agregar.toLowerCase() === "si";
  }
  
  // Función para realizar el sorteo
  function realizarSorteo() {
    console.log("\nREALIZANDO SORTEO");
  
    let resultados = [];
    for (let i = 1; i <= 20; i++) {
      resultados.push(Math.floor(Math.random() * 1000).toString().padStart(3, "0"));
    }
  
    console.log(`Números sorteados: ${resultados.join(", ")}`);
    return resultados;
  }
  
  // Función para comprobar apuestas
  function comprobarApuestas(apuestas, resultados, dinero) {
    let gananciaTotal = 0;
  
    for (let i = 0; i < apuestas.length; i++) {
        let ganaste = 0;
        let dineroGanado = 0;
        let apuesta = apuestas[i];
        let coeficienteMultiplicador;
  
        if (apuesta.num.length === 3) {
            coeficienteMultiplicador = apuesta.pos === "20" ? 35 : apuesta.pos === "10" ? 70 : apuesta.pos === "5" ? 140 : 280;
            for (let j = 0; j < apuesta.pos; j++) {
                if (resultados[j] === apuesta.num) {
                    ganaste++;
                }
            }
            dineroGanado += (ganaste * apuesta.dinero * coeficienteMultiplicador);
            ganaste = 0;

        } else if (apuesta.num.length === 2) {
            coeficienteMultiplicador = apuesta.pos === "20" ? 3.5 : apuesta.pos === "10" ? 7 : apuesta.pos === "5" ? 14 : 70;
            for (let j = 0; j < apuesta.pos; j++) {
                if (resultados[j].slice(1) === apuesta.num) {
                    ganaste++;
                }
            }
            dineroGanado += (ganaste*apuesta.dinero*coeficienteMultiplicador)
            ganaste = 0;
        }
  
        if (dineroGanado > 0) {
            console.log(`Ganaste ${dineroGanado} créditos con la apuesta ${apuesta.num} en la posición ${apuesta.pos}.`);
        } else {
            console.log(`Perdiste la apuesta ${apuesta.num} en la posición ${apuesta.pos}.`);
        }
  
        gananciaTotal += dineroGanado;
    }
  
    console.log(`Ganaste un total de ${gananciaTotal} créditos.`);
    dinero += gananciaTotal;
    console.log(`Saldo actual: ${dinero} créditos.`);
    return dinero;
  }

  // Función de inicio de juego
function iniciarJuego(dinero) {
    mostrarMensajeBienvenida(dinero);
  
    let apuestas = [];
    let respuestaAgregar;
    do {
        let apuestaNum;
        do {
            apuestaNum = prompt("INGRESE EL NÚMERO A APOSTAR");
        } while (!validarNumeroApuesta(apuestaNum));
  
        let apuestaPos;
        do {
            apuestaPos = prompt("EN QUE POSICIÓN DESEA APOSTAR? (1, 5, 10 o 20)");
        } while (!validarPosicionApuesta(apuestaPos));
  
        let apuestaDinero;
        do {
            apuestaDinero = parseInt(prompt("CUÁNTOS CRÉDITOS DESEA APOSTAR?"));
        } while (!validarDineroApuesta(apuestaDinero, dinero));
        dinero -= apuestaDinero;
  
        let confirmacionApuesta;
        do {
            confirmacionApuesta = prompt(`CONFIRMA TU APUESTA? (SI/NO)
  NÚMERO: ${apuestaNum}
  POSICIÓN: ${apuestaPos}
  CRÉDITOS: ${apuestaDinero}`);
        } while (!validarConfirmacion(confirmacionApuesta));
  
        apuestas.push({
            num: apuestaNum,
            pos: apuestaPos,
            dinero: apuestaDinero
        });
  
        respuestaAgregar = prompt("¿DESEA AGREGAR OTRA APUESTA? (SI/NO)");
    } while (validarAgregarApuesta(respuestaAgregar));
  
    let resultados = realizarSorteo();
    comprobarApuestas(apuestas, resultados, dinero);

    let jugarDeNuevo = prompt("Desea jugar de nuevo?(SI/NO)");
    if (jugarDeNuevo === ""){
      iniciarJuego(dinero);
    }
  }
  
  // llamaríamos a la función iniciarJuego() para ejecutar el código, pasando como parámetro la cantidad de dinero disponible. Por ejemplo:
  
  iniciarJuego(100);