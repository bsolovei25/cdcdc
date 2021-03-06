import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'addWordWrap',
})
export class AddWordWrapPipe implements PipeTransform {
    transform(value: string): string {
        return value.replaceAll(/\n/g, '<br>');
    }
}
