import { Collection } from "./classes/";
import Driver from "./Driver";
import { _find, _findAll, _findOne } from "./functions";
export interface GoogleAuthCredentials {
  /**
   * The google cloud console Project ID.
   */
  projectId: string;

  /**
   * The client email associated with the service account.
   */
  clientEmail: string;

  /**
   * The private key associated with the service account.
   */
  privateKey: string;
}

/**
 * Initialise the connection to the google sheets API
 */
export class SheetFlex {
  private projectID: string;
  private clientEmail: string;
  private privateKey: string;
  sheetsID: string;

  private driver: Driver;

  /**
   * Creates a new SheetFlex instance.
   * @param {string} sheetsID - The ID of the spreadsheet.
   * @param {GoogleAuthCredentials} credentials - An object containing authentication details for Google Sheets API.
   * @param {string} credentials.projectId - The Google Cloud Platform project ID.
   * @param {string} credentials.clientEmail - The client email associated with the service account.
   * @param {string} credentials.privateKey - The private key associated with the service account.
   */
  constructor(sheetsID: string, credentials: GoogleAuthCredentials) {
    this.projectID = credentials.projectId;
    this.clientEmail = credentials.clientEmail;
    this.privateKey = credentials.privateKey;
    this.sheetsID = sheetsID;

    this.driver = new Driver(credentials, sheetsID);
  }

  async createCollection(collectionObject: Collection) {
    const exists = await this.driver.isSheetExist(collectionObject.collectionName);
    if (exists) return;

    const fields = collectionObject.fields;
    const options = collectionObject.options;

    // TODO
    // ---
    // ---

    this.driver.createSheet(collectionObject.collectionName);
    let fieldNames = collectionObject.fields.map((field) => field.name);

    if (options.timestamp) fieldNames.unshift("timestamp");
    if (options.autoGenerateId) fieldNames.unshift("ID");
    this.driver.appendRow(collectionObject.collectionName, fieldNames);
  }

  /**
   *
   * @param collectionName - the collection name to work on.
   * @returns
   */
  async collection(collectionName: string) {
    let error: any;
    const sheetExistance: boolean = await this.driver.isSheetExist(collectionName);
    if (!sheetExistance)
      error = {
        message: `The collection with the name ${collectionName} does not exist or something went wrong`,
      };
    return {
      /**
       *
       * @returns all the data in the collection.
       */
      findAll: () => _findAll(this.driver, collectionName, error),

      /**
       *
       * @param predicate - predicate function to filter the data.
       * @returns all the data that matches the predicate.
       */
      find: (predicate) => _find(this.driver, collectionName, error, predicate),

      /**
       *
       * @param predicate - predicate function to filter the data.
       * @returns the one data that matches the predicate.
       */
      findOne: (predicate) => _findOne(this.driver, collectionName, error, predicate),
    };
  }
}
