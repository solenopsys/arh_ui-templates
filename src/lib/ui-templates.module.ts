import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TablePageComponent } from "./table-page/table-page.component";
import { FormPanelComponent } from "./panels/form-panel/form-panel.component";
import { ListPanelComponent } from "./panels/list-panel/list-panel.component";
import { InfoPanelComponent } from "./panels/info-panel/info-panel.component";
import { RouterModule } from "@angular/router";
import { UIFormsModule } from "@solenopsys/ui-forms";
import { UIIconsModule } from "@solenopsys/ui-icons";
import { UIListsModule } from "@solenopsys/ui-lists";
import { BaseTemplateComponent } from "./base-template/base-template.component";

import { BootstrapComponent } from "./bootstrap/bootstrap.component";

import { DeclaredService } from "@solenopsys/ui-utils";
import { UILayoutsModule } from "@solenopsys/ui-layouts";
import { UIControlsModule } from "@solenopsys/ui-controls";
import { UINavigateModule } from "@solenopsys/ui-navigate";
import { UIModalsModule } from "@solenopsys/ui-modals";
import { DynamicLoaderComponent } from "./dynamic/dynamic-loader.component";
import { MenuDynamicComponent } from "./dynamic/menu-dynamic.component";
import { DoListComponent } from "./do-list/do-list.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { TopPanelComponent } from "./top-panel/top-panel.component";
import { RegisterTemplateComponent } from "./register-template/register-template.component";

export const TABLE_PAGE = (path: string) => {
  return {
    path,
    component: TablePageComponent,
    children: [{ path: ":id/form", component: FormPanelComponent }],
  };
};

const components = [
  FormPanelComponent,
  ListPanelComponent,
  InfoPanelComponent,
  MainPageComponent,
  TopPanelComponent,
  DoListComponent,
];

@NgModule({
  declarations: [
    components,
    BaseTemplateComponent,
    BootstrapComponent,
    TablePageComponent,
    DynamicLoaderComponent,
    MenuDynamicComponent,
    RegisterTemplateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    UIFormsModule,
    UIIconsModule,
    UILayoutsModule,
    UIListsModule,
    UIModalsModule,
    UIControlsModule,
    UINavigateModule,
  ],
  exports: [TopPanelComponent, RegisterTemplateComponent],
  providers: [],
})
export class UITemplatesModule {
  constructor(private ds: DeclaredService) {
    ds.addComps("@solenopsys/ui-templates", components);
  }
}
