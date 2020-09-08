import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'formatVolume'
})

export class formatVolume implements PipeTransform {
    transform(value: string): string {
        return value.toString().replace(',', ' ');
    }
}