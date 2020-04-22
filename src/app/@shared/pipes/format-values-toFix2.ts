import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toFix2',
    pure: true,
})
export class ToFix2Pipe implements PipeTransform {
    transform(value: number): number {
        value = parseFloat(value.toFixed(2));
        return value;
    }
}
