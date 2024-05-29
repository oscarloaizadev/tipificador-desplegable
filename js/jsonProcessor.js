// Función para manejar la manipulación del archivo JSON
let initialContent;
let initialTitle;

function loadAccordionFromJSON(jsonData) {
  // Verifica que jsonData no sea null ni undefined antes de usar Object.keys
  if (jsonData == null) {
    return;
  }

  console.log(jsonData);

  if (!initialContent && !initialTitle) {
    const contentContainer = document.querySelector("#first-description");
    const descriptionTitle = document.querySelector("#first-title");

    initialContent = contentContainer.innerHTML;
    initialTitle = descriptionTitle.innerHTML;
  }

  const accordionContainer = document.querySelector(".accordion");

  // Iterar sobre cada categoría en los datos
  Object.keys(jsonData).forEach((category) => {
    const subcategories = jsonData[category];
    const categoryElement = createAccordionItem(category, subcategories);
    accordionContainer.appendChild(categoryElement);
  });

  // Registra el evento input en el campo de búsqueda
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    filterAccordionBySearchTerm(searchInput.value.toLowerCase(), jsonData);
  });

  // Evento para limpiar la búsqueda
  const searchInputCleaner = document.getElementById("searchInputCleaner");
  searchInputCleaner.addEventListener("click", () => {
    searchInput.value = "";
    filterAccordionBySearchTerm("", jsonData);
  });

  accordionAnimation();
}

function createAccordionItem(category, subcategories) {
  const accordionItem = document.createElement("div");
  accordionItem.setAttribute("data-category", category);
  accordionItem.classList.add("accordion-content");

  const header = document.createElement("header");
  const categoryTitle = document.createElement("h3");
  categoryTitle.classList.add("title");
  categoryTitle.textContent = category;

  const iconPlus = document.createElement("i");
  iconPlus.classList.add("fa-solid", "fa-plus");

  header.appendChild(categoryTitle);
  header.appendChild(iconPlus);

  const descriptionDiv = document.createElement("div");
  descriptionDiv.classList.add("description");

  // Verificar si subcategories es un objeto
  if (typeof subcategories === "object" && subcategories !== null) {
    // Iterar sobre las subcategorías
    for (const subcategoryKey in subcategories) {
      if (subcategories.hasOwnProperty(subcategoryKey)) {
        const subcategoryArray = subcategories[subcategoryKey];

        // Verificar si subcategoryArray es un array
        if (Array.isArray(subcategoryArray)) {
          // Filtrar subcategorías con microcategorías
          const subcategoriesWithMicro = subcategoryArray.filter(
            (subcategoryObject) => subcategoryObject["MICROCATEGORIA"]
          );

          // Filtrar subcategorías sin microcategorías
          const subcategoriesWithoutMicro = subcategoryArray.filter(
            (subcategoryObject) => !subcategoryObject["MICROCATEGORIA"]
          );

          // Utilizar map para crear los enlaces para cada subcategoría con microcategorías
          const microLinks = subcategoriesWithMicro.map((subcategoryObject) => {
            return createSubcategoryLink(subcategoryKey, subcategoryObject);
          });

          // Crear un contenedor para subcategorías con microcategorías (detalles)
          if (microLinks.length > 0) {
            const subAccordionContainer = document.createElement("div");
            subAccordionContainer.classList.add("sub-accordion");

            const subAccordionItem = document.createElement("div");
            subAccordionItem.setAttribute("data-sub-category", `${category + subcategoryKey}`);
            subAccordionItem.classList.add("sub-accordion-content");

            const subHeader = document.createElement("header");
            const subCategoryTitle = document.createElement("h3");
            subCategoryTitle.classList.add("title");
            subCategoryTitle.textContent = subcategoryKey;

            const iconPlus = document.createElement("i");
            iconPlus.classList.add("fa-solid", "fa-plus");

            subHeader.appendChild(subCategoryTitle);
            subHeader.appendChild(iconPlus);

            const subDescriptionDiv = document.createElement("div");
            subDescriptionDiv.classList.add("sub-description");

            const microContainer = document.createElement("div");
            microContainer.classList.add("subcategory-container");

            microContainer.append(...microLinks);

            // Mover el contenido de microContainer a subDescriptionDiv
            subDescriptionDiv.appendChild(microContainer);

            subAccordionItem.appendChild(subHeader);
            subAccordionItem.appendChild(subDescriptionDiv);

            subAccordionContainer.appendChild(subAccordionItem);

            // Agregar el contenedor sub-accordion al contenedor principal (descriptionDiv)
            descriptionDiv.appendChild(subAccordionContainer);
          }

          // Utilizar map para crear los enlaces para subcategorías sin microcategorías
          const nonMicroLinks = subcategoriesWithoutMicro.map((subcategoryObject) => {
            return createSubcategoryLink(subcategoryKey, subcategoryObject);
          });

          // Crear un contenedor para subcategorías sin microcategorías
          if (nonMicroLinks.length > 0) {
            const nonMicroContainer = document.createElement("div");
            nonMicroContainer.classList.add("subcategory-container");
            nonMicroContainer.append(...nonMicroLinks);
            descriptionDiv.appendChild(nonMicroContainer);
            accordionItem.appendChild(header);
            accordionItem.appendChild(descriptionDiv);
          } else {
            accordionItem.appendChild(header);
            accordionItem.appendChild(descriptionDiv);
          }
        }
      }
    }
  } else {
    // Manejar el caso en que subcategories no es un objeto
    console.error("Error: subcategories no es un objeto", subcategories);
  }

  return accordionItem;
}

function createSubcategoryLink(subcategoryKey, subcategoryObject) {
  const link = document.createElement("a");

  const subcategoryDescription = processCellValue(subcategoryObject["MICROCATEGORIA"]) || subcategoryKey;

  link.innerHTML = subcategoryDescription;

  link.onclick = function () {
    updateInfo(subcategoryObject);
  };

  return link;
}

function filterAccordionBySearchTerm(searchTerm, data) {
  // Obtener el contenedor del acordeón en el DOM
  const accordionContainer = document.querySelector(".accordion");

  // Variables para gestionar coincidencias y el índice de iteración
  let matchSubcategory;
  let matchMicrocategory;
  let _index = 0;
  let _key = 0;
  let coincidende = false;
  let contitionMet = false;

  contenedorGrandeDespuesPequeño = null;
  contenedorPequeñoDespuesGrande = null;
  contenedorGrande = null;
  contenedorPequeño = null;

  // Iterar sobre cada categoría en los datos
  Object.keys(data).forEach((category) => {
    // Obtener las subcategorías de la categoría actual
    const subcategories = data[category];

    /*console.log(data);
    console.log(subcategories);*/

    // Tratar subcategories como un objeto usando Object.values si es un objeto
    const subcategoriesArray = Array.isArray(subcategories) ? subcategories : Object.values(subcategories);

    // Obtener el elemento de la categoría en el DOM
    const categoryElement = accordionContainer.querySelector(`[data-category="${category}"]`);
    const subcategoryElements = categoryElement.querySelectorAll(".description a");
    let subAccordionElement;

    // Verificar si la categoría coincide con el término de búsqueda
    const matchCategory = matchString(searchTerm, category);

    // Iterar sobre cada subcategoría en la categoría
    subcategoriesArray.forEach((subcategory, index) => {
      if (index !== 0) {
        _index--;
      }
      if (contitionMet) {
        _index++;
        contitionMet = false;
      }
      // Reiniciar índices y claves al inicio de cada subcategoría
      if (index === 0) {
        _index = 0;
        _key = 0;
        contenedorPequeño = null;
        contenedorGrande = null;
      }
      /*console.log(
        "SUBCATEGORÍA: ",
        subcategory[0]["SUBCATEGORIA"],
        " | index: ",
        index,
        "| CATEGORÍA:",
        subcategory[0]["MACROCATEGORIA"]
      );*/

      if (subcategory.length === 1) {
        contenedorPequeño = true;
        // Manejar el caso de una sola subcategoría en el array
        if (_key !== 0) {
          _key = 0;
          _index--;
        }
        if (contenedorGrande && contenedorGrande && index !== 0) {
          _index++;
          contenedorGrande = false;
        }

        contitionMet = true;

        /* console.log(
          `${subcategory[_key]["MICROCATEGORIA"]} _key: ${_key} | _index(${_index}) + index(${index}) :${
            _index + index
          } | %c(Longitud = 1)`,
          "color: red"
        );
        console.log(subcategoryElements[index + _index]);*/

        matchSubcategory = anySubcategoryMatches(subcategory, searchTerm, false);

        /* console.log(subcategory[parseInt(index)]);
        console.log(matchSubcategory);*/
        console.log(subcategoryElements[index + _index].textContent, "| HOLA -> ", matchSubcategory);
        subcategoryElements[index + _index].style.display =
          searchTerm === "" || matchCategory || matchSubcategory ? "block" : "none";
      } else {
        // Iterar sobre las claves de la subcategoría
        Object.keys(subcategory).forEach((key) => {
          _key = key;
          /*console.log(
            `${subcategory[_key]["MICROCATEGORIA"]} _key: ${_key} | _index(${_index}) + index(${index}) :${
              _index + index
            } | %c(Longitud > 1)`,
            "color: aquamarine"
          );
          console.log(subcategoryElements[index + _index]);*/
          // Obtener el elemento de subcategoría en el DOM
          subAccordionElement = accordionContainer.querySelector(
            `[data-sub-category="${subcategory[0]["MACROCATEGORIA"] + subcategory[0]["SUBCATEGORIA"]}"]`
          );

          /*console.log(subcategory.slice(parseInt(key), parseInt(key) + 1));*/

          // Comprobar coincidencia con microcategoría
          matchMicrocategory = anyMicrocategoryMatches(subcategory.slice(parseInt(key), parseInt(key) + 1), searchTerm);
          const matchSubCategory = matchString(searchTerm, subcategory[key]["MICROCATEGORIA"]);

          // Inicializar coincidende si es la primera clave
          if (parseInt(key) === 0) {
            coincidende = false;
          }

          // Actualizar coincidencia con microcategoría
          if (matchMicrocategory === true) {
            coincidende = true;
          }

          // Actualizar el estilo de la subcategoría y su elemento en el DOM

          subcategoryElements[index + _index].style.display =
            searchTerm === "" || matchSubCategory || matchMicrocategory ? "block" : "none";
          console.log(subcategoryElements[index + _index].textContent, " HOLA -> ", matchMicrocategory);
          subAccordionElement.style.display = searchTerm === "" || matchMicrocategory || coincidende ? "block" : "none";

          // Incrementar índices y claves
          _index++;
          contenedorGrande = true;
        });
      }
      /*console.log("---------------------------");*/
    });

    // Mostrar u ocultar el elemento de la categoría según la coincidencia con la categoría o alguna subcategoría
    categoryElement.style.display =
      searchTerm === "" ||
      matchCategory ||
      subcategoriesArray.some((subcategory) => anySubcategoryMatches(subcategory, searchTerm))
        ? "block"
        : "none";
  });
}

function anySubcategoryMatches(subcategories, searchTerm) {
  return subcategories.some((subcategory) => {
    const propertiesToMatch = ["SUBCATEGORIA", "MICROCATEGORIA", "CONCEPTUALIZACION", "EJEMPLOS", "INSTRUCCION"];

    const matchResults = propertiesToMatch.map((property) => {
      const isMatch = matchString(searchTerm, subcategory[property]);
      return isMatch;
    });

    return matchResults.some((result) => result === true);
  });
}

function anyMicrocategoryMatches(subcategories, searchTerm) {
  return subcategories.some((subcategory) => {
    const propertiesToMatch = ["SUBCATEGORIA", "MICROCATEGORIA", "CONCEPTUALIZACION", "EJEMPLOS", "INSTRUCCION"];

    const matchResults = propertiesToMatch.map((property) => {
      const isMatch = matchString(searchTerm, subcategory[property]);
      return isMatch;
    });

    return matchResults.some((result) => result === true);
  });
}

function matchString(searchTerm, string) {
  // Normalizar los términos de búsqueda y de la cadena para asegurar consistencia en la comparación
  const normalizedSearchTerm = normalizeText(searchTerm);
  const normalizedString = normalizeText(string);

  // Hacer la comparación
  const result = normalizedSearchTerm !== "" && normalizedString?.includes(normalizedSearchTerm);

  return result;
}

function normalizeText(text) {
  if (typeof text !== "undefined" && text !== null) {
    return text
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }
  // Return an empty string if text is undefined or null
  return "";
}

// Llamar a la función de carga del acordeón desde el JSON
loadAccordionFromJSON();
