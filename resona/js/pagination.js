
// const paginationContainer = document.getElementById("pagination")
// const conf = {
//     currentPage,
//     itemsPerPage,
//     maxVisiblePages,
//     container: paginationContainer
// }



function getPagination(config) {

    let { currentPage = 1, itemsPerPage = 10, container, maxVisiblePages = 5, data, callToAction, nextBTN, prevBTN } = config;

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
        return Math.min(getStartIndex() + itemsPerPage, data.length);
    }
    function goToPage(page) {
        const totalPage = getTotalPages();

        if (totalPage === 0) {
            currentPage = 1
        }
        if (page < 1) {
            page = 1
        };
        if (page > totalPage) {
            page = totalPage
        };
        if (page === currentPage) {
            return
        }

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

    function paginate(data) {
        const start = getStartIndex();
        const end = getEndIndex();
        return data.slice(start, end)
    }


    // pagination ui
    function createButton(text, className, cb) {
        const button = document.createElement("button");
        button.type = button;
        button.textContent = text;
        button.className = className;
        button.addEventListener("click", cb);
        return button;
    }

    function getPageNumbers() {
        const pages = [];
        const totalPages = getTotalPages();

        if (totalPages === 0) {
            return pages;
        }

        if (totalPages <= maxVisiblePages) {
            for (let page = 1; page <= totalPages; page++) {
                pages.push(page)
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

    function render() {
        container.innerHTML = "";

        const totalPage = getTotalPages();

        if (totalPage <= 1) {
            return;
        }
        const privButton = prevBTN ? prevBTN : createButton("priv", "page-button", previousPage);
        const nextButton = nextBTN ? nextBTN : createButton("next", "page-button", nextPage);

        if (privButton && nextButton) {
            privButton.addEventListener("click", previousPage);
            nextButton.addEventListener("click", nextPage);
        }

        privButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPage;

        const pageContainer = document.createElement("div");
        pageContainer.className = "page-numbers";
        const pages = getPageNumbers();
        pages.forEach(page => {
            const pageButton = createButton(page, page === "..." ? "pageDotBTN" : "pageBTN", () => goToPage(page));
            if (page === currentPage) {
                pageButton.classList.add("active")

                requestAnimationFrame(() => {
                    pageButton.classList.add("animate");
                });
            }
            pageContainer.appendChild(pageButton)
        })


        container.append(privButton, pageContainer, nextButton);
    }

    return { getTotalPages, getCurrentPage, getStartIndex, getEndIndex, nextPage, previousPage, render, paginate }
}