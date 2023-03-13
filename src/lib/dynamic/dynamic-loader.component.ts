import {Component, Input, ViewChild, ViewContainerRef} from "@angular/core";
import {PanelConfig} from "@solenopsys/ui-templates";


@Component({
    selector: 'ui-dynamic-loader',
    template: '<div #dynamicComponentContainer></div>'
})
export class DynamicLoaderComponent {
    @ViewChild('dynamicComponentContainer', {read: ViewContainerRef}) entry: ViewContainerRef;


    @Input("config")
    set setConfig(panelConfig: PanelConfig) {
        const componentRef = this.entry.createComponent(panelConfig.component);
        componentRef.instance['loadFrom'] = {providerName: panelConfig.dataProviderName, key: panelConfig.dataKey};
    }
}