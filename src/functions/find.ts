import Driver from "../driver";
import sheetParser from "../utilities/sheetParser";

const _find = (driver: Driver, collectionName: string, error: any, predicate /* TODO: predicate type needs to fixed */) => {
  return new Promise((resolve, reject) => {
    if(error) return reject(error);
    driver.getAllData(collectionName)
    .then(response => {
      const parsedData = sheetParser(response as any[][]);
      const filteredData = parsedData.filter(predicate);
      resolve(filteredData);
    }).catch((error) => reject(error));
  })
}

export default _find;