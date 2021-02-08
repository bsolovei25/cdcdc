import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'replaceLineBreak' })
export class LineBreakPipe implements PipeTransform {
    transform(value: string): string {
        return value.replace(/\n/g, '<br/>');
    }
}
