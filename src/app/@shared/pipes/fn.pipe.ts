import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fn',
    pure: true,
})
export class FnPipe implements PipeTransform {
    public transform(
        templateValue: unknown,
        fnReference: (...e: unknown[]) => unknown,
        ...fnArguments: unknown[]
    ): unknown {
        return fnReference(templateValue, ...fnArguments);
    }
}
