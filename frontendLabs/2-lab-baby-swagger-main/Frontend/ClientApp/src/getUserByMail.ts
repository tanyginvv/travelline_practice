const getUsersByMail = async () => {
    const idInput = document.getElementById('get-by-mail') as HTMLInputElement | null;
    const email = idInput?.value;

    const response = await fetch(`http://localhost:5154/Users/get-by-email/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const responseData = await response.json(); 
    
    const responseUrlResult = document.getElementById("response-url-result-get-by-mail"); 
    const responseCodeResult = document.getElementById("response-code-result-get-by-mail");
    const responseBodyResult = document.getElementById("response-body-result-get-by-mail");
    const responseHeadersResult = document.getElementById("response-headers-result-get-by-mail");

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

export const checkGetUsersByMail = (node: Element) => {
    const getUsersByMailButton = node.querySelector(".route-get-users-by-mail .get-users-by-mail");
    const menuGetUsersByMail = node.querySelector(".route-get-users-by-mail .route-header-menu");
    const arrow = node.querySelector(".route-get-users-by-mail .get-users-by-id .arrow"); 

    if (getUsersByMailButton && menuGetUsersByMail) {
        getUsersByMailButton.addEventListener("click", () => {
            menuGetUsersByMail.classList.toggle("executeUsersByMail");
            arrow?.classList.toggle("rotate");
        });
    };

    const executeButton = node.querySelector(".route-get-users-by-mail .menu-button-execute");
    const clearButton = node.querySelector(".route-get-users-by-mail .menu-button-clear");
    const responseBody = node.querySelector(".route-get-users-by-mail .route-header-response");
    const responseBodyMenu = node.querySelector(".route-get-users-by-mail .route-header-menu-response");

    if (executeButton && clearButton){
        executeButton.addEventListener("click", () => {
            if (executeButton.classList.contains("clickedExecute")) {
                getUsersByMail();
                return;
            };
            executeButton.classList.toggle("clickedExecute");
            clearButton?.classList.toggle("unclickedClear");
            responseBody?.classList.toggle("executeUsersByMail");
            responseBodyMenu?.classList.toggle("responseBodyClicked");
            getUsersByMail();
        });
    };
    
    if (clearButton) {
        clearButton.addEventListener("click", () => {
            executeButton?.classList.remove("clickedExecute");
            clearButton.classList.remove("unclickedClear");
            responseBody?.classList.remove("executeUsersByMail");
            responseBodyMenu?.classList.remove("responseBodyClicked");
            menuGetUsersByMail?.classList.remove("executeUsersByMail");
            arrow?.classList.remove("rotate");
        });
    };
};