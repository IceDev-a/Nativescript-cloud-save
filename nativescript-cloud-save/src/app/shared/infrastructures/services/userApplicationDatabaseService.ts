import { UserApplications } from "../repositories/applications";
import { Injectable } from "@angular/core";
import { Connection, ConnectionOptions, createConnection } from "typeorm";
import UserApplication from "../entities/application.entity";
const driver = require("nativescript-sqlite");

@Injectable({
    providedIn: "root"
})
export class UserApplicationDatabaseService {

    connection: Promise<Connection>;
    private readonly options: ConnectionOptions;

    constructor() {
        UserApplications.initialize();
        this.options = {
            type: "nativescript",
            driver,
            database: UserApplications.dbPath,
            entities: [UserApplication],
            synchronize: false,
            logging: "all"
        };

        this.connection = createConnection(this.options);
    }
}
