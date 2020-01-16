import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fn',
    pure: true,
})
export class FnPipe implements PipeTransform {
    public transform(
        templateValue: any,
        fnReference: (...e: any) => any,
        ...fnArguments: any[]
    ): any {
        return fnReference(templateValue, ...fnArguments);
    }
}
