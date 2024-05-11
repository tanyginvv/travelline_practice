import arrowIcon from "./icon-arrow-up.svg";
import "./style.css";
import { checkPutUser } from "./putUser";
import { checkGetUsers } from "./getAllUsers";
import { checkPostUser } from "./postUser";
import { checkDeleteUser } from "./deleteUser";
import { checkGetUsersById } from "./getUserById";
import { checkGetUsersByMail } from "./getUserByMail";

const createHtmlNode = (htmlString: string | string[]) => {
  const placeholder = document.createElement("div");
  placeholder.innerHTML = typeof htmlString === `string` ? htmlString : htmlString.join(``);

  return placeholder.firstElementChild;
};

const createHtml = () => {
  return `
<div class="router">
  <div class="route route-get">
    <div class="route-header">
      <button class="route-summary get-users">
        <div class="route-summary-method">GET</div>
          <span class="route-summary-path">/Users</span>
        <div class="route-summary-arrow"><img class="arrow" src=${arrowIcon} /></div>
      </button>
    </div>
    <div class="route-header-menu execute-users">
        <div class="route-header-menu-header">
          <div class="route-header-menu-parametr">
            <span class="parametr-text">Parameters</span>
          </div>
        </div>
        <div class="route-header-menu-buttons">
          <button class="menu-button-execute">Execute</button>
          <button class="menu-button-clear">Clear</button>
        </div>
        <div class="route-header-response">
          <div class="route-header-menu-header">
            <div class="route-header-menu-parametr">
              <span class="parametr-text">Response</span>
            </div>
          </div>
          <div class="route-header-menu-response">
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
  <div class="route route-post">
    <div class="route-header">
      <button class="route-summary post-user">
        <div class="route-summary-method">POST</div>
        <span class="route-summary-path">/Users</span>
        <div class="route-summary-arrow"><img class="arrow" src=${arrowIcon} /></div>
      </button>
      <div class="route-header-menu menu-post">
        <div class="route-header-menu-header">
          <div class="route-header-menu-parametr">
            <span class="parametr-text">Parameters</span>
          </div>
        </div>
        <div class="route-header-request">
          <div class="route-header-menu-header request-post">
            <div class="route-header-menu-parametr request-param">
              <span class="parametr-text">Request body</span>
            </div>
          </div>
          <div class="route-header-menu-request">
            <textarea class="request-body-post"></textarea>
          </div>
          <div class="route-header-menu-buttons">
            <button class="menu-button-execute">Execute</button>
            <button class="menu-button-clear">Clear</button>
          </div>
          <div class="route-header-menu-response post-request">
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
  </div>
  <div class="route route-get-users">
    <div class="route-header">
      <button class="route-summary get-users-by-id">
        <div class="route-summary-method">GET</div>
          <span class="route-summary-path">/Users/{id}</span>
        <div class="route-summary-arrow"><img class="arrow" src=${arrowIcon} /></div>
      </button>
    </div>
    <div class="route-header-menu execute-users-by-id">
        <div class="route-header-menu-header">
          <div class="route-header-menu-parametr">
            <span class="parametr-text">Parameters</span>
          </div>
        </div>
        <div class="route-header-menu-input">
          <div class="input-title">
            <p class="title-text">id</p>
            <p class="title-text-subtitle">int</p>
          </div>
          <p class="input-require">*required</p>
          <input class="input-field" placeholder="id" id="get-by-id"></input>
        </div>
        <div class="route-header-menu-buttons">
          <button class="menu-button-execute">Execute</button>
          <button class="menu-button-clear">Clear</button>
        </div>
        <div class="route-header-response">
          <div class="route-header-menu-header">
            <div class="route-header-menu-parametr">
              <span class="parametr-text">Response</span>
            </div>
          </div>
          <div class="route-header-menu-response">
            <div class="response-url response-item">
              <p class="response-url-title response-title">Response URL</p>
              <p class="response-url-result response-result" id="response-url-result-get"></p>
            </div>
            <div class="response-code response-item">
              <p class="response-code-title response-title">Response code</p>
              <p class="response-code-result response-result" id="response-code-result-get"></p>
            </div>
            <div class="response-body response-item">
              <p class="response-body-title response-title">Response body</p>
              <p class="response-body-result response-result" id="response-body-result-get"></p>
            </div>
            <div class="response-headers response-item">
              <p class="response-headers-title response-title">Response headers</p>
              <p class="response-headers-result response-result" id="response-headers-result-get"></p>
            </div>
          </div>
        </div>
    </div>
  </div>
  <div class="route route-put">
    <div class="route-header">
      <button class="route-summary put-user">
        <div class="route-summary-method">PUT</div>
        <span class="route-summary-path">/Users/{id}</span>
        <div class="route-summary-arrow"><img class="arrow" src=${arrowIcon} /></div>
      </button>
      <div class="route-header-menu menu-put">
        <div class="route-header-menu-header">
          <div class="route-header-menu-parametr">
            <span class="parametr-text">Parameters</span>
          </div>
        </div>
        <div class="route-header-menu-input">
          <div class="input-title">
            <p class="title-text">id</p>
            <p class="title-text-subtitle">int</p>
          </div>
          <p class="input-require">*required</p>
          <input class="input-field" placeholder="id" id="put-id"></input>
        </div>
        <div class="route-header-request">
          <div class="route-header-menu-header request-put">
            <div class="route-header-menu-parametr request-param">
              <span class="parametr-text">Request body</span>
            </div>
          </div>
          <div class="route-header-menu-request">
            <textarea class="request-body-put"></textarea>
          </div>
          <div class="route-header-menu-buttons">
            <button class="menu-button-execute">Execute</button>
            <button class="menu-button-clear">Clear</button>
          </div>
          <div class="route-header-menu-response put-request">
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
  </div>
  <div class="route route-delete">
    <div class="route-header">
      <button class="route-summary delete-user">
        <div class="route-summary-method">DELETE</div>
        <span class="route-summary-path">/Users/{id}</span>
        <div class="route-summary-arrow"><img class="arrow" src=${arrowIcon} /></div>
      </button>
      <div class="route-header-menu menu-delete">
        <div class="route-header-menu-header">
          <div class="route-header-menu-parametr">
            <span class="parametr-text">Parameters</span>
          </div>
        </div>
        <div class="route-header-menu-input">
          <div class="input-title">
            <p class="title-text">id</p>
            <p class="title-text-subtitle">int</p>
          </div>
          <p class="input-require">*required</p>
          <input class="input-field" placeholder="id" id="delete-id"></input>
        </div>
        <div class="route-header-request">
          <div class="route-header-menu-buttons">
            <button class="menu-button-execute">Execute</button>
            <button class="menu-button-clear">Clear</button>
          </div>
          <div class="route-header-menu-response">
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
  </div>
  <div class="route route-get-users-by-mail">
    <div class="route-header">
      <button class="route-summary get-users-by-mail">
        <div class="route-summary-method">GET</div>
          <span class="route-summary-path">/Users/get-by-email/{email}</span>
        <div class="route-summary-arrow"><img class="arrow" src=${arrowIcon} /></div>
      </button>
    </div>
    <div class="route-header-menu execute-users-by-mail">
        <div class="route-header-menu-header">
          <div class="route-header-menu-parametr">
            <span class="parametr-text">Parameters</span>
          </div>
        </div>
        <div class="route-header-menu-input">
          <div class="input-title">
            <p class="title-text">email</p>
            <p class="title-text-subtitle">string</p>
          </div>
          <p class="input-require">*required</p>
          <input class="input-field" placeholder="email" id="get-by-mail"></input>
        </div>
        <div class="route-header-menu-buttons">
          <button class="menu-button-execute">Execute</button>
          <button class="menu-button-clear">Clear</button>
        </div>
        <div class="route-header-response">
          <div class="route-header-menu-header">
            <div class="route-header-menu-parametr">
              <span class="parametr-text">Response</span>
            </div>
          </div>
          <div class="route-header-menu-response">
            <div class="response-url response-item">
              <p class="response-url-title response-title">Response URL</p>
              <p class="response-url-result response-result" id="response-url-result-get-by-mail"></p>
            </div>
            <div class="response-code response-item">
              <p class="response-code-title response-title">Response code</p>
              <p class="response-code-result response-result" id="response-code-result-get-by-mail"></p>
            </div>
            <div class="response-body response-item">
              <p class="response-body-title response-title">Response body</p>
              <p class="response-body-result response-result" id="response-body-result-get-by-mail"></p>
            </div>
            <div class="response-headers response-item">
              <p class="response-headers-title response-title">Response headers</p>
              <p class="response-headers-result response-result" id="response-headers-result-get-by-mail"></p>
            </div>
          </div>
        </div>
    </div>
  </div>
</div>`;
};

(() => {
  const appDiv = document.querySelector<HTMLDivElement>("#app");
  const node = createHtmlNode(createHtml());
  if (appDiv && node) {
    appDiv.append(node);

    checkGetUsers(node);
    checkPutUser(node);
    checkPostUser(node);
    checkDeleteUser(node);
    checkGetUsersById(node);
    checkGetUsersByMail(node);
  }
})();