import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {MenuItemData} from "@solenopsys/ui-navigate";


@Component({
    selector: "ui-top-panel",
    templateUrl: "./top-panel.component.html",
    styleUrls: ["./top-panel.component.scss"],
    encapsulation: ViewEncapsulation.Emulated
})
export class TopPanelComponent {
    menu: MenuItemData[] = [
        {
            name: "Documentation", link: "docs"
        },
        {
            name: "Community", link: "community"
        },
        {
            name: "Ecosystem", link: "ecosystem"
        }
    ];
}
