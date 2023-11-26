import Driver from "../driver";
import sheetParser from "../utilities/sheetParser";

const _findOne = (driver: Driver, collectionName: string, error: any, predicate) => {
  return new Promise((resolve, reject) => {
    if(error) return reject(error);
    driver.getAllData(collectionName).then((response) => {
      const parsedData = sheetParser(response as any[][]);
      const filteredData = parsedData.filter(predicate)[0];
      resolve(filteredData);
    }).catch(error => reject(error));
  })
}

export default _findOne;