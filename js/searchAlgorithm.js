function filterAccordionElementsBySearchTerm(searchTerm, data) {
  // Obtener el contenedor del acordeón en el DOM
  const accordionContainer = document.querySelector(".accordion");

  // Iterar sobre cada categoría en los datos
  Object.keys(data).forEach((category) => {
    // Obtener las subcategorías de la categoría actual
    const subcategories = data[category];
    const matchCategory = matchString(searchTerm, category);

    /*console.log(data);
    console.log(subcategories);*/

    // Tratar subcategories como un objeto usando Object.values si es un objeto
    const subcategoriesArray = Array.isArray(subcategories) ? subcategories : Object.values(subcategories);

    // Obtener el elemento de la categoría en el DOM
    const categoryElement = accordionContainer.querySelector(`[data-category="${category}"]`);

    //! Este elemento obtiene todos los elementos que nos permiten actualizar la información que se muestra al usuario.
    const subcategoryElements = categoryElement.querySelectorAll(".description a");
    console.log(subcategoryElements);

    //* Iterar sobre cada subcategoría en la categoría
    /*console.log("%c" + `---> ${category}`, "color: red;  font-weight: bold");*/ // Comentario para mostrar en qué Macrocateogría nos encontramos
    let _indexAuxiliar = 0;
    subcategoriesArray.forEach((subcategory) => {
      //!
      //!
      //! Verificamos si se trata de una microcategoría que no pertenece a una subcategoría o una subcategoría con una única microcategoría
      //!
      //!
      //
      if (subcategory.length === 1) {
        /*console.log(
          "%c" + subcategory[0]["SUBCATEGORIA"],
          "color: #5CAFD1",
          " size: (",
          subcategory.length,
          ")",
          anySubcategoryMatches(subcategory, searchTerm, false),
          subcategoryElements[_indexAuxiliar].textContent
        );*/

        //* -> Aquí estamos verificando si la microcategoría coincide con el termino de búsqueda.
        matchSubcategory = anySubcategoryMatches(subcategory, searchTerm, false);

        subcategoryElements[_indexAuxiliar].style.display =
          searchTerm === "" || matchCategory || matchSubcategory ? "block" : "none";
        //* -------------------------------------------------------------------------------------

        //* -> Aquí estamos verificando si la microcategoría coincide con el termino de búsqueda y es un caso especial donde sólo hay una
        const subAccordionContainerOnlyHasOneTerm = accordionContainer.querySelector(
          `[data-sub-category="${subcategory[0]["MACROCATEGORIA"] + subcategory[0]["SUBCATEGORIA"]}"]`
        );

        if (subAccordionContainerOnlyHasOneTerm !== null) {
          subAccordionContainerOnlyHasOneTerm.style.display =
            searchTerm === "" || matchCategory || matchSubcategory ? "block" : "none";
        }
        //* -------------------------------------------------------------------------------------

        //console.log(subcategoryElements[_indexAuxiliar].style.display);
        _indexAuxiliar++;

        //!
        //!
        //! Verificamos si se trata de varias microcategorías que pertenecen a una subcategoría misma
        //!
        //!
        //
      } else {
        const subAccordionElement = accordionContainer.querySelector(
          `[data-sub-category="${subcategory[0]["MACROCATEGORIA"] + subcategory[0]["SUBCATEGORIA"]}"]`
        );
        /*console.log(subAccordionElement);
        console.log("%c" + subcategory[0]["SUBCATEGORIA"], "color: #8ED15C", " size: (", subcategory.length, ")");*/

        let verifyCoincidenceAnyMicroCategoryToShowSubAccordionSubCategory = false;
        Object.keys(subcategory).forEach((key) => {
          /*console.log(
            "%c" + `---| ${subcategory[key]["MICROCATEGORIA"]}`,
            "color: #8ED15C",
            anySubcategoryMatches(subcategory.slice(parseInt(key), parseInt(key) + 1), searchTerm, false),
            subcategoryElements[_indexAuxiliar].textContent
          );*/

          //
          //* -> Aquí estamos verificando si la microcategoría coincide con el termino de búsqueda.
          const matchMicrocategory = anySubcategoryMatches(
            subcategory.slice(parseInt(key), parseInt(key) + 1),
            searchTerm,
            true
          );
          const matchSubCategory = matchString(searchTerm, subcategory[key]["MICROCATEGORIA"]);

          subcategoryElements[_indexAuxiliar].style.display =
            searchTerm === "" || matchSubCategory || matchMicrocategory ? "block" : "none";

          if (parseInt(key) === 0 && !matchMicrocategory) {
            verifyCoincidenceAnyMicroCategoryToShowSubAccordionSubCategory = false;
          } else if (matchMicrocategory === true) {
            verifyCoincidenceAnyMicroCategoryToShowSubAccordionSubCategory = true;
          }

          subAccordionElement.style.display =
            searchTerm === "" || matchMicrocategory || verifyCoincidenceAnyMicroCategoryToShowSubAccordionSubCategory
              ? "block"
              : "none";
          //* -------------------------------------------------------------------------------------
          //

          //console.log(subcategoryElements[_indexAuxiliar].style.display);
          _indexAuxiliar++;
        });
      }
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
