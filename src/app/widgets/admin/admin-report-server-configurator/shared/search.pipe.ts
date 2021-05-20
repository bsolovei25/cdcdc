import { Pipe, PipeTransform } from "@angular/core";
import { ITemplateFolder } from "@dashboard/models/ADMIN/report-server.model";

@Pipe({ name: 'searching'})

export class SearchPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();

        return items.filter( value => {
            return value.name.toLowerCase().includes(searchText);
        })
    }
}