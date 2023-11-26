import Driver from "../driver";
import sheetParser from "../utilities/sheetParser";


const findAll = async (driver: Driver, collectionName: string, error: any) => {
  return new Promise((resolve, reject) => {
    if(error) return reject(error);
    driver.getAllData(collectionName).then((response) => {
      const parsedData = sheetParser(response as any[][]);
      resolve(parsedData);
    }).catch(error => reject(error));
  })
}

export default findAll;