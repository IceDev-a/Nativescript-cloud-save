import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { MediafilepickerService } from "../shared/services/mediafilepicker.service";
import { FileSystemService } from "../natives/androids/services/fileSystem.service";

@Component({
    selector: "Search",
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {

    constructor(private mediaFilePickerService: MediafilepickerService ,
                private androidFileSystemService: FileSystemService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    openCustomFilesPicker() {
        this.mediaFilePickerService.openCustomFilesPicker();
    }

    openFileManager() {
        this.androidFileSystemService.openFile();
    }
}
