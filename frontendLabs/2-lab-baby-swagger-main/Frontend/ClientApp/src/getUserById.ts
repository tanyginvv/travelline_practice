const getUsersById = async () => {
    const idInput = document.getElementById('get-by-id') as HTMLInputElement | null;
    const id = idInput?.value;

    const response = await fetch(`http://localhost:5154/Users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const responseData = await response.json(); 
    
    const responseUrlResult = document.getElementById("response-url-result-get"); 
    const responseCodeResult = document.getElementById("response-code-result-get");
    const responseBodyResult = document.getElementById("response-body-result-get");
    const responseHeadersResult = document.getElementById("response-headers-result-get");

    if (responseUrlResult) {
        responseUrlResult.innerHTML = `${response.url}`;
    };

    if (responseCodeResult) {
        responseCodeResult.innerHTML = `${response.status} ${response.statusText}` ;
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

export const checkGetUsersById = (node: Element) => {
    const getUsersByIdButton = node.querySelector(".route-get-users .get-users-by-id");
    const menuGetUsersById = node.querySelector(".route-get-users .route-header-menu");
    const arrow = node.querySelector(".route-get-users .get-users-by-id .arrow"); 

    if (getUsersByIdButton && menuGetUsersById) {
        getUsersByIdButton.addEventListener("click", () => {
            menuGetUsersById.classList.toggle("executeUsersById");
            arrow?.classList.toggle("rotate");
        });
    };

    const executeButton = node.querySelector(".route-get-users .menu-button-execute");
    const clearButton = node.querySelector(".route-get-users .menu-button-clear");
    const responseBody = node.querySelector(".route-get-users .route-header-response");
    const responseBodyMenu = node.querySelector(".route-get-users .route-header-menu-response");

    if (executeButton && menuGetUsersById) {
        executeButton.addEventListener("click", () => {
            if (executeButton.classList.contains("clickedExecute")) {
                getUsersById();
                return;
            };
            executeButton.classList.toggle("clickedExecute");
            clearButton?.classList.toggle("unclickedClear");
            responseBody?.classList.toggle("executeUsersById");
            responseBodyMenu?.classList.toggle("executeUsersById");
            getUsersById();
        });
    };
    
    if (clearButton) {
        clearButton.addEventListener("click", () => {
            executeButton?.classList.remove("clickedExecute");
            clearButton.classList.remove("unclickedClear");
            responseBody?.classList.remove("executeUsersById");
            responseBodyMenu?.classList.remove("executeUsersById");
            menuGetUsersById?.classList.remove("executeUsersById");
            arrow?.classList.remove("rotate");
        });
    };  
};