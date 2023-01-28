let family = {
    incomes: [2500,3000,2340,2394],
    exites: [2394,3209,239,23,493]
}

function sum (array) {
    let total = 0;
    for(let value of array) {
        total += value
    }
    return total
}

function calculateBalance() {
    const calculateIncomes = sum(family.incomes)
    const calculateexites = sum(family.exites)

    const total = calculateIncomes - calculateexites

    const itsOk = total >= 0

    let balanceText = " negativo"

    if(itsOk) { 
        balanceText = "Positivo"
    }
    console.log(`Seu saldo é ${balanceText}`)
}

calculateBalance()