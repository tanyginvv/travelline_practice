import { Route } from "./routesInfo";
import arrowIcon from "./icon-arrow-up.svg";

export const getParameterTypesString = (route: Route): string => {
    if (!route.parameters) return '';
    const paramNames = Object.keys(route.parameters);
    if (paramNames.length === 0) return '';
    return '-' + paramNames.join('-');
};

export const createHtml = (routes: Route[]): string => {
    const routeElements = routes.map(route => {
        const parameterInputs = route.parameters ? Object.entries(route.parameters).map(([param, type]) => `
        <div class="route-header-menu-input">
            <div class="input-title">
                <p class="title-text">${param}</p>
                <p class="title-text-subtitle">${type}</p>
            </div>
            <p class="input-require">*required</p>
            <input class="input-field" placeholder="${param}" id="${route.method.toLowerCase()+'-'+ param.toLowerCase()}"></input>
        </div>
        `).join('') : '';

        const requestBody = route.body ? `
        <div class="route-header-request">
            <div class="route-header-menu-header request-${route.method.toLowerCase()}">
                <div class="route-header-menu-parametr request-param">
                <span class="parametr-text">Request body</span>
                </div>
            </div>
            <div class="route-header-menu-request">
                <textarea class="request-body-${route.method.toLowerCase()}">${JSON.stringify(route.body, null, 2)}</textarea>
            </div>
        </div>
    ` : '';

        return `
        <div class="route route-${route.method.toLowerCase()} ${route.method.toLowerCase() + getParameterTypesString(route)}">
            <div class="route-header">
                <button class="route-summary ${route.method.toLowerCase() + getParameterTypesString(route)}-user">
                    <div class="route-summary-method">${route.method}</div>
                        <span class="route-summary-path">${route.url}</span>
                    <div class="route-summary-arrow"><img class="arrow" src=${arrowIcon} /></div>
                </button>
                <div class="route-header-menu menu-${route.method.toLowerCase()}">
                    <div class="route-header-menu-header">
                        <div class="route-header-menu-parametr">
                            <span class="parametr-text">Parameters</span>
                        </div>
                    </div>
                    ${parameterInputs}
                    ${requestBody}
                    <div class="route-header-menu-buttons">
                        <button class="menu-button-execute">Execute</button>
                        <button class="menu-button-clear">Clear</button>
                    </div>
                    <div class="route-header-menu-response ${route.method.toLowerCase() + getParameterTypesString(route)}-response">
                        <div class="route-header-menu-header">
                            <div class="route-header-menu-parametr">
                                <span class="parametr-text">Response</span>
                            </div>
                        </div>
                        <div class="response-url response-item">
                            <p class="response-url-title response-title">Response URL</p>
                            <p class="response-url-result response-result" id="response-url-result"></p>
                        </div>
                        <div class="response-code response-item">
                            <p class="response-code-title response-title">Response code</p>
                            <p class="response-code-result response-result" id="response-code-result"></p>
                        </div>
                        <div class="response-body response-item">
                            <p class="response-body-title response-title">Response body</p>
                            <p class="response-body-result response-result" id="response-body-result"></p>
                        </div>
                        <div class="response-headers response-item">
                            <p class="response-headers-title response-title">Response headers</p>
                            <p class="response-headers-result response-result" id="response-headers-result"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join('');

    return `
        <div class="router">
        ${routeElements}
        </div>
    `;
};