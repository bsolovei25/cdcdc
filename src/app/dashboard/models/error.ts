export interface IError {
    messages: IMessage[];
    message: IMessage;
    customCodeError: number;
}

export interface IMessage {
    type: 'Info' | 'Message' | 'Warning' | 'Error';
    message: string;
    httpCode: number;
}
