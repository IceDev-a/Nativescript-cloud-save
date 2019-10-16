import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/ui/page/page";
import { Observable } from "rxjs/internal/Observable";
import { Page, NavigatedData } from "tns-core-modules/ui/page";
import * as applicationModule from "tns-core-modules/application";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
let vm;

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    myObservableArray;
    myArray = [];
    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        console.info(android.os.Build.VERSION.SDK_INT);
        this.checkBatteryLife();
        this.checkInstalledApp();
    }

    onNavigatingTo(args: NavigatedData) {
        const page = <Page>args.object;
        page.actionBar.title = "";
        vm = new Observable();
        vm.set("info", "Using Android Broadcast Receiver \nto check the battery life");
        vm.set("batteryLife", "0");
        vm.set("isAndroid", isAndroid);
        page.bindingContext = vm;
        page.actionBar.title = args.context.title;
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    checkBatteryLife(): void {

        // >> app-class-properties
        // import { android as androidApp } from "tns-core-modules/application";
        const isPaused = app.android.paused; // e.g. false
        const packageName = app.android.packageName; // The package ID e.g. org.nativescript.nativescriptsdkexamplesng
        const nativeApp = app.android.nativeApp; // The native APplication reference
        const foregroundActivity = app.android.foregroundActivity; // The current Activity reference
        const context = app.android.packageName; // The current Android context
        // << app-class-properties

        // >> broadcast-receiver-ts
        if (isAndroid) {
            // use tns-platform-dclarations to access native APIs (e.g. android.content.Intent)
            const receiverCallback = (androidContext, intent) => {
                const level = intent.getIntExtra(android.os.BatteryManager.EXTRA_LEVEL, -1);
                const scale = intent.getIntExtra(android.os.BatteryManager.EXTRA_SCALE, -1);
                const percent = (level / scale) * 100.0;
                // console.log(percent);
            };

            applicationModule.android.registerBroadcastReceiver(
                android.content.Intent.ACTION_BATTERY_CHANGED,
                receiverCallback
            );
        }
        // << broadcast-receiver-ts
    }

    checkInstalledApp(): void {
        const mainIntent = new android.content.Intent(android.content.Intent.ACTION_MAIN, null);
        mainIntent.addCategory(android.content.Intent.CATEGORY_LAUNCHER);
        // tslint:disable-next-line: max-line-length
        const pkgAppsList: java.util.List<android.content.pm.ResolveInfo> = app.android.context.getPackageManager().queryIntentActivities(mainIntent, 0);
        // tslint:disable-next-line:max-line-length
        const pkgAppsList5: Array<android.content.pm.ResolveInfo> = app.android.context.getPackageManager().queryIntentActivities(mainIntent, 0);
        const count: number = pkgAppsList.size();
        // console.log(pkgAppsList);
        // console.log(pkgAppsList2);
        // console.log(pkgAppsList2.length);

        for (let i = 0; i < count; i++) {
            const name = pkgAppsList.get(i).loadLabel(app.android.context.getPackageManager());
            console.log(name);
            this.myArray.push(name);
        }
        console.log(this.myArray);
        console.log(pkgAppsList.get(1));
        const firstApp: android.content.pm.ResolveInfo = pkgAppsList.get(1);
        const firstAppName = firstApp.loadLabel(app.android.context.getPackageManager());
        const myObservableArray2 = new ObservableArray(pkgAppsList);
        console.log(myObservableArray2);
        // console.log(pkgAppsList);
        // pkgAppsList.ResolveInfo.forEach((element) => {
        //     console.log(element);
        // });
        const PackageManager = android.content.pm.PackageManager;
        const pkgAppsList2: Array<any> = app.android.context.getPackageManager().getInstalledApplications(PackageManager.GET_META_DATA);
        console.log(pkgAppsList2);
        this.myObservableArray = new ObservableArray(pkgAppsList2);
        let i = 0;
        this.myObservableArray.forEach((element) => {
            i = i + 1;
            console.log(element);
            console.log(i);
        });

    }
    onUnloaded() {
        if (isAndroid) {
            // >> broadcast-receiver-remove-ts
            applicationModule.android.unregisterBroadcastReceiver(android.content.Intent.ACTION_BATTERY_CHANGED);
            // << broadcast-receiver-remove-ts
        }
}
}
