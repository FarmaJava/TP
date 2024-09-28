let input;
let NumeroRandom;
let Prueba;
let intentos = 0;
let historial = [];
let reset;
let usos;

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(100)
    
    //cuadradp
    fill(75)
    square(width / 2 - 250, height / 2 - 250, 500)

    fill(0)
    textSize(50)
    text("Insertar número (0 - 1000)", 10, height / 2 - 200)

    //cuadrado para escribir
    input = createInput();
    input.position(20, height / 2 - 150)
    input.size(300, 50)
    input.style('font-size', '30px');

    //signo del cuadrado
    textSize(400)
    text("?", width / 2 - 110, height / 2 + 125)

    //selecciona el numero
    NumeroRandom = random(0, 1000)
    NumeroRandom = floor(NumeroRandom)

    //boton
    Prueba = createButton('Probar')
    Prueba.position(20, height / 2 - 75)
    Prueba.size(300, 30)
    Prueba.mousePressed(intento)

    noStroke()
    fill(100)
    rect(0, 100, 500, 70);

    fill(0)
    textSize(50)
    text('Intentos: ' + intentos, 10, 150)

    fill(100)
    rect(0, 10, width, 50)

    fill(0)
    textSize(30)
    text('ya has usado estos numeros: ' + historial, 20, 40)

    textSize(35)
    text('preciona aqui para intentar otro numero', 10, height / 2 - 20)

    reset = createButton('Reiniciar')
    reset.position(20, height / 2)
    reset.size(300, 30)
    reset.mousePressed(Reiniciar)

    
}

function Reiniciar(){
    location.reload()
}

function intento(){
    //compara el numero puesto por el q hay que adivinar
    if(input.value() != NumeroRandom){
        incorrecto()
    }else
    if(input.value() == NumeroRandom){
        correcto()
    }
}

function correcto(){
    alert('bien el numero era ' + NumeroRandom + ' has usado ' + intentos + ' intentos')
}

function incorrecto(){
    //pregunta si el numero es mas grande o mas chico
    if(input.value() > NumeroRandom){
        fill(75)
        square(width / 2 - 250, height / 2 - 250, 500)

        fill(0)
        textSize(400)
        text("↓", width / 2 - 100, height / 2 + 90)

        intentos++

        noStroke()
        fill(100)
        rect(0, 100, 500, 70);
    
        fill(0)
        textSize(50)
        text('Intentos: ' + intentos, 10, 150)

        historial.push(input.value())

        fill(100)
        rect(0, 10, width, 50)
    
        fill(0)
        textSize(30)
        text('ya has usado estos numeros: ' + historial, 20, 40)

        input.value([])
    }else if(input.value() < NumeroRandom){
        fill(75)
        square(width / 2 - 250, height / 2 - 250, 500)
        
        fill(0)
        textSize(400)
        text("↑", width / 2 - 100, height / 2 + 90)

        intentos++

        noStroke()
        fill(100)
        rect(0, 100, 500, 70);
    
        fill(0)
        textSize(50)
        text('Intentos: ' + intentos, 10, 150)

        historial.push(input.value())

        fill(100)
        rect(0, 10, width, 50)
    
        fill(0)
        textSize(30)
        text('ya has usado estos numeros: ' + historial, 20, 40)

        input.value([])
    }
}

    function keyPressed() {
        if (keyCode === ENTER) {
        intento()
        }
    }