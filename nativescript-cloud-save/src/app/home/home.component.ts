import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/ui/page/page";
import { Observable } from "rxjs/internal/Observable";
import { Page, NavigatedData } from "tns-core-modules/ui/page";
let vm;
declare var android: any;

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        console.info(android.os.Build.VERSION.SDK_INT);
        this.checkBatteryLife();
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
    onUnloaded() {
        if (isAndroid) {
            // >> broadcast-receiver-remove-ts
            applicationModule.android.unregisterBroadcastReceiver(android.content.Intent.ACTION_BATTERY_CHANGED);
            // << broadcast-receiver-remove-ts
        }
}
}
