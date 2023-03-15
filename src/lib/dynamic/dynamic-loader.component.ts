import {Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef} from "@angular/core";
import {PanelConfig} from "../stores/interface.store";
import {DYNAMIC_COMPONENTS_MAPPING, DynamicAbstract} from "./dynamic.abstract";


@Component({
    selector: 'ui-dynamic-loader',
    template: '<div #dynamicLoaderContainer></div>'
})
export class DynamicLoaderComponent {
    @ViewChild('dynamicLoaderContainer', {read: ViewContainerRef}) entry: ViewContainerRef;

    constructor(private resolver: ComponentFactoryResolver) {
    }

    @Input("config")
    set setConfig(panelConfig: PanelConfig) {

        setTimeout(() => {
            const dc = DYNAMIC_COMPONENTS_MAPPING[panelConfig.component];
            const factory = this.resolver.resolveComponentFactory(dc);
            const componentRef = this.entry.createComponent(factory);
            console.log("componentRef LOADED", componentRef)
            componentRef.instance['id']=panelConfig.id;
        })


    }
}