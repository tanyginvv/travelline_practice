const putUser = async () => {
    const idInput = document.getElementById('put-id') as HTMLInputElement | null;
    const id = idInput?.value;

    const requestBodyTextarea = document.querySelector('.request-body-put') as HTMLTextAreaElement | null;
    const requestBody = requestBodyTextarea?.value;

    const response = await fetch(`http://localhost:5154/Users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBody
    });

    const responseData = await response.json();

    const responseUrlResult = document.querySelector(".put-request #response-url-result"); 
    const responseCodeResult = document.querySelector(".put-request #response-code-result");
    const responseBodyResult = document.querySelector(".put-request #response-body-result");
    const responseHeadersResult = document.querySelector(".put-request #response-headers-result");

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

export const checkPutUser = (node: Element) => {
    const putUserButton = node.querySelector(".route-put .route-summary.put-user");
    const menuPutUser = node.querySelector(".menu-put");
    const arrowPut = node.querySelector(".route-put .arrow");
    
    if (putUserButton && menuPutUser) {
        putUserButton.addEventListener("click", () => {
            menuPutUser.classList.toggle("put-active"); 
            arrowPut?.classList.toggle("rotate");
        });
    };

    const requestBodyPut = node.querySelector(".request-body-put");

    if (requestBodyPut) {
        requestBodyPut.innerHTML = '{\n  "firstname": "string",\n  "lastname":"string",\n  "role": 1\n}';
    };

    const putButton = node.querySelector(".route-put .menu-button-execute");
    const clearButtonPut = node.querySelector(".route-put .menu-button-clear");
    const requestBody = node.querySelector(".route-put .put-request");
    
    if (putButton && clearButtonPut){
        putButton.addEventListener("click", () => {
            if (putButton.classList.contains("clickedExecute")) {
                putUser();
                return;
            };
            clearButtonPut?.classList.toggle("unclickedClear");
            requestBody?.classList.toggle("routeHeaderMenuResponse");
            putButton.classList.toggle("clickedExecute");
            putUser();
        });
    };
  
    if (clearButtonPut) {
        clearButtonPut.addEventListener("click", () => {
            clearButtonPut?.classList.remove("unclickedClear");
            requestBody?.classList.remove("routeHeaderMenuResponse");
            putButton?.classList.remove("clickedExecute");
            menuPutUser?.classList.remove("put-active"); 
            arrowPut?.classList.remove("rotate");
        });
    };
};