export interface IFileTemplate {
    name: string;
    description: string;
    fileId: string;
}

export interface IFileDetail {
    id: string;
    createdAt: Date;
    createdBy: number;
    contentType: string;
    fileName: string;
    length: number;
}

export interface IReportTemplate {
    id: number;
    createdAt: Date;
    createdBy: number;
    name: string;
    description: string;
    fileId: string;
    folderId: string;
    fileTemplate?: IReportFile;
    systemOptions?: ISystemOptionsTemplate[];
    customOptions?: ICustomOptionsTemplate[];
    periodType?: 'year' | 'month' | 'day' | 'timePeriod' | 'datePeriod' | 'exactTime' | 'none';
    report?: any;
    isDeleted: boolean;
    displayName: string;
}

export interface ITemplateFolder {
    childFolders: IChildrenFolder[];
    id: number;
    name: string;
    templates: ITemplate[];
}

export interface IFolder {
    templates: ITemplate[];
    folders: ITemplateFolder[];
}

export interface ITemplate {
    createdAt: Date;
    createdBy: number;
    displayName: string;
    folderId?: number;
    id?: number;
    isDeleted: boolean;
    name: string;
}

export interface IChildrenFolder {
    childFolders: IChildrenFolder[];
    id: number;
    name: string;
    templates: ITemplate;
}

export interface ISystemOptionsTemplate {
    id?: number;
    templateId?: number;
    templateSystemOption: ISystemOptions;
    templateSystemOptionId?: number;
    value?: string;
    isSelectBoxType?: boolean;
    open?: boolean;
}

export interface ICustomOptionsTemplate {
    description: string;
    id: number;
    isRequired: boolean;
    name: string;
    sortOrder: number;
    source: string[];
    validationRule: string;
    type: 'textBox' | 'comboBox' | 'dateTime' | 'checkBox';
}

export interface ISystemOptions {
    defaultValue: string;
    id: number;
    name: string;
    systemOptionType: string;
    type: string;
    isActive?: boolean;
}

export interface ITreeFolderMap {
    id: string;
    idFolder?: number;
    idTemplate?: number;
    name: string;
    children: ITreeFolderMap[];
    type: string;
    openEdit?: boolean;
    createdAt?: '2020-12-18T13:37:02Z';
    createdBy?: 6;
    displayName?: '';
    folderId?: undefined;
    isDeleted?: false;
    open?: false;
}

export interface IReportFile {
    createdAt?: Date;
    createdBy?: number;
    description?: string;
    fileId?: string;
    id?: number;
    isDeleted?: boolean;
    name?: string;
}

export interface IPostSystemOptionsTemplate {
    systemOptionValues: ISystemOptionsTemplate[];
    fileTemplate: IReportFile;
    periodType: string;
}

export interface ICustomOptionsTemplate {
    customOptionsFilenameSettings: ICustomOptionsFilenameSettings[];
    templateId: number;
    templateNameOrder: number;
    useTemplateNameInFilename: boolean;
}

export interface ICustomOptionsFilenameSettings {
    customOptionId: number;
    name: string;
    useInFilename: boolean;
    order: number;
}

export { ICustomOptions } from '@widgets/admin/admin-report-server-configurator/models/admin-report-server-configurator.model';

