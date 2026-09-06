

function counter() {
    let count = 0;

    function increment(inc) {
        count += inc;
    }
    function decrement(dec) {
        count -= dec;
    }
    function getCount() {
        return count;
    }
    return {
        increment,
        decrement,
        getCount
    }
}