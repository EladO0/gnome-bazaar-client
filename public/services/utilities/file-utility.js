export const injectTemplate = (componentPath, cssPath, targetElementId) => {
  //dynamically inject ready made components
  fetch(componentPath)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(targetElementId).innerHTML = data;

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssPath;
      document.head.appendChild(link);
    });
};
