
// //--------------------------------------- Arithmetic Operators --------------------------------------//
// //   +[addition], -[subtraction], *[multiplication], /[division], %[remainder], **[exponentiation]

// let a = 10;
// let b = 20;
// let c = 30;
// let d = 40;
// let e = 50;

// console.log(a + b + c + d + e);
// console.log(e - a - b - c);
// console.log(a * b * d);
// console.log(e / b);
// console.log(e % c);
// console.log(a ** 3);
// console.log(Math.PI);
// console.log(Math.pow(a, 3)); //[(Math.pow()) works same as **]


// //---------------------------------- Assignment Operators ------------------------------------//
// //                                =, +=, -=, *=, /=, %=, **=

// console.log(a);
// a += 10;
// console.log(a);
// b -= 10;
// console.log(b);
// c *= 5;
// console.log(c);
// c /= 10;
// console.log(c);
// c %= 40;
// console.log(c);
// b **= 2;
// console.log(b);

// let t;
// for (t = 5; t <= 50; t += 5) { //table of 5
//     console.log(t)
// }
// t = 12;
// for (t = 12; t <= 120; t += 12) { //table of 12
//     console.log(t)
// }
// t = 15;
// for (t = 15; t <= 150; t += 15) { //table of 15
//     console.log(t)
// }


// //-------------------------------------- Comparison Operator -----------------------------------//
// //                                  ==, ===, !=, !==, <,>, <=, >=

// console.log(a, b, c, d, e);

// let x = "50";

// console.log(a == d);
// console.log(a + a == d);
// console.log(b == e);
// console.log(b == e * 2);

// console.log(e == x); //[only compare value not type]
// console.log(e === x); //[compare both value and type]

// console.log(a != b);
// console.log(e * 2 != b);
// console.log(e != x);
// console.log(e !== x);

// console.log(a > c);
// console.log(b <= e * 2);
// console.log(b < c);

// let trm = "      sadik     ";
// console.log(trm);
// console.log(trm.trim());

// let age = 40;
// if (age >= 10) {
//     console.log("eligible")
// }

// //------------------------------------------ Logical Operator ------------------------------------//
// //                                       &&[and], ||[or], ![not]

// age = 20;
// let Nid = false;
// let minQualification = false;
// if (age >= 18 && Nid) {
//     console.log("he is eligible")
// } else {
//     console.log("he is not eligible")
// }

// if (age >= 18 || Nid) {
//     console.log("he is eligible")
// } else {
//     console.log("he is not eligible")
// }

// if ((age >= 18 && minQualification) || Nid) {
//     console.log("he is eligible")
// } else {
//     console.log("he is not eligible")
// }

// console.log(!Nid);
// if ((age >= 18 && !minQualification) || Nid) {
//     console.log("he is eligible")
// } else {
//     console.log("he is not eligible")
// }

// //---------------------------------------- Increment Decrement ----------------------------------//
// //                                              ++, --
// console.log(a, b, c, d, e);
// a++;
// console.log(a);

// //post increment:
// console.log(a++);
// console.log(a);
// //pri increment:
// console.log(++a);
// console.log(a);

// a--;
// console.log(a);
// console.log(a--);  // post decrement
// console.log(a);
// console.log(--a);  // pri decrement

// let i;

// for (i = 1; i <= 20; i++) {
//     console.log(i)
// }

// for (i = 20; i >= 1; i--) {
//     console.log(i)
// }

// //--------------------------------- Concatenation Operator ---------------------------------//
// //                             +[basically addition for string]

// let firstName = "Moshfiqur";
// let lastName = "Rahman";
// let fullName = firstName + " " + lastName;

// console.log("My name is" + " " + fullName);
// console.log("My name is" + " " + firstName + " " + lastName);

// //----------------------------- Ternary operator/ conditional operator ---------------------------//
// //                                   ? [use instead of if else]
// a = 20;
// b = 30;
// let result = "";

// if (a > b) {
//     result = "right"
// } else {
//     result = "wrong"
// }
// console.log(result)

// result = a > b ? "right" : "wrong";
// console.log(result);

// //------------------------------------- Nullish coalescing ---------------------------------------//
// let userName = null;
// let userType = "";
// console.log(userName);

// if (userName === undefined || userName == null) {
//     userType = "guest"
// }
// console.log(userType);

// let typeOfUser = userName ?? "guest"
// console.log(typeOfUser);

// let expectedAmount;  //for undefine
// let PreviousAmount = 100;
// let resultAmount = PreviousAmount * (expectedAmount ?? 1);
// console.log(resultAmount);

// expectedAmount = null;  //for null
// PreviousAmount = 100;
// resultAmount = PreviousAmount * (expectedAmount ?? 1);
// console.log(resultAmount);

// expectedAmount = 10;  //for normal value
// PreviousAmount = 100;
// resultAmount = PreviousAmount * (expectedAmount ?? 1);
// console.log(resultAmount);

// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ OBJECT ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// //

// let family1 = {}

// family1.fatherName = "badsha";
// family1.motherName = "moriom";
// family1.child = 1;
// family1.registration = true;


// console.log(family1);
// console.log(family1.fatherName)

// let family2 = {}
// Object.assign(family2, { fatherName: "tarik ziya", motherName: "khaleda ziya", child: 3 });

// console.log(family2);
// console.log(family2.motherName);

// let family3 = {
//     fatherName: "bongobondhu",
//     motherName: "hasina",
//     child: 5,
//     registration: false
// }
// console.log(family3);
// console.log(family3.child);
// family3.numberOfRoom = 7;
// console.log(family3);
// console.log(family3.numberOfRoom);

// //---------------------------------- IN & Delete Operator -------------------------------------------//

// if ("registration" in family1 && family1.registration) {
//     console.log(family1.fatherName)
// }

// if ("registration" in family3 && family3.registration) {
//     console.log(family3.fatherName)
// }

// delete family3.registration;
// console.log(family3);

// //-------------------------------------- Optional Chaining ------------------------------------------//

// let expenditure = {
//     electricBill: 1000,
//     tutionBill: 1500,
// }

// let totalExpanses = expenditure.electricBill + expenditure.tutionBill + (expenditure?.TA ? expenditure : 0);
// console.log(totalExpanses);

// //------------------------------------------- Void function ------------------------------------------//

// console.log(void 0);
// console.log(void (393 + 37378));

// //--------------------------------------------- Date ---------------------------------------------//

// let date = new Date();
// console.log(date);
// console.log(date.getDate());

// //------------------------------------------- Array --------------------------------------//

// let array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log(array1);
// console.log(array1[4]);
// console.log(array1[7]);
// console.log(array1[0]);
// console.log(array1[9]);

// array1[10] = 135;
// console.log(array1)
// array1.push(20);
// console.log(array1);
// array1.pop(20);
// console.log(array1);
// array1.unshift(20);
// console.log(array1);
// array1.shift(20);
// console.log(array1);

// let array2 = new Array([1, 2, 3, 4, 5]);
// console.log(array2);

// let arrayOfFamily = [family1, family2, family3];
// console.log(arrayOfFamily[0].fatherName);
// console.log(arrayOfFamily[0].motherName);
// console.log(arrayOfFamily[0].registration);
// console.log(arrayOfFamily[1].fatherName);
// console.log(arrayOfFamily[1].motherName);
// console.log(arrayOfFamily[2].fatherName);
// console.log(arrayOfFamily[2].motherName);

//###############################################################################################//

// let fruits = ["mango", "banana", "apple", "orange", 234]; // x different types of value should not be in one variable.
// console.log(fruits);

// // console.log(window);  // quokka can not show browses related items.


// let fruitsJOSON = JSON.stringify(fruits); //JSON.stringify - converts different items into string

// console.log(fruitsJOSON);
// console.log(typeof fruitsJOSON);
// console.log(fruitsJOSON[0]);
// console.log(fruitsJOSON[6]);
// console.log(fruitsJOSON[5]);
// console.log(fruitsJOSON[3]);

// localStorage.setItem("fruits", fruitsJOSON);


// let fruitsJOSONfromStorage = localStorage.getItem("fruits");
// let fruitsArrayfromJOSON = JSON.parse(fruitsJOSONfromStorage); //JSON.parse - converts string into original items
// console.log(fruitsArrayfromJOSON);

// console.log(document);
// console.log(typeof document);
// document.write("<div><h3 style='font-size : 50px'>hello</h3></div>")

// let h1 = document.createElement("h1");
// h1.textContent = "hello world"
// h1.id = "head"
// document.body.appendChild(h1);


// let age = 20;
// let minRequired = 18;
// let hasID = true;
// let result = document.getElementById("result");
// console.log(result);

// let cls = "";


// if (age >= minRequired && hasID) {
//     result.textContent = "you are allowed to vote"
//     cls = "green"
// } else if (age >= minRequired && hasID === false) {
//     result.textContent = "you are allowed to vote, please apply for the NID card"
//     cls = "blue"
// } else {
//     result.textContent = "you have to wait for the next: " + (minRequired - age) + " " + "yraes"
//     cls = "red"
// }

// result.classList.add(cls);



// ########################################################################################################
// ########################################################################################################
// ########################################################################################################


const result = document.getElementById("result");

function checkEvenOdd() {

    const givenNumber = document.getElementById("givenNumber").value;

    if (givenNumber % 2 === 0) {
        result.value = givenNumber + " - " + "is an even Number";
    } else {
        result.value = givenNumber + " - " + "is a odd Number";
    }
}

function checkPrime() {

    const givenNumber = Number(document.getElementById("givenNumber").value);

    if (givenNumber < 2) {
        result.value = givenNumber + " - is not prime number";
        return;
    }

    let isPrime = true;

    for (let i = 2; i < givenNumber; i++) {
        if (givenNumber % i === 0) {
            isPrime = false;
            break;
        }
    }

    if (isPrime) {
        result.value = givenNumber + " - is a prime number";
    } else {
        result.value = givenNumber + " - is not a prime number";
    }

}



const evenOddBtn = document.getElementById("evenOddBtn");
evenOddBtn.addEventListener("click", checkEvenOdd);

const primeBtn = document.getElementById("primeBtn");
primeBtn.addEventListener("click", checkPrime);