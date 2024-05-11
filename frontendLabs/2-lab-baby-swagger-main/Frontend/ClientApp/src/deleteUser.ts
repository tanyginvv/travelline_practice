const deleteUser = async () => {
    const idInput = document.getElementById('delete-id') as HTMLInputElement | null;
    const id = idInput?.value;

    const response = await fetch(`http://localhost:5154/Users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const responseData = await response.json();

    const responseUrlResult = document.querySelector(".delete-request #response-url-result"); 
    const responseCodeResult = document.querySelector(".delete-request #response-code-result");
    const responseBodyResult = document.querySelector(".delete-request #response-body-result");
    const responseHeadersResult = document.querySelector(".delete-request #response-headers-result");

    if (responseUrlResult) {
        responseUrlResult.innerHTML = `${response.url}`;
    };

    if (responseCodeResult) {
        responseCodeResult.innerHTML = `${response.status} ${response.statusText}`;
    };

    if (responseBodyResult) {
        const formattedData = JSON.stringify(responseData, null, 2);
        responseBodyResult.innerHTML = `<div style="white-space: pre;">${formattedData}</div>`; 
    };

    if (responseHeadersResult) {
        const headersHTML = Array.from(response.headers.entries())
        .map(([name, value]) => `${name} : ${value}\n`)
        .join('');
        responseHeadersResult.innerHTML = `<div style="white-space: pre;">${headersHTML}</div>`;
    };
};

export const checkDeleteUser = (node: Element) => {
    const deleteUserButton = node.querySelector(".route-delete .route-summary"); 
    const menuDeleteUser = node.querySelector(".route-delete .route-header .route-header-menu");
    const arrowDelete = node.querySelector(".route-delete .route-summary-arrow .arrow");

    if (deleteUserButton && menuDeleteUser) {
        deleteUserButton.addEventListener("click", () => {
            menuDeleteUser.classList.toggle("delete-request"); 
            arrowDelete?.classList.toggle("rotate");
        });
    };

    const executeButton = node.querySelector(".route-delete .menu-button-execute");
    const clearButton = node.querySelector(".route-delete .menu-button-clear");
    const requestBody = node.querySelector(".route-delete .route-header-menu-response");

    if (executeButton && clearButton){
        executeButton.addEventListener("click", () => {
            if (executeButton.classList.contains("clickedExecute")) {
                deleteUser();
                return;
            };
            clearButton?.classList.toggle("unclickedClear");
            requestBody?.classList.toggle("routeHeaderMenuResponse");
            executeButton.classList.toggle("clickedExecute");
            deleteUser();
        });
    };
    
    if (clearButton) {
        clearButton.addEventListener("click", () => {
            clearButton?.classList.remove("unclickedClear");
            requestBody?.classList.remove("routeHeaderMenuResponse");
            executeButton?.classList.remove("clickedExecute");
            menuDeleteUser?.classList.remove("delete-request");
            arrowDelete?.classList.remove("rotate");
        });
    };
};