import {Component, ElementRef, Inject} from "@angular/core";
import {ColorSchemesService} from "@solenopsys/ui-themes";

@Component({
    selector: "ui-register-template",
    templateUrl: "./register-template.component.html",
    styleUrls: ["./register-template.component.scss"],
})
export class RegisterTemplateComponent {
    constructor(@Inject('logo') public logo: string, private cs: ColorSchemesService, private elementRef: ElementRef) {
        cs.initColors(this.elementRef.nativeElement.style);

        console.log("LOGO", this.logo)
    }
}
