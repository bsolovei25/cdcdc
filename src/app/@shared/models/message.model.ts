export interface IMessage {
    comment: string;
    createdAt: Date;
    createdBy?: number;
    displayName: string;
    active?: boolean;
}
