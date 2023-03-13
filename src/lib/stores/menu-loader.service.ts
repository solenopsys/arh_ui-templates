import {MenuItemData} from "@solenopsys/ui-navigate";
import {Injectable} from "@angular/core";


interface MenuLoader {
    load(dataProviderName: string, dataKey: string): Promise<MenuItemData[]>;
}


@Injectable({
    providedIn: 'root'
})
export class MenuLoaderService implements MenuLoader{
    private dataProviders: { [key: string]: (dataKey: string) => Promise<MenuItemData[]> } = {};


    addProvider(name: string, provider: (dataKey: string) => Promise<MenuItemData[]>) {
        this.dataProviders[name] = provider;
    }

    load(dataProviderName: string, dataKey: string) :Promise<MenuItemData[]>{
        return new Promise((resolve, reject) => {
            const dataProvider = this.dataProviders[dataProviderName];
            if (dataProvider) {
                dataProvider(dataKey).then((data: MenuItemData[]) => {
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