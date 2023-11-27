import { google, sheets_v4 } from "googleapis";
import { GoogleAuthCredentials } from "./SheetFlex";

class Driver {
  sheets: sheets_v4.Sheets;
  spreadsheetId: string;

  constructor(auth: GoogleAuthCredentials, spreadsheetId: string) {
    const client = new google.auth.GoogleAuth({
      credentials: {
        client_email: auth.clientEmail,
        private_key: auth.privateKey,
        project_id: auth.projectId,
      },
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    this.sheets = google.sheets({ version: "v4", auth: client });
    this.spreadsheetId = spreadsheetId;
  }

  getAllData(sheetName: string) {
    return new Promise(async (resolve, reject) => {
      await this.sheets.spreadsheets.values
        .get({
          spreadsheetId: this.spreadsheetId,
          range: sheetName,
        })
        .then((response) => resolve(response.data.values))
        .catch((error) => reject(error));
    });
  }

  async isSheetExist(sheetName: string): Promise<boolean> {
    const response = await this.sheets.spreadsheets.get({ spreadsheetId: this.spreadsheetId });
    const sheetsList = response.data.sheets || [];
    const sheetExists = sheetsList.some((sheet) => sheet.properties.title === sheetName);
    if (sheetExists) return true;
    else false;
  }

  async createSheet(sheetName: string): Promise<void | boolean> {
    const request: sheets_v4.Params$Resource$Spreadsheets$Batchupdate = {
      spreadsheetId: this.spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: sheetName,
              },
            },
          },
        ],
      },
    };
    this.sheets.spreadsheets
      .batchUpdate(request)
      .then(() => true)
      .catch((error) => error);
  }

  appendRow(sheetName: string, values: string[]) {
    return new Promise((resolve, reject) => {
      this.sheets.spreadsheets.values
        .append({
          spreadsheetId: this.spreadsheetId,
          range: sheetName,
          valueInputOption: "RAW",
          requestBody: {
            values: [values],
          },
        })
        .then((response) => {
          resolve(response.data.updates.updatedRange);
        })
        .catch((error) => error);
    });
  }
}

export default Driver;
