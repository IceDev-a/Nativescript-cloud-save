// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app/app.module";

import UserApplication from "./app/shared/infrastructures/entities/application.entity";
import SaveFile from "./app/shared/infrastructures/entities/savefile.entity";
import { configureOAuthProviders } from "./app/shared/helpers/authentication-provider.helper";
// TypeORM
import { createConnection, getManager } from "typeorm/browser";

// Sqlite

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

// OAuth2
configureOAuthProviders();
platformNativeScriptDynamic().bootstrapModule(AppModule);
