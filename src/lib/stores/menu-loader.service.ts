import {MenuItemData} from "@solenopsys/ui-navigate";
import {Injectable} from "@angular/core";


export interface MenuLoader {
    load(dataProviderName: string, dataKey: string): Promise<MenuItemData[]>;
}

export interface MenuLoaderProvider {
    load(dataKey: string): Promise<MenuItemData[]>
}

@Injectable({
    providedIn: 'root'
})
export class MenuLoaderService implements MenuLoader {
    private dataProviders: { [key: string]: MenuLoaderProvider } = {};


    addProvider(name: string, provider: MenuLoaderProvider) {
        this.dataProviders[name] = provider;
    }

    load(dataProviderName: string, dataKey: string): Promise<MenuItemData[]> {
        console.log("MENULOADERSERVICE.load", dataProviderName, dataKey);
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
}