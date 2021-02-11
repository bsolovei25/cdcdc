import { Pipe, PipeTransform } from '@angular/core';
import { IStatus } from '../../../../../dashboard/models/EVJ/events-widget';

@Pipe({
    name: 'formatStatus',
})
export class FormatStatusPipe implements PipeTransform {
    transform(statusList: IStatus[], chosenStatus: IStatus, isCreateNewEvent: boolean): IStatus[] {
        let statusId: number = statusList.findIndex((item) => item.id === chosenStatus.id);
        statusId = statusId < 0 || isCreateNewEvent ? 0 : statusId;
        return statusList.filter((item, i) => i >= statusId);
    }
}
