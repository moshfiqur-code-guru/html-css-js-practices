

// function addition() {
//     const firstNumber = document.getElementById("firstNumber").value;
//     const secondNumber = document.getElementById("secondNumber").value;
//     let result = Number(firstNumber) + Number(secondNumber);
//     document.getElementById("result").innerHTML += " " + result;
// }

function addButton() {
    const arrayOfOperators = ["+", "-", "x", "/", "%", "AC"];
    for (let i = 0; i < arrayOfOperators.length; i++) {
        document.getElementById("button").innerHTML += `<button onclick="doCalculation('${arrayOfOperators[i]}')">${arrayOfOperators[i]}</button>`
    }
}
addButton();

// function doCalculation(operators) {
//     let result = "";
//     const fnum = document.getElementById("number1");
//     const snum = document.getElementById("number2");

//     let fNumberInt = Number(fnum.value);
//     let sNumberInt = Number(snum.value);

//     if (operators === "+") {
//         result = fNumberInt + sNumberInt;
//     } else if (operators === "-") {
//         result = fNumberInt - sNumberInt;
//     } else if (operators === "x") {
//         result = fNumberInt * sNumberInt;
//     } else if (operators === "/") {
//         result = fNumberInt / sNumberInt;
//     } else if (operators === "%") {
//         result = fNumberInt % sNumberInt;
//     } else {
//         fnum.value = "";
//         snum.value = "";
//     }
//     document.getElementById("res").value = result;
//     console.log(result);

// }

// doCalculation();



function doCalculation(operators) {
    let result = "";
    const fnum = document.getElementById("number1");
    const snum = document.getElementById("number2");

    let fNumberInt = Number(fnum.value);
    let sNumberInt = Number(snum.value);

    switch (operators) {
        case "+":
            result = fNumberInt + sNumberInt;
            break;

        case "-":
            result = fNumberInt - sNumberInt;
            break;

        case "x":
            result = fNumberInt * sNumberInt;
            break;

        case "/":
            result = fNumberInt / sNumberInt;
            break;

        case "%":
            result = fNumberInt % sNumberInt;
            break;

        case "AC":
            fnum.value = "";
            snum.value = "";
            break;
    }
    document.getElementById("res").value = result;
    console.log(result);
}
doCalculation();





// solution

// switch (operators) {
//     case "+":
//         result = fNumberInt + sNumberInt;
//         break;

//     case "-":
//         result = fNumberInt - sNumberInt;
//         break;

//     case "x":
//         result = fNumberInt * sNumberInt;
//         break;

//     case "/":
//         result = fNumberInt / sNumberInt;
//         break;

//     case "%":
//         result = fNumberInt % sNumberInt;
//         break;

//     case "AC":
//         fnum.value = "";
//         snum.value = "";
//         document.getElementById("res").value = "";
//         return;

//     default:
//         console.log("Invalid operator");
//         return;
// }

// document.getElementById("res").value = result;