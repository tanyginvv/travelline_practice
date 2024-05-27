import "./style.css";
import { routes } from "./routesInfo";
import { createHtmlForRoute } from "./createHtmlForRoute";
import { checkSwagger } from "./checkSwagger";

const createHtmlNode = (htmlString: string) => {
  const placeholder = document.createElement("div");
  placeholder.innerHTML = htmlString;
  return placeholder.firstElementChild;
};

(() => {
  const appDiv = document.querySelector<HTMLDivElement>("#app");
  if (appDiv) {
    routes.forEach(route => {
      const htmlString = createHtmlForRoute(route);
      const node = createHtmlNode(htmlString);
      if (node) {
        appDiv.append(node);
        checkSwagger(node, route);
      }
    });
  }
})();
