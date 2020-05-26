export enum WorkflowActions {
    SEND_EMAIL = 'SendEmail',
    GRADUATION_TABLE_EVENT = 'GraduationTableEvent',
}

export const WorkflowActionsNameMap: { [key: string]: string } = {
    [WorkflowActions.SEND_EMAIL]: 'Отправить email',
    [WorkflowActions.GRADUATION_TABLE_EVENT]: 'Действие',
};
