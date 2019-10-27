import { Injectable } from "@angular/core";
import * as app from "tns-core-modules/application";
import { Package } from "../../../shared/models/applications/package.model";
import { ImageSource, fromFile, fromResource, fromBase64, fromNativeSource } from "tns-core-modules/image-source";
import UserApplication from "~/app/shared/infrastructures/entities/application.entity";

@Injectable({
  providedIn: "root"
})
export class UserApplicationService {

constructor() { }

getPackages(systemPackage: boolean) {
    const pm = app.android.context.getPackageManager();
    const packages: Array<Package> = this.getInstalledApps(systemPackage);
    packages.forEach((pk) => {
        console.log(pk);
    });
}

getInstalledApps(systemPackage: boolean): Array<Package> {
    const res: Array<Package> = new Array<Package>();
    const pm = app.android.context.getPackageManager();
    const packs: java.util.List<android.content.pm.PackageInfo> = pm.getInstalledPackages(0);
    for (let i = 0; i < packs.size(); i++) {
        const p: android.content.pm.PackageInfo = packs.get(i);
        if ((!systemPackage) && (this.isSystemPackage(p))) {
            continue ;
        }
        const newInfo: Package = new Package();
        newInfo.appname = p.applicationInfo.loadLabel(pm);
        newInfo.pname = p.packageName;
        newInfo.versionName = p.versionName;
        newInfo.versionCode = p.versionCode;
        const drawableIcon: android.graphics.drawable.Drawable = p.applicationInfo.loadIcon(pm);
        const icon: android.graphics.Bitmap = (drawableIcon as android.graphics.drawable.BitmapDrawable).getBitmap();
        const imgFromResources: ImageSource = <ImageSource> fromNativeSource(icon);
        newInfo.icon = imgFromResources;
        res.push(newInfo);
    }

    return res;
}

isSystemPackage(packageInfo: android.content.pm.PackageInfo): boolean {
    return ((packageInfo.applicationInfo.flags & android.content.pm.ApplicationInfo.FLAG_SYSTEM) !== 0);
}

addApplication(p: Package) {
    const application = new UserApplication();
    application.name = p.appname;
    application.systemName = p.pname;
    application.save();
}
}
