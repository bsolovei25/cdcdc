import { Pipe, PipeTransform } from '@angular/core';
import { IGroupScreens } from './group-selector.component';

@Pipe({
    name: 'filterGroups',
})
export class FilterGroupsPipe implements PipeTransform {
    transform(value: IGroupScreens[]): IGroupScreens[] {
        return value.filter((item) => item.isEnabled);
    }
}
