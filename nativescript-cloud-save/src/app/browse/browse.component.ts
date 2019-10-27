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
    }

    getApplications() {
        UserApplication.find().then((apps) => {
            this.applications = apps;
        }).catch(console.error);
    }

    removeApplication(userApp: UserApplication) {
        UserApplication.remove(userApp).then((apps) => {
            alert("remove " + userApp.name);
            this.getApplications();
        }).catch(console.error);
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
