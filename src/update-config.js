const fs = require('fs');
const path = require('path');

// Ruta al directorio public donde están las carpetas de los proyectos
const publicDir = path.join(__dirname, '../public');

// Patrón para identificar carpetas de proyectos
const folderPattern = /^av_firialta_mx_2025_(\d+)$/;

// Definir la estructura de navegación del encabezado
const navigationHeaderBase = [
   {
      "name": "Albuminuria",
      "goToSlide": "02",
      "active": false
   },
   {
      "name": "Mecanismo de la Enfermedad Cardio Renal",
      "goToSlide": "03",
      "active": false
   },
   {
      "name": "Diseño y Población de los Estudios",
      "goToSlide": "04",
      "active": false
   },
   {
      "name": "Eficacia",
      "goToSlide": "05",
      "active": false
   },
   {
      "name": "Recomendaciones en Guías",
      "goToSlide": "08",
      "active": false
   },
   {
      "name": "Estudio CONFIDENCE",
      "goToSlide": "15",
      "active": false
   },
   {
      "name": "Seguridad",
      "goToSlide": "09",
      "active": false
   },
   {
      "name": "Dosificación",
      "goToSlide": "11",
      "active": false
   }
   // ,
   // {
   //    "name": "Índice",
   //    "goToSlide": "09",
   //    "active": false
   // }
];

// Definir la estructura de navegación del pie de página
const navigationFooterBase = [
   {
      "name": "Menú",
      "goToSlide": "fn_menu",
      "active": false
   },
   {
      "name": "IPP",
      "goToSlide": "fn_link('https://www.docuniverse.mx/contenidos/44acdfaf-8a4f-4d9c-8f5a-30e1311408df.', '_blank')",
      "active": false
   },
   {
      "name": "Características del Producto",
      "goToSlide": "12",
      "active": false
   },
   {
      "name": "Evidencia en Vida Real",
      "goToSlide": "13",
      "active": false
   },
   {
      "name": "Referencias",
      "goToSlide": "fn_referencias",
      "active": false
   },
   {
      "name": "Perfiles de Pacientes",
      "goToSlide": "14",
      "active": false
   }
];

// Definir la estructura del menú completo
const navigationMenuBase = [
   {
      "name": "Página de inicio",
      "goToSlide": "01",
      "active": false
   },
   {
      "name": "Albuminuria",
      "goToSlide": "02",
      "active": false
   },
   {
      "name": "Mecanismo de la Enfermedad Cardio Renal",
      "goToSlide": "03",
      "active": false
   },
   {
      "name": "Diseño y Población de los Estudios",
      "goToSlide": "04",
      "active": false
   },
   {
      "name": "Eficacia",
      "goToSlide": "05",
      "active": false
   },
   {
      "name": "Criterio de valoración primario CV del estudio FIGARO-DKD",
      "goToSlide": "05",
      "active": false
   },
   {
      "name": "Criterio de valoración primario renal del estudio FIDELIO-DKD",
      "goToSlide": "06",
      "active": false
   },
   {
      "name": "Criterios de valoración exploratorios de los estudios FIGARO-DKD y FIDELIODKD",
      "goToSlide": "07",
      "active": false
   },
   {
      "name": "Recomendaciones en Guías",
      "goToSlide": "08",
      "active": false
   },
   {
      "name": "Seguridad",
      "goToSlide": "09",
      "active": false
   },
   {
      "name": "Dosificación",
      "goToSlide": "11",
      "active": false
   },
   {
      "name": "Perfiles de Pacientes",
      "goToSlide": "14",
      "active": false
   }
];

// Definir la configuración especial para el slide 13
const navigationSlide13 = [
   {
      "name": "Diseño del Estudio",
      "goToSlide": "fn_estudio",
      "carusel": 1,
      "active": true
   },
   {
      "name": "Medicamentos Concomitantes Iniciales",
      "goToSlide": "fn_medicamentos",
      "carusel": 0,
      "active": false
   },
   {
      "name": "Reducción de la RACU",
      "goToSlide": "fn_reduccion",
      "carusel": 2,
      "active": false
   },
   {
      "name": "Seguridad",
      "goToSlide": "fn_seguridad",
      "carusel": 0,
      "active": false
   }
];

// Función para verificar si un goToSlide corresponde a un número de slide
function isNumericSlide(goToSlide) {
   return /^\d+$/.test(goToSlide);
}

// Función para determinar el valor de pop según el número de slide
function getPopValue(slideNumber) {
   // Convertir slideNumber a número entero para hacer comparaciones
   const slideNum = parseInt(slideNumber, 10);
   // Asignar diferentes valores de pop dependiendo del número de slide
   // Aquí puedes personalizar la lógica según tus necesidades
   switch (slideNum) {
      case 2:
         return 2;
         break;

      case 3:
         return 2;
         break;

      case 4:
         return 4;
         break;

      case 5:
         return 3;
         break;

      case 6:
         return 3;
         break;

      case 7:
         return 3;
         break;

      case 8:
         return 2;
         break;

      case 9:
         return 2;
         break;

      case 10:
         return 2;
         break;

      case 11:
         return 2;
         break;

      case 13:
         return 1;
         break;

      case 14:
         return 5;
         break;

      case 15:
         return 1;
         break;

      default:
         return 0;
         break;
   }
}

// Función principal
async function updateConfigFiles() {
   try {
      // Leer el directorio public
      const folders = fs.readdirSync(publicDir)
         .filter(folder => folderPattern.test(folder))
         .sort();

      console.log(`Encontradas ${folders.length} carpetas de proyectos.`);

      if (folders.length === 0) {
         console.log('No se encontraron carpetas que coincidan con el patrón.');
         return;
      }

      // Procesar cada carpeta
      for (const folder of folders) {
         const match = folder.match(folderPattern);
         const slideNumber = match[1].padStart(2, '0'); // Asegurar formato de dos dígitos (01, 02, etc.)

         // Ruta al archivo config.json
         const configPath = path.join(publicDir, folder, 'js', 'config.json');

         // Verificar si existe la carpeta js
         const jsDir = path.join(publicDir, folder, 'js');
         if (!fs.existsSync(jsDir)) {
            console.log(`La carpeta js no existe en ${folder}. Creándola...`);
            fs.mkdirSync(jsDir, { recursive: true });
         }

         // Crear copia de la navegación de encabezado y actualizar el estado activo
         const navigationHeader = JSON.parse(JSON.stringify(navigationHeaderBase));
         navigationHeader.forEach(item => {
            item.active = (item.goToSlide === slideNumber);
         });

         // Crear copia de la navegación de pie de página y actualizar el estado activo
         const navigationFooter = JSON.parse(JSON.stringify(navigationFooterBase));
         navigationFooter.forEach(item => {
            // Solo actualizar active si goToSlide es un número (no una función)
            if (isNumericSlide(item.goToSlide)) {
               item.active = (item.goToSlide === slideNumber);
            }
         });

         // Crear copia del menú completo y actualizar el estado activo
         const navigationMenu = JSON.parse(JSON.stringify(navigationMenuBase));
         navigationMenu.forEach(item => {
            item.active = (item.goToSlide === slideNumber);
         });

         // Determinar el valor de pop basado en el número de slide
         const carruselValue = getPopValue(slideNumber);

         // Crear o actualizar el objeto de configuración
         const config = {
            zipName: "av_firialta_mx_2025_",
            presentationCode: "00012400",
            slide: slideNumber,
            carusel: carruselValue,
            navigationHeader: navigationHeader,
            navigationFooter: navigationFooter,
            navigationMenu: navigationMenu
         };

         // Añadir la configuración especial para el slide 13
         if (slideNumber === "13") {
            config.navigationslide13 = navigationSlide13;
            console.log(`Añadida configuración especial para el slide 13`);
         }

         // Escribir el archivo config.json
         fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
         console.log(`Actualizado config.json para ${folder} (slide: ${slideNumber}, Carrusel: ${carruselValue})`);
      }

      console.log('Proceso completado con éxito.');
   } catch (error) {
      console.error('Error al procesar las carpetas:', error);
   }
}

// Ejecutar la función principal
updateConfigFiles();

// desde la terminal
// cd src
// node update-config.js