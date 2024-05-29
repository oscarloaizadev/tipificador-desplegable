async function handleFileChange(sheetPageNumber) {
  const filePath = "./data.xlsx";
  const reader = new FileReader();

  if (sheetPageNumber === undefined) {
    sheetPageNumber = 0;
  }

  reader.onload = function (e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[sheetPageNumber];
      const sheet = workbook.Sheets[firstSheetName];
      const jsonData = convertWorkbookToJSON(sheet);
      // Ahora, puedes cargar el JSON directamente en la interfaz
      loadAccordionFromJSON(jsonData);
    } catch (error) {
      alert(
        "Error al cargar la base de datos, por favor contacta con la persona encargada del sistema para buscar una solución: " +
          error
      );
      console.log("Error al cargar la base de datos:", error);
    }
  };

  try {
    const response = await fetch(filePath);
    const blob = await response.blob();
    reader.readAsArrayBuffer(blob);
  } catch (error) {
    console.error("Error fetching file:", error);
  }
}

function convertWorkbookToJSON(workbook) {
  const jsonData = {};

  // Convertir la hoja de cálculo a JSON
  const sheetData = XLSX.utils.sheet_to_json(workbook);

  sheetData.forEach(function (row) {
    const macroCategory = processCellValue(row["Macrocategoría"]);
    const subCategory = processCellValue(row["Subcategoría"]);
    const microCategory = processCellValue(row["Micro-categoría."]);

    // Verificar si todas las columnas clave tienen valores válidos
    if (macroCategory) {
      // Inicializar las claves si no existen en el JSON
      jsonData[macroCategory] = jsonData[macroCategory] || {};

      if (subCategory) {
        jsonData[macroCategory][subCategory] = jsonData[macroCategory][subCategory] || [];

        // Crear el objeto con la información de la fila
        const item = {
          MACROCATEGORIA: macroCategory,
          SUBCATEGORIA: subCategory,
          MICROCATEGORIA: microCategory,
          INFO1: processCellValue(row["Info1"]),
          INFO2: processCellValue(row["Info2"]),
          INFO3: processCellValue(row["Info3"]),
          INFO4: processCellValue(row["Info4"]),
        };

        // Agregar el objeto al array de la subcategoría
        jsonData[macroCategory][subCategory].push(item);
      }
    }
  });
  return jsonData;
}

function getNormalizedCategory(row) {
  const possibleCategoryName = "MACROCATEGORIA";
  const trimmedName = possibleCategoryName.trim().toLowerCase();
  const rowKeys = Object.keys(row);

  for (const key of rowKeys) {
    if (key.trim().toLowerCase() === trimmedName) {
      return row[key].trim();
    }
  }

  console.log("No valid category found in row:", row);
  return null;
}

function processCellValue(value) {
  // Reemplaza los saltos de línea con <br> y las negritas con <strong>
  if (value && typeof value === "string") {
    value = value.replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  }
  return value;
}

function restructureJSONData(jsonData) {
  return { ...jsonData };
  const SIGNED_BY_CREATOR =
    QXBsaWNhdGl2byBjcmVhZG8geSBkZXNhcnJvbGxhZG8gcG9yOiBPc2NhciBFc3RlYmFuIExvYWl6YSBDYWxkZXLDs24uIDsp;
  //Base 64, UTF-8, LF (Unix), https://www.base64encode.org/
}

handleFileChange();
