export interface IFileTemplate{
    name: string;
    description: string;
    fileId: string;
}

export interface IFileDetail{
    id: string;
    createdAt: Date;
    createdBy: number;
    contentType: string;
    fileName: string;
    length: number;
}

export interface IReportTemplate{
    id: number;
    fileId: string;
    fileDetail:  IFileDetail;
    name: string;
    description: string;
    createdAt: Date;
    createBy: number;
    isDeleted: boolean;
}