# Tipificador con menú tipo acordíón capaz de intercambiar entre hojas de excel

Tipificador tipo 3

## Actualizaciones

### 30/01/2024 -> [v1.0]

#### Cambios Realizados

- Despliegue inicial del aplicativo funcionando.

### 30/01/2024 -> [v0.13]

#### Cambios Realizados

- El algoritmo de búsqueda es retocado para que funcione correctamente y con las mejores prácticas posibles.
- Se ajustan algunos colores para los títulos y los tags `<strong>`
- Se crean dos nuevos banners para cada color según la macrocategoría a la que pertenezca
- Se ajustan algunos títulos.
- Se optimizan las imagenes de los banners.
- Se proporcionaron comentarios adicionales para facilitar la comprensión del código.

### 30/01/2024 -> [v0.11]

#### Cambios Realizados

- Se hacen avances en el algoritmo de búsqueda para que funcione adecuadamente para las
  microcategorías, por lo que podemos hacer que se está realizando una búsqueda pero debe
  haber un problema de lógica con la función de (`anySubcategoryMatches`), ya que a través
  de consola se verifica que sí se está realizando la búsqueda, pero por alguna razón,
  si una microcategoría coincide con la búsqueda pero la otra no, a las dos se les asigna
  el "`display: block`".

- Se proporcionaron comentarios adicionales para facilitar la comprensión del código.

#### Cambios Restantes

- **Problema Pendiente:**
  - Hace falta proporcionar una solución para que el algoritmo de búsqueda funcione también para las microcategorías. En la actualidad, el algoritmo ya es capaz de buscar a través de estas y de sus elementos particulares, pero hay un problema con la forma en la que el
    programa determina si se muestra o no este elemento.

### 30/01/2024 -> [v0.10]

#### Cambios Realizados

- Se encuentran errores durante la búsqueda de los elementos. Por tal motivo, las búsquedas de
  subcategorías sin microcategorías funcionan sin problema, pero cuando hay microcategorías, no
  funcionan como se espera.

- Se proporcionaron comentarios adicionales para facilitar la comprensión del código.

#### Cambios Restantes

- **Problema Pendiente:**
  - Hace falta proporcionar una solución para que el algoritmo de búsqueda funcione también para las microcategorías. En la actualidad, el algoritmo no es capaz de buscar a través de estas ni de sus elementos particulares.
#   t i p i f i c a d o r - d e s p l e g a b l e  
 