import { readFileSync, writeFileSync } from "fs";
import { DOMParser, XMLSerializer } from "xmldom";

// Sempre trocar o nome do talhão por "plotname" e o nome da fazenda por "farmname" no código abaixo;
// Quando adicionar um arquivo .kml trocar o nome do arquivo na linha 103 e o nome do arquivo de saída na linha 104;
//Baixar as dependencias com o comando "npm i","npm i xmldom" e "npm i fs"

/**
 * @param {string} filePath 
 * @returns {Object} 
 */
 
function processAndFixKML(filePath, outputFilePath) {
  try {
    const kmlContent = readFileSync(filePath, "utf-8");
    const parser = new DOMParser();
    const serializer = new XMLSerializer();
    const xmlDoc = parser.parseFromString(kmlContent, "text/xml");
    const placemarks = xmlDoc.getElementsByTagName("Placemark");
    const farms = {};
    const duplicates = {};
    let totalDuplicates = 0;

    for (let i = 0; i < placemarks.length; i++) {
      const placemark = placemarks[i];

      const farmnameElement = Array.from(placemark.getElementsByTagName("SimpleData"))
        .find(el => el.getAttribute("name") === "farmname");
      const plotnameElement = Array.from(placemark.getElementsByTagName("SimpleData"))
        .find(el => el.getAttribute("name") === "plotname");

      const farmname = farmnameElement ? farmnameElement.textContent.trim() : null;
      const plotname = plotnameElement ? plotnameElement.textContent.trim() : null;

      if (!farmname || !plotname) continue;

      if (!farms[farmname]) {
        farms[farmname] = [];
      }
      farms[farmname].push({ plotname, placemark });
    }

    for (const farmname in farms) {
      const plots = farms[farmname];
      const plotCounts = {};
      const duplicateEntries = [];
      const modifiedNames = {};

      plots.forEach(({ plotname }) => {
        plotCounts[plotname] = (plotCounts[plotname] || 0) + 1;
      });

      const nameTracker = {};
      plots.forEach(({ plotname, placemark }) => {
        if (plotCounts[plotname] > 1) {
          if (!nameTracker[plotname]) {
            nameTracker[plotname] = 1;
          } else {
            nameTracker[plotname]++;
          }
          const newPlotName = `${plotname} - ${nameTracker[plotname]}`;

          const plotnameElement = Array.from(placemark.getElementsByTagName("SimpleData"))
            .find(el => el.getAttribute("name") === "plotname");
          if (plotnameElement) {
            plotnameElement.textContent = newPlotName;
          }

          if (!modifiedNames[plotname]) {
            modifiedNames[plotname] = [];
          }
          modifiedNames[plotname].push(newPlotName);
        }
      });

      for (const plotname in plotCounts) {
        if (plotCounts[plotname] > 1) {
          duplicateEntries.push({
            name: plotname,
            count: plotCounts[plotname],
            corrected: modifiedNames[plotname] || []
          });
          totalDuplicates++;
        }
      }

      if (duplicateEntries.length > 0) {
        duplicates[farmname] = duplicateEntries;
      }
    }
    const correctedKML = serializer.serializeToString(xmlDoc);
    writeFileSync(outputFilePath, correctedKML, "utf-8");

    console.log(`Total de talhões com nomes repetidos corrigidos: ${totalDuplicates}`);
    console.log("Talhões duplicados por fazenda:", JSON.stringify(duplicates, null, 2));

    return duplicates;
  } catch (error) {
    console.error("Erro ao processar o arquivo KML:", error.message);
    return {};
  }
}

const filePath = "exemplo.kml";
const outputFilePath = "./output/exemplo.kml";
const duplicates = processAndFixKML(filePath, outputFilePath);