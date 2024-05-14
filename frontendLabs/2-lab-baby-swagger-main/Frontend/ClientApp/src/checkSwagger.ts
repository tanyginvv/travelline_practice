import { Route } from "./routesInfo";
import { getParameterTypesString } from "./createHtml";
const BASE_URL = 'http://localhost:5154';

const makeResponse = async (route: Route) => {
    const requestBodyTextarea = document.querySelector(`.request-body-${route.method.toLowerCase()}`) as HTMLTextAreaElement | null;
    const requestBody = requestBodyTextarea?.value;
    
    const idInput = document.querySelector(`#${route.method.toLowerCase()}-id`) as HTMLInputElement | null;
    const emailInput = document.querySelector(`#${route.method.toLowerCase()}-email`) as HTMLInputElement | null;
    
    const id = route.url.includes('{id}') && idInput ? idInput.value : '';
    const email = route.url.includes('{email}') && emailInput ? emailInput.value : '';
    
    const baseUrlWithId = route.url
        .replace('{id}', id)
        .replace('{email}', email.toString());

    const response = await fetch(`${BASE_URL}${baseUrlWithId}`, {
        method: route.method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBody
    });

    const responseData = await response.json(); 
      
    const responseUrlResult = document.querySelector(`.${route.method.toLowerCase() + getParameterTypesString(route)} .${route.method.toLowerCase() + getParameterTypesString(route)}-response #response-url-result`); 
    const responseCodeResult = document.querySelector(`.${route.method.toLowerCase() + getParameterTypesString(route)} .${route.method.toLowerCase() + getParameterTypesString(route)}-response #response-code-result`);
    const responseBodyResult = document.querySelector(`.${route.method.toLowerCase() + getParameterTypesString(route)} .${route.method.toLowerCase() + getParameterTypesString(route)}-response #response-body-result`);
    const responseHeadersResult = document.querySelector(`.${route.method.toLowerCase() + getParameterTypesString(route)} .${route.method.toLowerCase() + getParameterTypesString(route)}-response #response-headers-result`);

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

export const checkUserActions = (node: Element, route: Route) => {
    const menuButton = node.querySelector(`.${route.method.toLowerCase() + getParameterTypesString(route)} .${route.method.toLowerCase() + getParameterTypesString(route)}-user`);
    const menu = node.querySelector(`.${route.method.toLowerCase() + getParameterTypesString(route)} .route-header-menu`);
    const arrow = node.querySelector(`.${route.method.toLowerCase() + getParameterTypesString(route)} .${route.method.toLowerCase() + getParameterTypesString(route)}-user .arrow`); 

    if (menuButton && menu) {
        menuButton.addEventListener("click", () => {
            menu.classList.toggle("execute");
            arrow?.classList.toggle("rotate");
        });
    };

    const executeButton = node.querySelector(`.${route.method.toLowerCase() + getParameterTypesString(route)} .menu-button-execute`);
    const clearButton = node.querySelector(`.${route.method.toLowerCase() + getParameterTypesString(route)} .menu-button-clear`);
    const responseBody = node.querySelector(`.${route.method.toLowerCase() + getParameterTypesString(route)} .route-header-response`);
    const responseBodyMenu = node.querySelector(`.${route.method.toLowerCase() + getParameterTypesString(route)} .route-header-menu-response`);

    if (executeButton && clearButton){
        executeButton.addEventListener("click", () => {
            if (executeButton.classList.contains("clickedExecute")) {
                makeResponse(route);
                return;
            };
            executeButton.classList.toggle("clickedExecute");
            clearButton?.classList.toggle("unclickedClear");
            responseBody?.classList.toggle("execute");
            responseBodyMenu?.classList.toggle("responseBodyClicked");
            makeResponse(route);
        });
    };
    
    if (clearButton) {
        clearButton.addEventListener("click", () => {
            executeButton?.classList.remove("clickedExecute");
            clearButton.classList.remove("unclickedClear");
            responseBody?.classList.remove("execute");
            responseBodyMenu?.classList.remove("responseBodyClicked");
        });
    };
};

export const checkSwagger = (node: Element, routes: Route[]) =>{
    routes.forEach(route => {
        checkUserActions(node, route);
    });
}