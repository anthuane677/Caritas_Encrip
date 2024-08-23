// Array de abecedario
const letras = "abcdefghijklmnñopqrstuvwxyz0123456789";

// Array de caritas para reemplazar
const caritas = [
    "ʕ•́ᴥ•̀ʔっ", //a
    "(̶◉͛‿◉̶)", //b
    "≧◉ᴥ◉≦", //c
    "(ㆆ_ㆆ)", //d
    "( ˘︹˘ )", //e
    "(ง︡'-'︠)ง", //f
    "(╥︣﹏᷅╥)", //g
    "(>‿◠)", //h
    "(◔‿◔)", //i
    "(＾▿＾)", //j
    "٩(˘◡˘)۶", //k
    "(✿◠‿◠)", //l
    "≧◠‿◠≦", //m
    "(͡• ͜ʖ ͡•)", //n
    "(͡° ͜ʖ ͡°)", //ñ
    "(❛‿❛✿̶̥̥)", //o
    "ᕙ(^▿^)", //p
    "ᕙ(▿´)ᕗ", //q
    " (•◡•)", //r
    "(¬‿¬)", //s
    "(─‿‿─)", //t
    "≧◠‿●‿◠≦", //u
    "≧◠ᴥ◠≦", //v
    "（っ＾▿＾）", //w
    "☜(▿c)", //x
    "(͠≖ ͜ʖ͠≖)", //y
    " つ︣﹏╰）", //z
    "ಥ_ಥ", //0
    "(╥﹏╥)", //1
    "(≖_≖ )", //2
    "(҂◡̀_◡́)ᕤ", //3
    "凸(¬‿¬)凸", //4
    "(◣◢)┌∩┐", //5
    "t(>.<t)", //6
    "(▿´) ", //7
    "┻━┻ ︵ヽ(▭´)ﾉ ┻━┻", //8
    "(ᕗ ಠ︡益︠ಠ︠)ᕗ ┬━━━━┬", //9
    "(⊙.⊙(◉̃_᷅◉)⊙.⊙)", 
];

//Segun la opción de encriptar se ejecutara la siguiente accion
function encriptar(inputText, shift) {
    let textoCifrado = ''; //aqui se almacenara el texto obtenido

    if (isNaN(shift)) { //si no es número entonces
        alert('Por favor, introduce un desplazamiento válido.');
        return;
    }

    for (let i = 0; i < inputText.length; i++) {
        let char = inputText[i]; //la posicion de i, se almacena en char como variables
        let charLower = char.toLowerCase(); //conversion a minusculas y se asegura que solo obtenga eso
        const index = letras.indexOf(charLower); //busca la posicion en el array letras,en este caso a tiene cero

        if (index !== -1) { //verifica si se puede cifrar o no
            const newIndex = (index + shift) % letras.length; //desplazamiento, para asegurar el % no exceda el tamaño
            const letraCifrada = letras[newIndex]; // calcula la nueva posicion
            const caritaIndex = letras.indexOf(letraCifrada) % caritas.length; //limite
            textoCifrado += caritas[caritaIndex];
        } else {
            textoCifrado += char;
        }
    }

    //lo mandara como texto cifrado al TEX1
    return textoCifrado;
}

//El texto cifrado se almacena en el textoDesencriptado, para luego proceder a revelar el text1

function desencriptar(inputText, shift) {
    let textoDesencriptado = '';

    if (isNaN(shift)) {
        alert('Por favor, introduce un desplazamiento válido.');
        return;
    }

    let i = 0;
    while (i < inputText.length) {
        let found = false;

        for (let j = 0; j < caritas.length; j++) {
            if (inputText.substring(i, i + caritas[j].length) === caritas[j]) {
                const letraDesencriptada = letras[j];
                const originalIndex = (letras.indexOf(letraDesencriptada) - shift + letras.length) % letras.length;
                textoDesencriptado += letras[originalIndex];
                i += caritas[j].length;
                found = true;
                break;
            }
        }

        if (!found) {
            textoDesencriptado += inputText[i];
            i++;
        }
    }

    return textoDesencriptado;
}

//Aqui son las acciones al presionar los botones.

document.getElementById('btnEncriptar').addEventListener('click', () => {
    const inputText = document.getElementById('tex1').value;
    const shift = parseInt(document.getElementById('desplazamiento').value);
    const textoCifrado = encriptar(inputText, shift);
    document.getElementById('textnuevo').value = textoCifrado;
});

document.getElementById('btnDesencriptar').addEventListener('click', () => {
    const inputText = document.getElementById('textnuevo').value;
    const shift = parseInt(document.getElementById('desplazamiento').value);
    const textoDesencriptado = desencriptar(inputText, shift);
    document.getElementById('textnuevo').value = textoDesencriptado;
});

document.getElementById('btnCopiar').addEventListener('click', () => {
    const texto = document.getElementById('textnuevo').value;
    navigator.clipboard.writeText(texto).then(() => {
        alert('Texto copiado al portapapeles.');
    }).catch(err => {
        alert('Error al copiar el texto: ' + err);
    });
});
