let Sprite_Box_Red;
let Sprite_Box_blue;
let Sprite_Box_green;
let Sprite_Box_yellow;

let Sound;

let button_Start;
let AuxNext;
let AuxNext2;
let PaintBox;

let NumRandom;
let Secuencia = []
let SecuenciaElegida = []

let Nivel = 2000

let ShowText_1 = false
let ShowText_2 = false
let ShowText_3 = false

let Click = false
let VerifySecuence = false

function preload() { //Creacion de Sprites, Sonido, Buttons y diseño
    Sprite_Box_Red = createSprite(150, 150, 150, 150)
    Sprite_Box_Red.shapeColor = color(150, 0, 0);

    Sprite_Box_blue = createSprite(320, 150, 150, 150)
    Sprite_Box_blue.shapeColor = color(0, 0, 150);

    Sprite_Box_green = createSprite(150, 320, 150, 150)
    Sprite_Box_green.shapeColor = color(0, 150, 0)

    Sprite_Box_yellow = createSprite(320, 320, 150, 150)
    Sprite_Box_yellow.shapeColor = color(150, 150, 0)

    button_Start = createButton('Iniciar Juego')
    button_Start.position(175,430)

    button_Start.style('background-color', '#3ea6f7');
    button_Start.style('color', 'white');
    button_Start.style('padding', '10px 20px');
    button_Start.style('border', 'none');
    button_Start.style('border-radius', '5px');
    button_Start.style('font-size', '16px');

    Sound = loadSound("https://raw.githubusercontent.com/FarmaJava/TP/main/select-sound-121244.mp3")
}

function Secuence() { // Creador de Secuencia Aleatoria
    NumRandom = random(0,4)
    NumRandom = floor(NumRandom)

    Secuencia.push(NumRandom)
    console.log(Secuencia)
}

function Text_Start() { //Textos Iniciales
    button_Start.remove();
    Secuence()

    ShowText_1 = true //Texto Uno

    setTimeout(function() {
        ShowText_1 = false
        ShowText_2 = true // Texto Dos
    },3000);

    setTimeout(function() {
        ShowText_2 = false
        ShowSecuence() // Inicia la Visualizacion de Secuencia

    },6000);
}

function ShowBox(Box) { // Se pintan los Sprites correspondientes
    if (PaintBox) {
        clearInterval(PaintBox);
    }

    if ( Secuencia[Box] == 0 ) {
        Sprite_Box_Red.shapeColor = color(255, 0, 0);
    }

    if ( Secuencia[Box] == 1 ) {
        Sprite_Box_blue.shapeColor = color(0, 0, 255);
    } 

    if ( Secuencia[Box] == 2 ) {
        Sprite_Box_green.shapeColor = color(0, 255, 0);
    } 

    if ( Secuencia[Box] == 3 ) {
        Sprite_Box_yellow.shapeColor = color(255, 255, 0);
    } 
    
    PaintBox = setTimeout(() => {
        ResetBoxs();
    }, 800);

}

function ShowSecuence() { // Se recorren los Sprites
    for (let i = 0; i < Secuencia.length; i++) {
        setTimeout(() => {
            ShowBox(i)
        }, i * 1000);
         // Se pintan los Sprites correnspondientes
        
    }

    Click = true // Se activa el Click
    VerifySecuence = true // Se activa la verificacion de la Secuencia Elegida
}

function ResetBoxs() {
    Sprite_Box_Red.shapeColor = color(150, 0, 0);
    Sprite_Box_blue.shapeColor = color(0, 0, 150);
    Sprite_Box_green.shapeColor = color(0, 150, 0);
    Sprite_Box_yellow.shapeColor = color(150, 150, 0);
}

function setup() {
    createCanvas(500, 500)
}

function draw() {
    background(160, 243, 145)
    drawSprites()

    Sound.play();
    button_Start.mousePressed(Text_Start);

    if (ShowText_1) { // Se verifica y imprime el Texto Uno
        textSize(24);
        fill(0);
        textFont('Georgia');
        text("Atento que Empieza el Juego!", 80, 30)
    }

    if (ShowText_2) { // Se verifica y imprime el Texto Dos
        textSize(24);
        fill(0);
        textFont('Georgia');
        text('Aprieta las cajas segun la \n siguiente secuencia: ', 80, 30)
    }

    if (ShowText_3) { // Se verifica y imprime el Texto Tres
        textSize(24);
        fill(0);
        textFont('Georgia');
        text('Excelente! Vamos con \n el siguiente paso de la Secuencia', 60, 30)
    }

    if (VerifySecuence) { // Se verifica la Secuencia y Muestra los escenarios de WIN o YOU LOST
        for (let i = 0; i < Secuencia.length; i++) {
            if (Secuencia[i] != SecuenciaElegida[i]) { // Se verifica si la secuencia elegida es correcta
                if ( SecuenciaElegida[i] != undefined) { // Se verifica si la secuencia elegida no se eligio todavia
                    background(160, 243, 145)
                    textSize(24);
                    fill(0);
                    textFont('Georgia');
                    text("Lo Siento! Pero te Equivocaste :( \n Reinicia la Pagina para Volver a Jugar", 60, 30) // Texto de YOU LOST
                }
            }
        }

        if (Secuencia.length === SecuenciaElegida.length && Secuencia.every((valor, index) => valor === SecuenciaElegida[index])) { 
            // Se verifica Si la secuencia y secuencia Eli. tienen el mismo largo
            // Luego se ejecuta un .every para verificar la igualdad de arreglos
            ShowText_3 = true
            Click = false // Se desactiva el Clik
            VerifySecuence = false // Se desactiva la Verificacion de Secuencia
            SecuenciaElegida = [] // Se reinicia el arrglego de secuencia elegida

            AuxNext2 = setInterval(() => { // Se desactiva el Teto Tres a los 2 Seg
                ShowText_3 = false
            
                clearInterval(AuxNext2)
            }, 2000);

            AuxNext = setInterval(() => { 
                // Se pushea un nuevo elemento de secuencia, y se reinicia la visualizacion
                // A los 3 segundos
                Secuence()
                ShowSecuence()
            
                clearInterval(AuxNext)
            }, 3000);
        
        }
    }
}

function mouseClicked() { // Verifica  el Click

    console.log(SecuenciaElegida)

    if (Click) { // Verifica si Click esta activado

        if (Sprite_Box_Red.overlapPoint(mouseX, mouseY)) { // Se verifica el click del sprite rojo
            SecuenciaElegida.push(0)
            Sprite_Box_Red.shapeColor = color(255, 0, 0);
            setTimeout(function() {
                Sprite_Box_Red.shapeColor = color(150, 0, 0);
            },500);
        }

        if (Sprite_Box_blue.overlapPoint(mouseX, mouseY)) { // Se verifica el click del sprite azul
            SecuenciaElegida.push(1)
            Sprite_Box_blue.shapeColor = color(0, 0, 255);
            setTimeout(function() {
                Sprite_Box_blue.shapeColor = color(0, 0, 150);
            },500);
        }

        if (Sprite_Box_green.overlapPoint(mouseX, mouseY)) { // Se verifica el click del sprite verde
            SecuenciaElegida.push(2)
            Sprite_Box_green.shapeColor = color(0, 255, 0);
            setTimeout(function() {
                Sprite_Box_green.shapeColor = color(0, 150, 0);
            },500);
        }

        if (Sprite_Box_yellow.overlapPoint(mouseX, mouseY)) { // Se verifica el click del sprite amarrillo
            SecuenciaElegida.push(3)
            Sprite_Box_yellow.shapeColor = color(255, 255, 0);
            setTimeout(function() {
                Sprite_Box_yellow.shapeColor = color(150, 150, 0);
            },500);
        }
    }

}