function debounce(cb) {

    let timeout;
    let searchKeyword = "";
    return (value) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            searchKeyword = value;
            cb(searchKeyword);
        }, 1000)
    }
}