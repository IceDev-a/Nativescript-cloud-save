// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app/app.module";

// TypeORM
import { createConnection, getManager } from "typeorm/browser";

import { Connection } from "typeorm";
import UserApplication from "./app/shared/infrastructures/entities/application.entity";
import SaveFile from "./app/shared/infrastructures/entities/savefile.entity";
// Driver
const driver = require("nativescript-sqlite");
(async () => {
    try {
        const connection = await createConnection({
            database: "user_data.db",
            type: "nativescript",
            driver,
            entities: [
                UserApplication,
                SaveFile
            ],
            logging: true
        });
        // let userA: UserApplicationDatabaseService;
        // const connection = await userA.connection;

        console.log("Connection Created");

        // setting true will drop tables and recreate
        await connection.synchronize(false);

        console.log("Synchronized");

    } catch (err) {
        console.error(err);
    }
})();
platformNativeScriptDynamic().bootstrapModule(AppModule);
