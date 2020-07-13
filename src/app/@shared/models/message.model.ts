export interface IMessage {
    comment: string;
    createdAt: Date;
    createdBy?: number;
    displayName: string;
    active?: boolean;
    attachedFiles?: IMessageFileAttachment[];
}

export interface IMessageFileAttachment {
    fileId?: string | null;
    type: 'image' | 'document' | 'archive' | 'video';
    name?: string;
    size?: string;
    contentType?: string;
    _file?: File;
}
