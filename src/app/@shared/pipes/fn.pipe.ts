import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fn',
    pure: true,
})
export class FnPipe implements PipeTransform {
    public transform(templateValue: unknown, fnReference: (...e: any) => unknown, ...fnArguments: unknown[]): any {
        return fnReference(templateValue, ...fnArguments);
    }
}
