// Local modules
import { HttpEvent } from '@angular/common/http';

export interface IResult {
    code: number;
    description: string;
    comment?: string;
}

export enum CoreResultCodeEnum {
    noErrors,
    dbDeleteError,
    loginOrPasswordIsIncorrect,
    invalidOldPassword,
    requestValidationError,
    unhandledError,
    notFoundAuthenticatedUser,
}

/**
 * Result class implementation
 */
export class Result<X> implements IResult {
    code: number = 0;
    description: string = '';
    comment?: string;
    httpCode?: number;
    responseData?: HttpEvent<X>;

    get success(): boolean {
        return this.is(CoreResultCodeEnum.noErrors);
    }

    static create<Y = undefined>(code?: CoreResultCodeEnum, comment?: string, data?: Y): Result<Y>;
    static create<Y = undefined>(codeError?: CoreResultCodeEnum | Error, comment?: string): Result<Y> {
        if (codeError) {
            // result from result code
            if (typeof codeError === 'number') {
                return new Result<Y>().setResult(codeError, comment);
            }
            // result from Error or TypeORM Error
            if (codeError instanceof Error) {
                // result from Error
                console.error(codeError);
                return new Result<Y>().setResult(CoreResultCodeEnum.unhandledError, codeError.message);
            }
        }
        // new empty Result
        return new Result<Y>().setResult(CoreResultCodeEnum.noErrors, comment);
    }

    static createFromResult<Y = undefined>(otherResult: Result<any>): Result<Y> {
        return new Result<Y>().setResult(otherResult.code, otherResult.comment);
    }

    setResult(code: CoreResultCodeEnum, comment?: string, httpCode?: number, responseData?: HttpEvent<X>): Result<X> {
        this.code = code;
        this.description = getResultDescription(code);
        this.comment = comment;
        this.httpCode = httpCode;
        this.responseData = responseData;
        return this;
    }

    is(resultCode: CoreResultCodeEnum): boolean {
        return this.code === resultCode;
    }

    onError(f: (result: IResult) => void): IResult {
        if (!this.success) {
            f(this);
        }
        return this;
    }

    onSuccess(f: (result: IResult) => void): IResult {
        if (this.success) {
            f(this);
        }
        return this;
    }
}

export function extensionGetResultDescription(resultCode: any): string {
    switch (resultCode) {
        default:
            return `Нет описания`;
    }
}

export function getResultDescription(resultCode: CoreResultCodeEnum): string {
    switch (resultCode) {
        case CoreResultCodeEnum.noErrors:
            return `Нет ошибок`;
        case CoreResultCodeEnum.dbDeleteError:
            return `Не удалось удалить`;
        case CoreResultCodeEnum.loginOrPasswordIsIncorrect:
            return 'Не корректный логин или пароль';
        case CoreResultCodeEnum.invalidOldPassword:
            return 'Текущий пароль введен не верно';
        case CoreResultCodeEnum.requestValidationError:
            return 'Отправленая структура данных не прошла валидацию на сервере';
        case CoreResultCodeEnum.unhandledError:
            return 'Возникла ошибка';
        case CoreResultCodeEnum.notFoundAuthenticatedUser:
            return 'Аутентифицированный пользователь не найден';
        default:
            return extensionGetResultDescription(resultCode);
    }
}
