import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { UserApplicationDatabaseService } from "../shared/infrastructures/services/userApplicationDatabaseService";
import UserApplication from "../shared/infrastructures/entities/application.entity";

@Component({
    selector: "Browse",
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {

    applications: Array<UserApplication> = [];
    constructor() {
        // Use the component constructor to inject providers.
        this.getApplications();
        this.addApplication();
    }

    getApplications() {
        UserApplication.find().then((todos) => {
            console.log(todos);
        }).catch(console.error);
    }

    addApplication() {
        const application = new UserApplication();

        application.name = "TestName";
        application.systemName = "TestSystemName";

        application.save().then(() => this.getApplications())
            .catch(console.error);
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
