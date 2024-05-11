const getAllUsers = async () => {
    const response = await fetch('http://localhost:5154/Users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const responseData = await response.json(); 
    
    const responseUrlResult = document.getElementById("response-url-result"); 
    const responseCodeResult = document.getElementById("response-code-result");
    const responseBodyResult = document.getElementById("response-body-result");
    const responseHeadersResult = document.getElementById("response-headers-result");

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

export const checkGetUsers = (node: Element) => {
    const getUsersButton = node.querySelector(".get-users");
    const menuGetUsers = node.querySelector(".route-header-menu");
    const arrow = node.querySelector(".arrow");
  
    if (getUsersButton && menuGetUsers) {
        getUsersButton.addEventListener("click", () => {
            menuGetUsers.classList.toggle("active"); 
            arrow?.classList.toggle("rotate");
        });
    };

    const executeButton = node.querySelector(".menu-button-execute");
    const clearButton = node.querySelector(".menu-button-clear");
    const responseBody = node.querySelector(".route-header-response");
    const responseBodyMenu = node.querySelector(".route-header-menu-response");

    if (executeButton && menuGetUsers) {
      executeButton.addEventListener("click", () => {
          if (executeButton.classList.contains("clickedExecute")) {
              getAllUsers();
              return;
          };
          executeButton.classList.toggle("clickedExecute");
          clearButton?.classList.toggle("unclickedClear");
          responseBody?.classList.toggle("responseBodyClicked");
          responseBodyMenu?.classList.toggle("responseBodyClicked");
          getAllUsers();
      });
    };
  
    if (clearButton) {
        clearButton.addEventListener("click", () => {
            executeButton?.classList.remove("clickedExecute");
            clearButton.classList.remove("unclickedClear");
            responseBody?.classList.remove("responseBodyClicked");
            responseBodyMenu?.classList.remove("responseBodyClicked");
            menuGetUsers?.classList.remove("active"); 
            arrow?.classList.remove("rotate");
        });
    };
};