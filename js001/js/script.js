
//--------------------------------------- Arithmetic Operators --------------------------------------//
//   +[addition], -[subtraction], *[multiplication], /[division], %[remainder], **[exponentiation] 

let a = 10;
let b = 20;
let c = 30;
let d = 40;
let e = 50;

console.log(a + b + c + d + e);
console.log(e - a - b - c);
console.log(a * b * d);
console.log(e / b);
console.log(e % c);
console.log(a ** 3);
console.log(Math.PI);
console.log(Math.pow(a, 3)); //[(Math.pow()) works same as **]


//---------------------------------- Assignment Operators ------------------------------------//
//                                =, +=, -=, *=, /=, %=, **= 

console.log(a);
a += 10;
console.log(a);
b -= 10;
console.log(b);
c *= 5;
console.log(c);
c /= 10;
console.log(c);
c %= 40;
console.log(c);
b **= 2;
console.log(b);


//-------------------------------------- Comparison Operator -----------------------------------//
//                                  ==, ===, !=, !==, <,>, <=, >=

console.log(a, b, c, d, e);

let x = "50";

console.log(a == d);
console.log(a + a == d);
console.log(b == e);
console.log(b == e * 2);

console.log(e == x); //[only compare value not type]
console.log(e === x); //[compare both value and type]

console.log(a != b);
console.log(e * 2 != b);
console.log(e != x);
console.log(e !== x);

console.log(a > c);
console.log(b <= e * 2);
console.log(b < c);

let trm = "      sadik     ";
console.log(trm);
console.log(trm.trim());

let age = 40;
if (age >= 10) {
    console.log("eligible")
}

//------------------------------------------ Logical Operator ------------------------------------//
//                                       &&[and], ||[or], ![not]

age = 20;
let Nid = false;
let minQualification = false;
if (age >= 18 && Nid) {
    console.log("he is eligible")
} else {
    console.log("he is not eligible")
}

if (age >= 18 || Nid) {
    console.log("he is eligible")
} else {
    console.log("he is not eligible")
}

if ((age >= 18 && minQualification) || Nid) {
    console.log("he is eligible")
} else {
    console.log("he is not eligible")
}

console.log(!Nid);
if ((age >= 18 && !minQualification) || Nid) {
    console.log("he is eligible")
} else {
    console.log("he is not eligible")
}

//---------------------------------------- Increment Decrement ----------------------------------//
//                                              ++, --
console.log(a, b, c, d, e);
a++;
console.log(a);

//post increment:
console.log(a++);
console.log(a);
//pri increment:
console.log(++a);
console.log(a);

a--;
console.log(a);
console.log(a--);  // post decrement
console.log(a);
console.log(--a);  // pri decrement

let i;

for (i = 1; i <= 20; i++) {
    console.log(i)
}

for (i = 20; i >= 1; i--) {
    console.log(i)
}

//--------------------------------- Concatenation Operator ---------------------------------//
//                             +[basically addition for string]

let firstName = "Moshfiqur";
let lastName = "Rahman";
let fullName = firstName + " " + lastName;

console.log("My name is" + " " + fullName);
console.log("My name is" + " " + firstName + " " + lastName);

//----------------------------- Ternary operator/ conditional operator ---------------------------//
//                                   ? [use instead of if else]
a = 20;
b = 30;
let result = "";

if (a > b) {
    result = "right"
} else {
    result = "wrong"
}
console.log(result)

result = a > b ? "right" : "wrong";
console.log(result);

//------------------------------------- Nullish coalescing ----------------------------------------//

let userName = null;
let userType = "";
console.log(userName);

if (userName === undefined || userName == null) {
    userType = "guest"
}
console.log(userType);

let typeOfUser = userName ?? "guest"
console.log(typeOfUser);