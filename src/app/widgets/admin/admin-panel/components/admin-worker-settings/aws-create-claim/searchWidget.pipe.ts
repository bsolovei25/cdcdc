import { Pipe, PipeTransform } from '@angular/core';
import { IWidget } from '../../../../../../dashboard/models/widget.model';

@Pipe({
    name: 'searchWidget',
})
export class SearchWidgetPipe implements PipeTransform {
    transform(widgets: IWidget[], search: string = ''): IWidget[] {
        if (!search.trim()) {
            return widgets;
        }
        return widgets?.filter((widget) => {
            return widget?.title?.toLowerCase().includes(search.toLowerCase());
        });
    }
}
