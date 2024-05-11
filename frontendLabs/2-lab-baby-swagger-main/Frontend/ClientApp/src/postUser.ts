const postUser = async () => {
    const requestBodyTextarea = document.querySelector('.request-body-post') as HTMLTextAreaElement | null;
    const requestBody = requestBodyTextarea?.value;

    const response = await fetch(`http://localhost:5154/Users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBody
    });

    const responseData = await response.json();

    const responseUrlResult = document.querySelector(".post-request #response-url-result"); 
    const responseCodeResult = document.querySelector(".post-request #response-code-result");
    const responseBodyResult = document.querySelector(".post-request #response-body-result");
    const responseHeadersResult = document.querySelector(".post-request #response-headers-result");

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

export const checkPostUser = (node: Element) => {
    const postUserButton = node.querySelector(".route-post .post-user");
    const menuPostUser = node.querySelector(".route-post .menu-post");
    const arrowPost = node.querySelector(".route-post .arrow");
    
    if (postUserButton && menuPostUser) {
        postUserButton.addEventListener("click", () => {
            menuPostUser.classList.toggle("post-active"); 
            arrowPost?.classList.toggle("rotate");
        });
    };

    const requestBodyPost = node.querySelector(".request-body-post");

    if (requestBodyPost) {
        requestBodyPost.innerHTML = '{\n  "firstname": "string",\n  "lastname":"string",\n  "email":"user@example.com",\n  "role": 1\n}';
    };

    const executeButton = node.querySelector(".route-post .menu-button-execute");
    const clearButton = node.querySelector(".route-post .menu-button-clear");
    const responseBody = node.querySelector(".route-post .route-header-menu-response");    

    if (executeButton && clearButton){
        executeButton.addEventListener("click", () => {
            if (executeButton.classList.contains("clickedExecute")) {
                postUser();
                return;
            };
            clearButton?.classList.toggle("unclickedClear");
            responseBody?.classList.toggle("request-post-body");
            executeButton.classList.toggle("clickedExecute");
            postUser();
        });
    };
  
    if (clearButton) {
        clearButton.addEventListener("click", () => {
            clearButton?.classList.remove("unclickedClear");
            responseBody?.classList.remove("request-post-body");
            executeButton?.classList.remove("clickedExecute");
            menuPostUser?.classList.remove("post-active");
            arrowPost?.classList.remove("rotate");
        });
    };
};