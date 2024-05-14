import "./style.css";
import { checkSwagger } from "./checkSwagger"
import { routes } from "./routesInfo";
import { createHtml } from "./createHtml";

const createHtmlNode = (htmlString: string | string[]) => {
  const placeholder = document.createElement("div");
  placeholder.innerHTML = typeof htmlString === `string` ? htmlString : htmlString.join(``);
  return placeholder.firstElementChild;
};

(() => {
  const appDiv = document.querySelector<HTMLDivElement>("#app");
  const node = createHtmlNode(createHtml(routes));
  if (appDiv && node) {
    appDiv.append(node);
    checkSwagger(node, routes);
  }
})();