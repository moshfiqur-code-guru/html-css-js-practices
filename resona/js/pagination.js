
// const paginationContainer = document.getElementById("pagination")
// const conf = {
//     currentPage,
//     itemsPerPage,
//     maxVisiblePages,
//     container: paginationContainer
// }


function getPagination(config) {

    let {
        currentPage = 1,
        itemsPerPage = 10,
        container,
        maxVisiblePages = 5,
        data,
        callToAction,
        nextBTN,
        prevBTN
    } = config;

    let prev = currentPage;


    // =========================
    // Pagination Information
    // =========================

    function getTotalPages() {
        return Math.ceil(data.length / itemsPerPage);
    }

    function getCurrentPage() {
        return currentPage;
    }

    function getStartIndex() {
        return (currentPage - 1) * itemsPerPage;
    }

    function getEndIndex() {
        return Math.min(
            getStartIndex() + itemsPerPage,
            data.length
        );
    }


    // =========================
    // Page Navigation
    // =========================

    function goToPage(page) {

        const totalPage = getTotalPages();

        if (totalPage === 0) {
            currentPage = 1;
            return;
        }

        if (page < 1) {
            page = 1;
        }

        if (page > totalPage) {
            page = totalPage;
        }

        if (page === currentPage) {
            return;
        }

        // Store previous page before changing current page
        prev = currentPage;

        currentPage = page;

        callToAction();
        render();
    }

    function nextPage() {
        goToPage(currentPage + 1);
    }

    function previousPage() {
        goToPage(currentPage - 1);
    }


    // =========================
    // Data Pagination
    // =========================

    function paginate(data) {

        const start = getStartIndex();
        const end = getEndIndex();

        return data.slice(start, end);
    }


    // =========================
    // Create Button
    // =========================

    function createButton(text, className, cb) {

        const button = document.createElement("button");

        button.type = "button";
        button.textContent = text;
        button.className = className;

        button.addEventListener("click", cb);

        return button;
    }


    // =========================
    // Get Page Numbers
    // =========================

    function getPageNumbers() {

        const pages = [];
        const totalPages = getTotalPages();

        if (totalPages === 0) {
            return pages;
        }

        // Show all pages if they fit
        if (totalPages <= maxVisiblePages) {

            for (let page = 1; page <= totalPages; page++) {
                pages.push(page);
            }

            return pages;
        }


        // First page
        pages.push(1);

        const middleCount = maxVisiblePages - 2;

        let start = currentPage - Math.floor(middleCount / 2);
        let end = start + middleCount - 1;


        // Fix beginning
        if (start < 2) {

            start = 2;
            end = start + middleCount - 1;
        }


        // Fix ending
        if (end > totalPages - 1) {

            end = totalPages - 1;
            start = end - middleCount + 1;
        }


        // Left dots
        if (start > 2) {
            pages.push("...");
        }


        // Middle pages
        for (let page = start; page <= end; page++) {
            pages.push(page);
        }


        // Right dots
        if (end < totalPages - 1) {
            pages.push("...");
        }


        // Last page
        pages.push(totalPages);

        return pages;
    }


    // =========================
    // Render Pagination
    // =========================

    function render() {

        container.innerHTML = "";

        const totalPage = getTotalPages();

        if (totalPage <= 1) {
            return;
        }


        // Previous button
        const privButton = prevBTN
            ? prevBTN
            : createButton("priv", "page-button", previousPage);


        // Next button
        const nextButton = nextBTN
            ? nextBTN
            : createButton("next", "page-button", nextPage);


        // Add click events only for custom buttons
        if (prevBTN) {
            privButton.addEventListener("click", previousPage);
        }

        if (nextBTN) {
            nextButton.addEventListener("click", nextPage);
        }


        // Disable buttons
        privButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPage;


        // Page number container
        const pageContainer = document.createElement("div");

        pageContainer.className = "page-numbers";


        // Get page numbers
        const pages = getPageNumbers();


        // Create page buttons
        pages.forEach(page => {

            // Dots
            if (page === "...") {

                const pageButton = createButton(
                    page,
                    "pageDotBTN",
                    () => { }
                );

                pageButton.disabled = true;

                pageContainer.appendChild(pageButton);

                return;
            }


            // Page button
            const pageButton = createButton(
                page,
                "pageBTN",
                () => goToPage(page)
            );


            // Current page
            if (page === currentPage) {

                const cls =
                    prev < currentPage
                        ? "go-next"
                        : "go-left";

                pageButton.classList.add(cls);


                // Start animation after the button is rendered
                requestAnimationFrame(() => {
                    pageButton.classList.add("active");
                });
            }


            pageContainer.appendChild(pageButton);
        });


        // Add everything to pagination container
        container.append(
            privButton,
            pageContainer,
            nextButton
        );
    }


    // =========================
    // Public Methods
    // =========================

    return {
        getTotalPages,
        getCurrentPage,
        getStartIndex,
        getEndIndex,
        nextPage,
        previousPage,
        render,
        paginate,
        goToPage
    };
}