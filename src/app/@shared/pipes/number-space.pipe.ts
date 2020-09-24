import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'spaceNumber',
})
export class SpaceNumber implements PipeTransform {
    transform(value: number, afterDots?: number): string {
        try {
            const numAfterDots: string = !!(+value?.toFixed(afterDots).split('.')[1])
                ? '.' + value?.toFixed(afterDots).split('.')[1]
                : '';

            value = +value?.toFixed(afterDots).split('.')[0];

            return (value + '')
                .split('')
                .reverse()
                .join('')
                .replace(/(\d{3})/g, '$1 ')
                .split('')
                .reverse()
                .join('')
                .replace(/^ /, '') + numAfterDots;
        } catch (e) {
            console.log(e, +value);
            return value?.toString();
        }
    }
}
