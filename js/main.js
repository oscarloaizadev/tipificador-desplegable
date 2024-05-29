function accordionAnimation() {
  // Obtener todos los elementos con las clases "accordion" y "sub-accordion"
  const todosAccordions = document.querySelectorAll(".accordion, .sub-accordion");

  // Iterar sobre cada elemento accordion
  todosAccordions.forEach((accordion) => {
    // Agregar un listener de clic a cada accordion
    accordion.addEventListener("click", (evento) => {
      // Encontrar el elemento header más cercano al objetivo del evento
      const header = evento.target.closest("header");

      // Verificar si se ha encontrado un elemento header
      if (header) {
        // Obtener el elemento padre del header (item completo)
        const item = header.parentNode;

        // Determinar si es un sub-accordion
        const esSubAccordion = accordion.classList.contains("sub-accordion");

        // Seleccionar el selector correcto para la animación
        const selector = esSubAccordion ? ".sub-accordion-content" : ".accordion-content";

        // Obtener todos los elementos que deben animarse
        const todosItems = document.querySelectorAll(selector);

        // Iterar sobre cada elemento que debe animarse
        todosItems.forEach((accordionItem) => {
          // Encontrar los elementos descriptivos y los iconos asociados
          const descripcion = accordionItem.querySelector(".description, .sub-description");
          const icono = accordionItem.querySelector("i");

          // Verificar si el elemento actual es el mismo que el clicado
          if (accordionItem === item) {
            // Alternar la clase "open" para abrir o cerrar el elemento
            accordionItem.classList.toggle("open");

            // Realizar acciones correspondientes si se abre el elemento
            if (accordionItem.classList.contains("open")) {
              // Establecer la altura de la descripción para lograr la animación
              descripcion.style.height = `${descripcion.scrollHeight}px`;

              // Cambiar el ícono de "más" a "menos"
              icono.classList.replace("fa-plus", "fa-minus");

              // Obtener el primer padre con la clase .sub-accordion
              const padre = accordionItem.closest(".sub-accordion");

              // Verificar si el padre existe
              if (padre) {
                // Establecer el margen inferior del padre
                padre.style.marginBottom = `${descripcion.scrollHeight}px`;

                // Obtener la subcategoría del padre y ajustar su altura
                const subCategoriaPadre = accordionItem.closest(".description");
                subCategoriaPadre.style.height =
                  (parseInt(descripcion.style.height) + parseInt(subCategoriaPadre.scrollHeight)).toString() + "px";
              }
            } else {
              // Realizar acciones correspondientes si se cierra el elemento
              const padre = accordionItem.closest(".sub-accordion");
              const subCategoriaPadre = accordionItem.closest(".description");
              const alturaDescripcionAuxiliar = descripcion.style.height;

              // Establecer la altura de la descripción a cero para cerrarla
              descripcion.style.height = "0px";

              // Cambiar el ícono de "menos" a "más"
              icono.classList.replace("fa-minus", "fa-plus");

              // Verificar si existe un padre
              padre
                ? ((padre.style.marginBottom = "0px"),
                  // Ajustar la altura de la subcategoría del padre
                  (subCategoriaPadre.style.height =
                    parseInt(subCategoriaPadre.scrollHeight) - parseInt(alturaDescripcionAuxiliar).toString() + "px"))
                : null;
            }
          } else {
            // Realizar acciones correspondientes si el elemento no es el mismo que el clicado
            if (esSubAccordion && accordionItem.classList.contains("sub-accordion")) {
              // Si es un sub-accordion y no pertenece al mismo .accordion principal, cerrarlo
              if (!accordionItem.closest(".accordion").contains(item)) {
                accordionItem.classList.remove("open");
                descripcion.style.height = "0px";
                icono.classList.replace("fa-minus", "fa-plus");
              }
            } else if (!esSubAccordion && !accordionItem.classList.contains("sub-accordion")) {
              // Si es un accordion principal, cerrarlo solo si no es el mismo accordion
              if (!accordionItem.contains(item)) {
                accordionItem.classList.remove("open");
                descripcion.style.height = "0px";
                icono.classList.replace("fa-minus", "fa-plus");
              }
            }
          }
        });
      }
    });
  });
}
