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

    async getAllData(collection: string) {
        await this.sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range: collection,
        }).then((response) => response.data.values)
        .catch((error) => error);
    }
}

export default Driver;