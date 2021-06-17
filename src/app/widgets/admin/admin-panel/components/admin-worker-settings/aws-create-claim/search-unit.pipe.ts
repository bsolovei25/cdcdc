import { Pipe, PipeTransform } from '@angular/core';
import { IUnitEvents } from '../../../../../../dashboard/models/EVJ/events-widget';

@Pipe({
    name: 'searchUnit',
})
export class SearchUnitPipe implements PipeTransform {
    transform(units: IUnitEvents[], search: string = ''): IUnitEvents[] {
        if (!search.trim()) {
            return units;
        }
        return units?.filter((unit) => {
            return unit?.name?.toLowerCase().includes(search.toLowerCase());
        });
    }
}
