let nota = 89
let notaA = nota >= 90 && nota <= 100
let notaB = nota >= 80 && nota <= 89
let notaC = nota >= 70 && nota <= 79
let notaD = nota >= 60 && nota <= 69
let notaF = nota < 60 && nota >= 0

let notafinal;

if (notaA) {
    notafinal = "A";
} else if (notaB) {
    notafinal = "B";
} else if (notaC) {
    notafinal = "C";
} else if (notaD) {
    notafinal = "D";
} else if (notaF) {
    notafinal = "F";
} else {
    notafinal = "nota invalida"
}

console.log(notafinal)