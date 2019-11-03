import { Injectable } from "@angular/core";
import * as app from "tns-core-modules/application";
import { Mediafilepicker, ImagePickerOptions, VideoPickerOptions, AudioPickerOptions, FilePickerOptions } from "nativescript-mediafilepicker";
@Injectable({
  providedIn: "root"
})
export class MediafilepickerService {

constructor() { }

openCustomFilesPicker() {
    let extensions = [];

    if (app.ios) {
        extensions = [kUTTypePDF, kUTTypeText]; // you can get more types from here: https://developer.apple.com/documentation/mobilecoreservices/uttype
    } else {
        extensions = ["*"];
    }

    const options: FilePickerOptions = {
        android: {
            extensions,
            maxNumberFiles: 10
        },
        ios: {
            extensions,
            multipleSelection: true
        }
    };

    const mediafilepicker = new Mediafilepicker();
    mediafilepicker.openFilePicker(options);

    mediafilepicker.on("getFiles", (res) =>  {

        const results = res.object.get("results");
        console.dir(results);

        if (results) {
            results.forEach((result) => {
                console.log(result.file);
            });
            // for (let i = 0; i < results.length; i++) {

            //     const result = results[i];
            //     console.log(result.file);

            // }
        }

    });

    mediafilepicker.on("error", (res) => {
        const msg = res.object.get("msg");
        console.log(msg);
    });

    mediafilepicker.on("cancel", (res) => {
        const msg = res.object.get("msg");
        console.log(msg);
    });
}

}
