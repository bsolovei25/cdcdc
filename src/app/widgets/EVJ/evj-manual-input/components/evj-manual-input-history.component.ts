import {
    Component,
    OnInit,
    OnChanges,
    Input
} from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { IHistoryIdx, IMachine_MI, IGroup_MI, IChoosenHistorical, MI_ParamSend, Param_MI} from './../../../../dashboard/models/EVJ/manual-input.model';
import { ManualInputService } from '../../../../dashboard/services/widgets/EVJ/manual-input.service';

@Component({
    selector: 'evj-manual-input-history',
    templateUrl: './evj-manual-input-history.component.html',
    styleUrls: ['./evj-manual-input-history.component.scss'],
    animations: [
        trigger('Branch', [
            state(
                'collapsed',
                style({
                    height: 0,
                    transform: 'translateY(-8px)',
                    opacity: 0,
                    overflow: 'hidden',
                })
            ),
            state(
                'expanded',
                style({
                    height: '*',
                    opacity: 1,
                })
            ),
            transition('collapsed => expanded', animate('150ms ease-in')),
            transition('expanded => collapsed', animate('150ms ease-out')),
        ]),
    ],
})
export class EvjManualInputHistoryComponent implements OnInit, OnChanges {
    @Input() isUserHasWriteClaims: boolean;
    @Input() set edit(data: boolean) {
        this.editMode = data;
    }
    @Input() set data(data: {
        machineData: IMachine_MI[];
        historyIdx: IHistoryIdx
    }) {
        this.hours = [];
        this.hoursValue = [];
        this.machineData = data.machineData;
        this.historyIdx = data.historyIdx;

        this.machineTitle = data.machineData[data.historyIdx.machineIdx].name;

        this.groupTitle = data.machineData[data.historyIdx.machineIdx]
            .groups[data.historyIdx.groupIdx].name;

        this.paramTitle = data.machineData[data.historyIdx.machineIdx]
            .groups[data.historyIdx.groupIdx]
            .params[data.historyIdx.paramsIdx].name;

        this.paramsData = data.machineData[data.historyIdx.machineIdx]
            .groups[data.historyIdx.groupIdx]
            .params[data.historyIdx.paramsIdx];

        this.paramsData.historyValues.forEach(item => {
            item.hourValues.forEach(hour => {
                this.hours.push(hour.hour);
                this.hoursValue.push(hour.value);
            });
        });
    }

    sendHistoryData: MI_ParamSend[] = [];

    paramsData: Param_MI;
    machineData: IMachine_MI[];
    historyIdx: IHistoryIdx;

    hours: Date[] = [];
    hoursValue: number[] = [];

    machineTitle: string;
    groupTitle: string;
    paramTitle: string;

    editMode: boolean = false;

    constructor(
        public manualInputService: ManualInputService,
    ) {}

    openAll(): void {
        const status = this.machineData[this.historyIdx.machineIdx].open;
        this.machineData[this.historyIdx.machineIdx].open = !status;
        this.machineData[this.historyIdx.machineIdx].groups[this.historyIdx.groupIdx].open = !status;
    }

    openGroup(): void {
        this.machineData[this.historyIdx.machineIdx].groups[this.historyIdx.groupIdx].open
        = !this.machineData[this.historyIdx.machineIdx].groups[this.historyIdx.groupIdx].open;
    }

    activateEditMode(): void {
        if (this.isUserHasWriteClaims && this.editMode === false) {
            this.editMode = true;
        }
    }

    onChangeHistoricalValue(e: any, i: number, prevValue: number): void {
        const id = this.paramsData.id;
        const time = this.hours[i];
        if (e.target.value.trim() !== '' &&  +e.target.value !== prevValue) {
            if (this.sendHistoryData.find(item => item.Id === id && item.TimeCode === time)) {
                this.sendHistoryData.find(item => item.Id === id && item.TimeCode === time).Value = e.target.value;
            } else {
                this.sendHistoryData.push({
                    Id: id,
                    Value: e.target.value,
                    TimeCode: time
                });
            }
        }
    }

    ngOnChanges(): void {}

    ngOnInit(): void {}
}
