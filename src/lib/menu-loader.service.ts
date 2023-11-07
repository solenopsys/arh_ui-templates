import {MenuItemData} from "@solenopsys/ui-navigate";
import {Injectable} from "@angular/core";


export interface MenuLoader {
    load(dataProviderName: string, dataKey: string): Promise<MenuItemData[]>;
}



export interface MenuLoaderProvider {
    load(dataKey: string): Promise<MenuItemData[]>
}

@Injectable({
    providedIn: 'root',
})
export class MenuLoaderService implements MenuLoader {
    private dataProviders: { [key: string]: MenuLoaderProvider } = {};

    private providerMapping: { [key: string]: string } = {};


    addProvider(name: string, provider: MenuLoaderProvider) {
        console.log("SET PROVIDER1",name,provider)
        this.dataProviders[name] = provider;
    }

    addMapping(dataKey: string, dataProviderName: string) {
        console.log("ADD MAPPING1",dataKey,dataProviderName)
        this.providerMapping[dataKey] = dataProviderName;
    }

    load(dataProviderName: string, dataKey: string): Promise<MenuItemData[]> {
        console.log("MENULOADERSERVICE.load", dataProviderName, dataKey);
        console.log("PROVIDERS",this.dataProviders);
        return new Promise((resolve, reject) => {
            const dataProvider = this.dataProviders[dataProviderName];
            if (dataProvider) {
                dataProvider.load(dataKey).then((data: MenuItemData[]) => {
                    resolve(data);
                }).catch((error) => {
                    reject(error);
                });
            } else {
                reject("DataProvider not found");
            }
        });
    }

    loadByKey(dataKey: string): Promise<MenuItemData[]> {
        console.log("PROVIDER MAPPING",this.providerMapping);
        console.log("DATA KEY",dataKey);
        return this.load(this.providerMapping[dataKey], dataKey);
    }
}