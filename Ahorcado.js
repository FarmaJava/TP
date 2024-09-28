let palabras = ["amigo", "barco", "cielo", "donde", "fuego", "gente", "huevo", "lápiz", "mango", "nieve", "papel", "queso", "rocas", "soles", "tigre", "unión", "voces", "zorro", "árbol", "banco", "campo", "diosa", "feliz", "golpe", "honor", "islas", "luzco", "manos", "nubes", "punto", "salud", "tarde", "usado", "valle", "barca", "cinta", "ducha", "focos", "guapo", "horno", "imán", "leche", "moras", "nueva", "plaza", "ratas", "temas", "vejez", "ancho", "bravo", "circo", "dieta", "flaca", "giras", "humor", "ideal", "jugos", "lazos", "menta", "nueve", "palma", "regla", "sonar", "tenis", "urano", "verde", "beber", "cabra", "fresa", "globo", "jaula", "lejos", "monta", "peces", "reina", "sello", "viven", "zafiro", "armas", "baile", "cabos", "dedos", "grito", "hotel", "infla", "jugar", "lamas", "medir", "papas", "radio", "salto", "tinte", "urnas", "virus", "arena", "baño", "camas", "deseo", "fines", "habla", "joven", "lindo", "mover", "noche", "puros", "ratón", "salva", "anexo", "broma", "costa", "fruto", "gatos", "hurto", "junta", "lucir", "mixto", "niñas", "pelos", "rubor", "tenaz", "útil", "volar", "yerba", "zanjo", "altar", "bolso", "corto", "flojo", "grano", "hecho", "luces", "mecha", "nadar", "poder", "razón", "siglo", "terco", "velas", "yogur", "zarza", "avión", "banda", "costo", "dudas", "ganar", "horas", "jorge", "laico", "marco", "noble", "pauta", "ronda", "suelo", "temer", "volca", "álbum", "bebes", "cruel", "denso", "iluso", "jefes", "niños", "pelar", "rumor", "soñar", "unico", "vuelo", "zorra", "ancla", "burla", "coral", "dólar", "furia", "hotel", "inglés", "japon", "lucha", "meter", "norma", "punto", "rival", "sueño", "trato", "yermo", "aceite", "acento", "alberg", "ángulo", "bailar", "barrer", "brillo", "botón", "colina", "correr", "dócil", "drama", "entero", "elegir", "fábula", "fijado", "flotar", "gritar", "guitra", "herida", "icono", "impacto", "jaguar", "lógica", "mandar", "noble", "ñandu", "perlas", "pulgas", "ramita", "saltar", "tierra", "valija", "zapato", "zarpar"];
let NR;
let letrasCorrectas = []
let input;
let boxs = 5
let vidas = 6
let Contador = 0

function preload() { //Elige una palabra aleatoria
    NR = random(0,219)
    NR = floor(NR)
}

function setup() {
    createCanvas(700, 800)
    background(112, 189, 250)

    //Guide
    fill(53, 108, 151)
    rect(0,0,700,100)
    rect(0,700,800,100)
    fill(255)

    console.log(palabras[NR])

    //Casillas de la palabra
    if ( palabras[NR].length >= 6) {
        square(520, 10, 80)
    }
    square(70, 10, 80)
    square(160, 10, 80)
    square(250, 10, 80)
    square(340, 10, 80)
    square(430, 10, 80)

    //Soporte de StickMan
    strokeWeight(5);
    line(150, 600, 150, 180);
    line(100, 600, 200, 600);
    line(140, 180, 420, 180);
    line(400, 220, 400, 180);

    //Input
    input = createInput()
    input.position(50,730)
    input.size(600,40)
    input.style('font-size', '50px')
}

function draw() {
    input.input(() => { // Input.lenght = 1
        let valor = input.value();
        if (valor.length > 1) {
            input.value(valor.charAt(1));
        }
    });

    // Vidas
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text(`Oportunidades: ${vidas}`, 20, 150)

    //Escena de You Win
    if (letrasCorrectas.length === palabras[NR].length) { 
        let Array = letrasCorrectas.join('')
        if (palabras[NR] == Array) {
            background(0, 255, 0)
            input.remove()

            //Creacion y estilo del boton
            let Boton = createButton('Reiniciar')
            Boton.position(200,700)
            Boton.size(300, 30)
            Boton.style('background-color', '#d31d1d');
            Boton.style('color', 'white');
            Boton.style('padding', '20px');
            Boton.style('border', 'none');
            Boton.style('border-radius', '5px');
            Boton.style('font-size', '30px');
            Boton.style('display', 'flex');
            Boton.style('justify-content', 'center');
            Boton.style('align-items', 'center');

            Boton.mousePressed(() => {location.reload()})

            textSize(100)
            text("YOU WIN :D", 80, 400)
        }
    }

    // Escena de Game Over
    if ( vidas === 0) {
        background(255, 0, 0)
        input.remove()

        //Creacion y estilo del boton
        let Boton = createButton('Reiniciar')
        Boton.position(200,700)
        Boton.size(300, 30)
        Boton.style('background-color', '#1dd35f');
        Boton.style('color', 'white');
        Boton.style('padding', '20px');
        Boton.style('border', 'none');
        Boton.style('border-radius', '5px');
        Boton.style('font-size', '30px');
        Boton.style('display', 'flex');
        Boton.style('justify-content', 'center');
        Boton.style('align-items', 'center');

        Boton.mousePressed(() => {location.reload()})

        textSize(100)
        text("PERDISTE", 100, 400)
    }
} 

function keyPressed() { // Accion de ENTER y verificacion de input y palabra
    if ( vidas > 0 ) {
            
        if (keyIsDown(ENTER) === true) {
            for (let i = 0; i < palabras[NR].length; i++) {
                if (input.value() === palabras[NR][i]) {
                    Palabra(i)
                    Contador++
                    letrasCorrectas[i] = input.value()
                    console.log(letrasCorrectas);
                    
                }
            }
        
        StickMan()
        Contador = 0
        input.value("")
        }
    }
}

function Palabra(i) { //Accion de casilla Con Letra Encontrada
    
    strokeWeight(6);
    fill(0)
    
    if ( i === 0) {
        textSize(80)
        text(input.value().toUpperCase(), 85, 75)
    }

    if ( i === 1) {
        textSize(80)
        text(input.value().toUpperCase(), 175, 75)
    }

    if ( i === 2) {
        textSize(80)
        text(input.value().toUpperCase(), 265, 75)
    }

    if ( i === 3) {
        textSize(80)
        text(input.value().toUpperCase(), 355, 75)
    }

    if ( i === 4) {
        textSize(80)
        text(input.value().toUpperCase(), 440, 75)
    }

    if ( i === 5) {
        textSize(80)
        text(input.value().toUpperCase(), 525, 75)
    }
}

function StickMan() { // Accion de Error

    if (Contador === 0) { 
        vidas--
        fill(255)
        if ( vidas === 5) {
            circle(400, 270, 100);
        }

        if (vidas === 4) {
            line(400, 465, 400, 320);
        }

        if (vidas === 3) {
            line(300, 400, 400, 320);
        }

        if (vidas === 2) {
            line(500, 400, 400, 320);
        }

        if (vidas === 1) {
            line(300, 550, 400, 465);
        }

        if (vidas === 0) {
            line(500, 550, 400, 465);
        }
    }
}