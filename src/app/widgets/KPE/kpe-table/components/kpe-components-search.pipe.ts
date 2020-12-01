import { Pipe, PipeTransform } from '@angular/core';
import { IKpeTable, IKpeTableBody, IKpeTableHeader } from '../kpe-table.component';

@Pipe({
    name: 'kpeComponentsSearch'
})
export class KpeComponentsSearchPipe implements PipeTransform {
    transform(components: IKpeTableBody[], search: string = ''): IKpeTableBody[] {
        if (!search.trim()) {
            return components;
        }
        return components?.filter(c => {
            return c?.name.toLowerCase().includes(search.toLowerCase());
        });
    }

}
