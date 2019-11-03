import { Injectable } from "@angular/core";
import * as app from "tns-core-modules/application";

const Intent = android.content.Intent;
const MediaStore = android.provider.MediaStore;
const Environment = android.os.Environment;
const File = java.io.File;
const ContentValues = android.content.ContentValues;
const Uri = android.net.Uri;
const PICKFILE_RESULT_CODE = 8778;

@Injectable({
  providedIn: "root"
})
export class FileSystemService {

constructor() { }

openFile() {
    const intent = new Intent(Intent.ACTION_GET_CONTENT);
    intent.setType("*/*");
    app.android.foregroundActivity.startActivityForResult(intent, PICKFILE_RESULT_CODE);
    app.android.on(app.AndroidApplication.activityResultEvent, onResult);
    function onResult(args) {
        app.android.off(app.AndroidApplication.activityResultEvent, onResult);
        // console.dir(args);
        // console.dir(args.intent);
        const intent: android.content.Intent = args.intent;
        alert(intent.getDataString());
        // this.handleResults(args.requestCode, args.resultCode, args.intent);

    }
}

handleResults(requestCode, resultCode, intent) {
    console.dir(requestCode);
    console.dir(resultCode);
    console.dir(intent);
}

}
