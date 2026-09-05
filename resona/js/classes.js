// {
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


const countHTML = document.getElementById("count")

function counter() {
    let count = 0;

    function increment(inc) {
        count += inc;
        // countHTML.innerText = count.toString();
    }
    function decrement(dec) {
        count -= dec;
        // countHTML.innerText = count.toString();
    }
    function getCount() {
        countHTML.innerText = count.toString();
        return count;
    }
    return {
        increment,
        decrement,
        getCount
    }
}

const method = counter();
console.log(method.getCount());

const btns = document.querySelectorAll(".center button")

btns.forEach((btn, index) => {
    let fn = index === 0 ?
        () => { method.increment(20); method.getCount() } : () => { method.decrement(30); method.getCount() }
    btn.addEventListener("click", fn)
})