import { LineChartData } from './line-chart';
import { IGlobalClaim } from './admin-panel';
import { IMessage } from '../../@shared/models/message.model';

export interface EventsWidgetNotificationPreview {
    id: number;
    originalId: string;
    itemNumber: number;
    place: { id: number; name: string };
    eventDateTime: Date;
    status: IStatus;
    priority: IPriority;
    category: ICategory;
    severity: string;
    description: string;
    comments?: { comment: string; createdBy?: number }[];
    sortIndex: number;
    iconUrl?: string;
    statusName?: string;
    iconUrlStatus?: string;
}

export interface EventsWidgetNotification {
    id?: number;
    parentId?: number;
    itemNumber: number;
    organization: string;
    branch: string;
    originalId?: string;
    //place?: { id: number; name: string };
    responsibleOperator: IUser;
    fixedBy: IUser;
    eventDateTime: Date;
    eventEndDateTime?: Date;
    iconUrl?: string;
    iconUrlStatus?: string;
    isUserCanEdit?: boolean;
    status: IStatus;
    facts?: IMessage[];
    priority: IPriority;
    deviationReason: string; // Причина отклонения
    establishedFacts: string; // Установленные факты
    eventType: { id: number; name: string }; // Тип происшествия
    directReasons: string; // Непосредственные/прямые причины
    description: string; // Описание
    comments?: IMessage[]; // Комментарий оператора
    category: ICategory;
    statusName?: string;
    positionNumber?: string;
    severity: string;
    retrievalEvents: IRetrievalEventDto[];
    equipmentCategory: { id: number; name: string; code: string };
    deadline?: Date;
    graphValues: LineChartData;
    isAcknowledged: boolean;
    source?: any;
    unit?: IUnitEvents;
    unitName?: string;
    deviationData?: IEventDeviationData;
    asusEvent: IEventAsus;
}

export interface IEventAsus {
    id?: number;
    notificationId?: number;
    codeAsus?: string;
    codeAsusGuid?: string;
    state?: string;
    consumer?: string;

    category: string;
    workGroup: string;
    service: string;
    eoService: string;
    equipment: string; // ? Оборудование

    datetimeReaction?: Date;
    datetimeStart?: Date;
    datetimeEnd?: Date;
    datetimeDeadline?: Date;
}

export interface IRetrievalEventDto {
    innerNotificationId: number;
    description: string;
    isAcknowledged: boolean;
    status: IStatus;
    deadline: Date;
    fixedByName: string;
    timerPercentage: number;
}

export interface IEventDeviationData {
    tag: string;
    equipment: string;
    workmode: string;
    isNormMin: boolean;
    isNormMax: boolean;
    normMin: number;
    normMax: number;
    value: number;
    isClosed: boolean;
    cardDate: string;
    actions: {
        originalId?: string;
        dateStart: string;
        dateEnd: string;
        typeId: string;
        isCompleted: boolean;
    }[];
    availableActions: {
        id: string;
        name: string;
    }[];
    availableReasons: {
        id: string;
        name: string;
    }[];
}

export interface IUnitEvents {
    id: number;
    name: string;
    createdAt?: Date;
    createdById?: number;
}

export interface IRetrievalEvents {
    id: number;
    innerNotification: EventsWidgetNotification;
    timerPercentage: number;
}

export interface IUser {
    login: string;
    password?: string;
    sid?: string;
    id: number;
    firstName: string;
    lastName: string;
    middleName?: string;
    email?: string;
    phone?: string;
    brigade?: { id: number; number: string };
    positionDescription?: string;
    displayName?: string;
    position?: WorkerPositionType;
    photoId?: string;
    claims?: IGlobalClaim[];
    department?: string;
}

export interface ISaveMethodEvent {
    data: {
        url: string;
        authenticationType: AuthenticationType;
    };
}

export type WorkerPositionType = 'common' | 'responsible';

export type EventsWidgetNotificationPriority = 'danger' | 'warning' | 'standard';

export type EventsWidgetNotificationStatus = 'new' | 'inWork' | 'closed';

export type EventsWidgetFilterCode = 'all' | 'inWork' | 'closed';

export type EventsWidgetCategoryCode =
    | 'smotr'
    | 'safety'
    | 'tasks'
    | 'equipmentStatus'
    | 'drops'
    | 'asus';

export type AuthenticationType = 'bearer' | 'windows';

export type EventAction = 'add' | 'edit' | 'delete';

export interface ICategory {
    id: number;
    name: EventsWidgetCategoryCode;
    code: string;
}

export interface IStatus {
    id: number;
    name: EventsWidgetNotificationStatus;
    code: string;
}

export interface IPriority {
    id: number;
    name: EventsWidgetNotificationPriority;
    code: string;
}

export interface ISmotrReference {
    messages: {
        type: string;
        message: string;
        httpCode: number;
    }[];
    data: {
        reasons: {
            id: string,
            name: string;
        }[];
        actions: {
            id: string,
            name: string;
        }[];
    };
}

export interface IAsusService {
    parent: string;
    code: string;
    name: string;
    parentCod: string;
}

export interface IAsusEOService {
    codeSap: string;
    code: string;
    name: string;
    parentCod: string;
}

export interface IAsusWorkgroup {
    name: string;
    code: string;
    organizationCode: string;
    parent: string;
    parentCode: string;
}

export interface IAsusCategories {
    name: string;
}

export interface EventsWidgetFilter {
    id: number;
    code: EventsWidgetFilterCode;
    notificationsCount: number;

    name?: string;
    isActive?: boolean;
}

export interface EventsWidgetCategory {
    id: number;
    code: EventsWidgetCategoryCode;
    notificationsCounts: EventsWidgetNotificationsCounter;

    iconUrl?: string;
    name?: string;
    isActive?: boolean;
    url?: string;
}

export interface EventsWidgetNotificationsCounter {
    open: number;
    all: number;
}

export interface EventsWidgetDataPreview {
    notification: EventsWidgetNotificationPreview;
    action: EventAction;
}

export interface EventsWidgetData {
    notification: EventsWidgetNotification;
    action: EventAction;
}

export interface EventsWidgetOptions {
    categories?: number[];
    filter?: EventsWidgetFilterCode;
    dates?: { fromDateTime: Date; toDateTime: Date };
    placeNames?: string[];
    description?: string;
}

export interface EventsWidgetsStats {
    statsByCategory: EventsWidgetsStatsCategory[];
    statsByStatus: EventsWidgetsStatsStatus[];
}

export interface EventsWidgetsStatsCategory {
    category: { id: number };
    unclosedCount: number;
    totalCount: number;
}

export interface EventsWidgetsStatsStatus {
    status: { id: number };
    count: number;
}

export interface ISearchRetrievalWindow {
    isShow: boolean;
    idEvent: number;
    acceptFunction?: () => void;
    closeFunction?: () => void;
}
