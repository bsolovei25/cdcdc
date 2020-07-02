import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'spaceNumber',
})
export class SpaceNumber implements PipeTransform {
    transform(value: number): string {
        return (value + '')
            .split('')
            .reverse()
            .join('')
            .replace(/(\d{3})/g, '$1 ')
            .split('')
            .reverse()
            .join('')
            .replace(/^ /, '');
    }
}
