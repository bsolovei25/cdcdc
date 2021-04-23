import { Observable, Subject, MonoTypeOperatorFunction } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IDestroyedStreamOptions } from './interface';
import { ɵNG_PIPE_DEF, ɵPipeDef, Type } from '@angular/core';

const DESTROYED_STREAM_DEFAULT_NAME = '_destroyed_';
const DEFAULT_DESTROY_METHOD_NAME = 'ngOnDestroy';
const DECORATOR_APPLIED = Symbol('UntilDestroy');
const NG_PIPE_DEF = ɵNG_PIPE_DEF as 'ɵpipe';

interface IPipeType<T> extends Type<T> {
    ɵpipe: ɵPipeDef<T>;
}

/**
 * Decorate component or directive that uses `takeUntilDestroyed` operator. Required for proper operator work
 */
export function DecorateUntilDestroy(): ClassDecorator {
    // tslint:disable-next-line:ban-types
    return (target: Function) => {
        const destroyedStreamName = getDestroyStreamName(DEFAULT_DESTROY_METHOD_NAME);

        if (isPipe(target)) {
            const def = target.ɵpipe;

            def.onDestroy = getNewDestroyMethod(def.onDestroy, destroyedStreamName);
        } else {
            target.prototype.ngOnDestroy = getNewDestroyMethod(target.prototype.ngOnDestroy, destroyedStreamName);
        }

        target.prototype[DECORATOR_APPLIED] = true;
    };
}

/**
 * example
 * // regular case
 * takeUntilDestroyed(this)
 *
 * // custom destroy method
 * takeUntilDestroyed(this, { destroyMethod: this.destroy })
 */
export function takeUntilDestroyed<T, TClass>(
    instance: TClass,
    options: IDestroyedStreamOptions = {},
): MonoTypeOperatorFunction<T> {
    const destroyMethodName = options.destroyMethod
        ? getClassMethodName(instance, options.destroyMethod) ?? DEFAULT_DESTROY_METHOD_NAME
        : DEFAULT_DESTROY_METHOD_NAME;
    const destroyedStreamName = getDestroyStreamName(destroyMethodName);

    if (!options.destroyMethod) {
        if (!(DECORATOR_APPLIED in Object.getPrototypeOf(instance).constructor.prototype)) {
            throwError(instance, `Missed '@DecorateUntilDestroy' decorator usage`);
        }
    } else if (!instance[destroyedStreamName]) {
        if (!instance[destroyMethodName]) {
            throwError(instance, `Missed destroy method '${destroyMethodName}'`);
        }

        instance[destroyMethodName] = getNewDestroyMethod(instance[destroyMethodName], destroyedStreamName);
    }

    if (!instance[destroyedStreamName]) {
        instance[destroyedStreamName] = new Subject<void>();
    }

    return (source: Observable<T>) => {
        return source.pipe(takeUntil(instance[destroyedStreamName]));
    };
}

function throwError<T>(target: T, textPart: string): void {
    throw new Error(`takeUntilDestroyed: ${textPart} in '${Object.getPrototypeOf(target).constructor.name}'`);
}

// tslint:disable-next-line:ban-types
function getClassMethodName<T>(classObj: T, method: Function): string | null {
    const methodName = Object.getOwnPropertyNames(classObj).find(prop => classObj[prop] === method);

    if (methodName) {
        return methodName;
    }

    const proto = Object.getPrototypeOf(classObj);
    if (proto) {
        return getClassMethodName(proto, method);
    }

    return null;
}

function getNewDestroyMethod(
    originalDestroy: ((...args: unknown[]) => unknown) | null | undefined,
    destroyedStreamName: string,
): () => unknown {
    return function(this: () => void, ...args: unknown[]): unknown {
        let result: unknown | undefined;

        if (originalDestroy) {
            result = originalDestroy.call(this, ...args);
        }

        if (this[destroyedStreamName]) {
            this[destroyedStreamName].next();
        }

        return result;
    };
}

function getDestroyStreamName(destroyMethodName: string): string {
    return DESTROYED_STREAM_DEFAULT_NAME + destroyMethodName;
}

// tslint:disable-next-line:ban-types
export function isPipe<T>(target: Object): target is IPipeType<T> {
    return !!target[NG_PIPE_DEF];
}
