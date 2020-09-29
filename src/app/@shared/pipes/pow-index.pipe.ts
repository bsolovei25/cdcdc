import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'powIndex',
})
export class PowIndexPipe implements PipeTransform {
    transform(value: string): string {
        if (value?.match('&')) {
            let finalString = '';
            value = value.slice(1);
            for (let i = 0; i < value.length; i++) {
                if (+value[i] && value[i - 1] === '^') {
                    finalString = finalString + '<sup>' + value[i] + '</sup>';
                } else if (+value[i]) {
                    finalString = finalString + '<sub>' + value[i] + '</sub>';
                } else {
                    finalString += value[i] !== '^' ? value[i] : '';
                }
            }
            return finalString;
        }
        return value;
    }
}
