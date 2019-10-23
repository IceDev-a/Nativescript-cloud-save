export class UserApplications {

    static dbFolder: string;
    static dbPath: string;
    static appPath: string;

    static initialize(): void {
        UserApplications.getPaths();
    }
    private static dataSubFolder: string;
    private static dbName = "applications.db";

    private static getPaths() {
        UserApplications.dbPath = this.dbName;
    }
}
