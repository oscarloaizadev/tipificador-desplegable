/*let timeoutId;
let counter = 0;

const MAX_COPY_COUNTER = 30;
const COPY_BUTTON_TIMEOUT = 1000;*/

function updateInfo(jsonInfo) {
  // Obtén referencias a los elementos del  DOM
  const contentContainer = document.querySelector("#first-description");
  const descriptionTitle = document.querySelector("#first-title");

  /*const contentContainerTwo = document.querySelector("#second-description");
  const descriptionTitleTwo = document.querySelector("#second-title");
  */

  if (jsonInfo) {
    // Define los campos y etiquetas para el primer grupo de información
    const fields = [
      { key: "INFO1", label: "COMPAÑÍA" },
      {
        key: "INFO2",
        label: "FECHA DE PUBLICACIÓN",
      },
      {
        key: "INFO3",
        label: "GÉNERO",
      },
      {
        key: "INFO4",
        label: "DESCRIPCIÓN",
      },
    ];

    // Inicializa el contenido del primer grupo
    let content = "";

    // Genera el contenido del primer grupo
    fields.forEach(function (field) {
      const value = jsonInfo[field.key];
      if (value !== "" && value !== undefined) {
        if (field.key === "COPIAPEGA") {
          content += `<strong class="description-content-title">${field.label}</strong><br><div id="text-to-copy">${value}</div><br><button class="btn-copy-tooltip" id="btn-copy" onclick="copyToClipboard()">Copiar al portapapeles<span>Texto copiado</span></button>`;
        } else {
          content += `<strong class="description-content-title">${field.label}</strong><br>${value}<br><br>`;
        }
      }
    });

    /*
    // Define los campos y etiquetas para el segundo grupo de información
    const fieldsTwo = [{ key: "PROCESO", label: "PROCESO" }];

    // Inicializa el contenido del segundo grupo
    let contentTwo = "";

    // Genera el contenido del segundo grupo
    fieldsTwo.forEach((fieldTwo) => {
      const value = jsonInfo[fieldTwo.key];
      if (value !== "" && value !== undefined) {
        contentTwo += `<strong class="description-content-title">${fieldTwo.label}:</strong><br>${value}<br><br>`;
      }
    });
    */

    // Actualiza los elementos del DOM con la información generada
    contentContainer.innerHTML = content ? content : "No hay información disponible para esta subcategoría";
    //contentContainerTwo.innerHTML = contentTwo ? contentTwo : "No hay información disponible para esta subcategoría";
  } else {
    // En caso de que no haya información, muestra un mensaje predeterminado
    contentContainer.textContent = "No hay información disponible para esta subcategoría";
    //contentContainerTwo.textContent = "No hay información disponible para esta subcategoría";
  }

  // Actualiza el título con la información de categoría y subcategoría
  if (jsonInfo && jsonInfo["MACROCATEGORIA"]) {
    let title = jsonInfo["MACROCATEGORIA"];

    if (jsonInfo["SUBCATEGORIA"]) {
      title += ` | ${jsonInfo["SUBCATEGORIA"]}`;
    }

    if (jsonInfo["MICROCATEGORIA"]) {
      title += ` | ${jsonInfo["MICROCATEGORIA"]}`;
    }

    descriptionTitle.innerHTML = title;
  } else {
    descriptionTitle.innerHTML = "No hay información disponible";
  }
}

/*function copyToClipboard() {
  counter++;

  const textToCopy = document.getElementById("text-to-copy");

  navigator.clipboard
    .writeText(textToCopy.textContent)
    .then(() => {
      updateCopyButtonUI();
      setCopyButtonTimeout();
    })
    .catch((err) => {
      handleClipboardError(err);
    });
}

function updateCopyButtonUI() {
  const btnCopy = document.getElementById("btn-copy");
  const spanElement = btnCopy.querySelector("span");

  spanElement.classList.add("btn-copy-tooltip-active");

  if (counter === MAX_COPY_COUNTER) {
    spanElement.textContent = "¡COPIADOOOO! 🤬";
  } else if (counter > MAX_COPY_COUNTER) {
    spanElement.textContent += "🤬";
  }
}

function setCopyButtonTimeout() {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    resetCopyButtonUI();
    counter = 0;
  }, COPY_BUTTON_TIMEOUT);
}

function resetCopyButtonUI() {
  const btnCopy = document.getElementById("btn-copy");
  const spanElement = btnCopy.querySelector("span");

  spanElement.classList.remove("btn-copy-tooltip-active");
  spanElement.textContent = "Texto copiado";
}

function handleClipboardError(error) {
  console.error("Error al copiar al portapapeles:", error);
}*/

function changeSheet(sheetPageNumber) {
  const accordionContainer = document.querySelector(".accordion");
  const principalTitle = document.getElementById("principal-title");
  const searchInput = document.getElementById("searchInput");

  searchInput.value = "";
  accordionContainer.innerHTML = "";

  try {
    handleFileChange(sheetPageNumber);
  } catch (error) {
    console.error("Error changing sheet:", error);
    return;
  }

  if (sheetPageNumber === 0) {
    principalTitle.innerHTML = "Medicina";
    changeColorStyles(sheetPageNumber);
  } else if (sheetPageNumber === 1) {
    principalTitle.innerHTML = "Videojuegos";
    changeColorStyles(sheetPageNumber);
  } else if (sheetPageNumber === 2) {
    principalTitle.innerHTML = "Métodos de pago";
    changeColorStyles(sheetPageNumber);
  }
  accordionAnimation();
}

function changeColorStyles(colorIndicator) {
  const navbarContainer = document.querySelector(".navbar");
  const bannerContainer = document.querySelector(".banner");
  const footerContainer = document.querySelector("footer");
  const accordionContainer = document.querySelector(".accordion");

  const contentContainer = document.querySelector("#first-description");
  const descriptionTitle = document.querySelector("#first-title");

  colorIndicator += 1;
  document.documentElement.style.setProperty(
    "--color-contenedores-informacion",
    `var(--color-contenedores-informacion-pagina-${colorIndicator})`
  );
  document.documentElement.style.setProperty(
    "--color-contenedores-informacion-seleccionado",
    `var(--color-contenedores-informacion-seleccionado-pagina-${colorIndicator})`
  );
  document.documentElement.style.setProperty(
    "--color-contenedores-informacion-texto-subcategoria",
    `var(--color-contenedores-informacion-texto-subcategoria-pagina-${colorIndicator})`
  );
  document.documentElement.style.setProperty(
    "--color-contenedores-informacion-texto-subcategoria-seleccionado",
    `var(--color-contenedores-informacion-texto-subcategoria-seleccionado-pagina-${colorIndicator})`
  );
  document.documentElement.style.setProperty(
    "--color-contenedores-informacion-texto-descripcion",
    `var(--color-contenedores-informacion-texto-descripcion-pagina-${colorIndicator})`
  );
  document.documentElement.style.setProperty(
    "--color-boton-principal",
    `var(--color-boton-principal-pagina-${colorIndicator})`
  );
  document.documentElement.style.setProperty(
    "--color-boton-secundario",
    `var(--color-boton-secundario-pagina-${colorIndicator})`
  );
  document.documentElement.style.setProperty("--color-titulos", `var(--color-titulos-pagina-${colorIndicator})`);

  navbarContainer.style.background = `var(--color-nav-footer-pagina-${colorIndicator})`;
  bannerContainer.style.backgroundImage = `url("./src/banner/bg-pg${colorIndicator}.png")`;
  footerContainer.style.background = `var(--color-nav-footer-pagina-${colorIndicator})`;
  accordionContainer.style.height = `var(--height-accordion-pagina-${colorIndicator})`;

  contentContainer.innerHTML = initialContent;
  descriptionTitle.innerHTML = initialTitle;
}
