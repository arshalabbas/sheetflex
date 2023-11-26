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

    getAllData(collection: string) {
        return new Promise(async (resolve, reject) => {
            await this.sheets.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: collection,
            }).then((response) => resolve(response.data.values))
            .catch(error => reject(error));
        })
    }

    async isSheetExist(collection: string): Promise<boolean> {
        const response = await this.sheets.spreadsheets.get({ spreadsheetId: this.spreadsheetId});
        const sheetsList = response.data.sheets || [];
        const sheetExists = sheetsList.some(sheet => sheet.properties.title === collection);
        if (sheetExists) return true;
        else false;
    }
}

export default Driver;