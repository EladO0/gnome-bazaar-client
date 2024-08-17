import { injectTemplate } from "../../services/utilities/file-utility.js";

const injectComponents = () => {
  const footerDir = "../../components/footer";
  const footerPage = footerDir + "/footer.html";
  const footerCSS = footerDir + "/footer.css";
  injectTemplate(footerPage, footerCSS, "footer-container");
};

document.addEventListener("DOMContentLoaded", injectComponents);
