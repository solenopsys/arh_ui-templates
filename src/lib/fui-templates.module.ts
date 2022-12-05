import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TablePageComponent } from "./table-page/table-page.component";
import { FormPanelComponent } from "./form-panel/form-panel.component";
import { ListPanelComponent } from "./list-panel/list-panel.component";
import { InfoPanelComponent } from "./info-panel/info-panel.component";
import { RouterModule } from "@angular/router";
import { FuiFormsModule } from "@solenopsys/uimatrix-forms";
import { FuiIconsModule } from "@solenopsys/uimatrix-icons";
import { FuiGridModule } from "@solenopsys/uimatrix-lists";
import { BaseTemplateComponent } from "./base-template/base-template.component";
import { FuiNavigateModule } from "@solenopsys/uimatrix-layouts";
import { BootstrapComponent } from "./bootstrap/bootstrap.component";
import { FuiModalsModule } from "@solenopsys/uimatrix-modals";

export const TABLE_PAGE = (path: string) => {
  return {
    path,
    component: TablePageComponent,
    children: [{ path: ":id/form", component: FormPanelComponent }]
  };
};

@NgModule({
  declarations: [
    TablePageComponent,
    FormPanelComponent,
    ListPanelComponent,
    InfoPanelComponent,
    BaseTemplateComponent,
    BootstrapComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FuiFormsModule,
    FuiIconsModule,
    FuiGridModule,
    FuiNavigateModule,
    FuiModalsModule
  ],
  providers: []
})
export class FuiTemplatesModule {
}
