import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TablePageComponent} from "./table-page/table-page.component";
import {FormPanelComponent} from "./panels/form-panel/form-panel.component";
import {ListPanelComponent} from "./panels/list-panel/list-panel.component";
import {InfoPanelComponent} from "./panels/info-panel/info-panel.component";
import {RouterModule} from "@angular/router";
import {UIFormsModule} from "@solenopsys/uimatrix-forms";
import {UIIconsModule} from "@solenopsys/uimatrix-icons";
import {UIListsModule} from "@solenopsys/uimatrix-lists";
import {BaseTemplateComponent} from "./base-template/base-template.component";

import {BootstrapComponent} from "./bootstrap/bootstrap.component";

import {DeclaredService} from "@solenopsys/uimatrix-utils";
import {UILayoutsModule} from "@solenopsys/uimatrix-layouts";
import {UIModalsModule} from "@solenopsys/uimatrix-modals";
import {UIControlsModule} from "@solenopsys/uimatrix-controls";
import {UINavigateModule} from "@solenopsys/uimatrix-navigate";

export const TABLE_PAGE = (path: string) => {
    return {
        path,
        component: TablePageComponent,
        children: [{path: ":id/form", component: FormPanelComponent}]
    };
};

const components = [

    FormPanelComponent,
    ListPanelComponent,
    InfoPanelComponent

];

@NgModule({
    declarations: [components, BaseTemplateComponent,
        BootstrapComponent, TablePageComponent],
    imports: [
        CommonModule,
        RouterModule,
        UIFormsModule,
        UIIconsModule,
        UIListsModule,
        UIModalsModule,
        UILayoutsModule,
        UIControlsModule,
        UINavigateModule
    ],
    providers: []
})
export class UITemplatesModule {
    constructor(private ds: DeclaredService) {
        ds.addComps("@solenopsys/uimatrix-templates", components)
    }
}
