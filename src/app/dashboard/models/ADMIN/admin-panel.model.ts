import { ICategory, IUnitEvents, IUser } from '../EVJ/events-widget';
import { IWidget } from '../widget.model';
import { IWorker } from '../worker';
import { IBrigade } from '../../../widgets/EVJ/change-shift/change-shift.interfaces';
import { IUnits } from './admin-shift-schedule.model';

export interface IAdminPanel {
    person: IUser;
    workspaces: IWorkspace[];
    availableWidgets: IWidget[];
    claims: IClaim[];
}

export interface IWorkspace {
    id: number;
    screenName: string;
    widgets?: any;
    claims?: IGlobalClaim[];
}

export interface IClaim {
    type?: string;
    comment?: string;
    id: number;
}

export interface IScreen {
    id: number;
    screen: IWorkspace;
    claims: IClaim[];
}

export interface IButtonImgSrc {
    btnIconSrc: string;
}

export interface IWorkerAdminPanel {
    isActiveWorker: boolean;
    worker: IWorker;
}

export interface IWorkerOptionAdminPanel {
    name?: string;
    value: string;
    key: string;
}

export interface IGroup {
    id: number;
    name: string;
    claims?: IGlobalClaim[];
    users?: number[];
    workspaces?: IWorkspace[];
}

export interface IGlobalClaim {
    claimType: string;
    description?: string;
    claimCategory?: string;
    claimCategoryName?: string;
    claimName?: string;
    claimValueTypeName?: string;
    specification?: string;
    claimValueType?: string;
    value?: string;
    additionalType?: string;
    widgets?: IWidget[];
    units?: IUnitEvents[];
    notificationCategory?: ICategory[];
}

export interface IUserLdap {
    id: string;
    displayName?: string;
    givenName?: string;
    surname?: string;
    userPrincipalName?: string;
    samAccountName?: string;
    sid: string;
    department: string;
}

export interface IUserImported {
    login: string;
    sid: string;
    firstName?: string;
    lastName?: string;
    brigade?: IBrigade;
    position: string;
    isLoadedAutomatically: boolean;
    displayName: string;
    userClaimsVersion?: number;
    id: number;
    email?: string;
    concurrencyStamp: string;
    photoId: string;
}

export interface IUserLdapDto {
    user?: IUserImported;
    importedUser?: IUserImported;
    ldapUser: IUserLdap;
    isUserImported: boolean;
}

export enum EnumClaims {
    '???????????? ????????????' = 1,
    '??????????????????????',
    '???????????? ????????',
    '??????????????????????????',
}

export enum ScreenClaimsEnum {
    screenView,
    screenEdit,
    screenDel,
    screenAdmin,
}

export enum ScreenClaimsNamesEnum {
    '???????????????? ????????????',
    '???????????????????????????? ????????????',
    '???????????????? ????????????',
    '?????????????????????????????????? ????????????',
}
