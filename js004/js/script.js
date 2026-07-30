
// {
//     // Create an empty array
//     let numbers = [];

//     // Store numbers from 1 to 50
//     for (let i = 1; i <= 50; i++) {
//         numbers.push(i);
//     }

//     let prime = [];

//     for (let i = 2; i < numbers.length; i++) {
//         if (numbers[i] % j !== 0) {
//             console.log(prime[numbers]);
//         }
//     }
// }



{
    // -------------------Even Odd number--------------------//
    let value = [];
    for (let i = 1; i <= 20; i++) {
        value.push(i);
    }

    console.log("even Numbers:");


    // Print even numbers
    for (let i = 0; i < value.length; i++) {
        if (value[i] % 2 === 0) {
            console.log(value[i]);
        }
    }

    console.log("Odd Numbers:");

    // Print odd numbers
    for (let i = 0; i < value.length; i++) {
        if (value[i] % 2 !== 0) {
            console.log(value[i]);
        }
    }
}