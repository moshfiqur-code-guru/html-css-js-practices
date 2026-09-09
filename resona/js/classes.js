//     function start(name, callback) {
//         console.log("hello" + " " + name);

//         callback();  //==> this is closer
//     }

//     function end() {
//         console.log("goodbye!")
//     }

//     start("Sadik", end);
// }

// {
//     function test1(a, cb) {

//         let result = a;

//         cb(result); //==> this is closer

//     }

//     test1(20, function (result) {
//         console.log(result);
//     });
// }

// {
//     function outer() {
//         let count = 0;

//         function inner() {
//             console.log(count);
//         }
//         inner(); ///===>> this is closer
//     }

//     outer();

//     function outer1() {
//         let count1 = 22;

//         function inner1() {
//             console.log(count1);
//         }
//         return inner1; ///===>> this is closer
//     }

//     outer1()();
// }

// {
//     function hello() {
//         return () => {
//             console.log("moshfiqur")
//         }
//     }
//     // const msg = hello();
//     // msg();  or,
//     hello()();
// }




// function counter() {
//     let count = 0;

//     function increment(inc) {
//         count += inc;
//         // countHTML.innerText = count.toString();
//     }
//     function decrement(dec) {
//         count -= dec;
//         // countHTML.innerText = count.toString();
//     }
//     function getCount() {
//         countHTML.innerText = count.toString();
//         return count;
//     }
//     return {
//         increment,
//         decrement,
//         getCount
//     }
// }


const countHTML = document.getElementById("count")

const method = counter();

const btns = document.querySelectorAll(".center button")

btns.forEach((btn, index) => {
    let fn = index === 0 ?
        () => {
            method.increment(20);
            displayResult();
        }
        : () => {
            method.decrement(30);
            displayResult();
        }
    btn.addEventListener("click", fn)
})

function displayResult() {
    const count = method.getCount();
    countHTML.innerText = count.toString();

}



// columnArray = [
//     { label: "SL", header: "", shortStatus: false },
//     { label: "Name", header: "name", shortStatus: true },
//     { label: "Phone", header: "phone", shortStatus: true },
//     { label: "Email", header: "email", shortStatus: true },
//     { label: "Action", header: "", shortStatus: false }
// ];

// const displayTable = displayTable()

// function tableContent(columnArray) {
//     columnArray.forEach(items => {
//         label = items.label
//         console.log(label);
//         displayTable(label);
//     })


// }

// tableContent(columnArray);

// // displayColumn()







































//=> math function

// console.log(Math)

// console.log(Math.PI)

// console.log(Math.sin(90))

// console.log(Math.round(23.829))
// console.log(Math.round(23.29))

// console.log(Math.floor(34.67546))
// console.log(Math.floor(309.234543))
// console.log(Math.floor(-34.67546))

// console.log(Math.trunc(-34.67546))


// console.log(Math.ceil(4.1111))
// console.log(Math.ceil(4.0999))

// console.log(Math.abs(-123))
// console.log(Math.abs(123))

// console.log(Math.pow(8, 2))
// console.log(Math.pow(8, 3))
// console.log(Math.sqrt(64))
// console.log(Math.cbrt(512))

// console.log(Math.random())
// console.log(Math.random() * 10)
// console.log(Math.floor(Math.random() * 10))

// console.log(Math.max(12, 34, 45, 65, 87, 13, 23))
// console.log(Math.min(12, 34, 45, 65, 87, 13, 23))

// const a = Math.floor(Math.random() * 5 + 1)

// console.log(a);