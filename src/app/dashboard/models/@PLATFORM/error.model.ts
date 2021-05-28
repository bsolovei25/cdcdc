export interface IError {
    messages: IMessage[];
    message: IMessage;
    customCodeError: number;
}

export interface IMessage {
    type: 'info' | 'message' | 'warning' | 'error';
    message: string;
    httpCode: number;
}
