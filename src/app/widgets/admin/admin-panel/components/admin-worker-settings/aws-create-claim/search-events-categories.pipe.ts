import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '@dashboard/models/EVJ/events-widget';

@Pipe({
    name: 'searchEventsCategories',
})
export class SearchEventsCategoriesPipe implements PipeTransform {
    transform(categories: ICategory[], search: string = ''): ICategory[] {
        if (!search.trim()) {
            return categories;
        }
        return categories?.filter((c) => {
            return c?.description?.toLowerCase().includes(search.toLowerCase());
        });
    }
}
