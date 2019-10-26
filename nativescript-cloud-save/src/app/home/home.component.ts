import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { UserApplicationService } from "../natives/androids/services/userApplication.service";
import { Package } from "../shared/models/applications/package.model";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    installedApps: Array<Package> = new Array<Package>();
    constructor(private userApplicationService: UserApplicationService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.installedApps = this.userApplicationService.getInstalledApps(false);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    getInstalledApplications(): void {
        const mainIntent = new android.content.Intent(android.content.Intent.ACTION_MAIN, null);
        mainIntent.addCategory(android.content.Intent.CATEGORY_LAUNCHER);
        // tslint:disable-next-line: max-line-length
        const pkgAppsList: java.util.List<android.content.pm.ResolveInfo> = app.android.context.getPackageManager().queryIntentActivities(mainIntent, 0);
        // tslint:disable-next-line:max-line-length
        const count: number = pkgAppsList.size();
        for (let i = 0; i < count; i++) {
            const name = pkgAppsList.get(i).loadLabel(app.android.context.getPackageManager());
            this.installedApps.push(name);
        }
    }
}
