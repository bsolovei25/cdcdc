import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    Inject,
    HostListener,
    OnDestroy,
} from '@angular/core';
import { ShiftService } from '../../services/shift.service';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
import { Shift, ShiftComment, ShiftMember } from '../../models/shift.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { IWidgets } from '../../models/widget.model';

interface CommentModel {
    id: number;
}

@Component({
    selector: 'evj-change-shift',
    templateUrl: './change-shift.component.html',
    styleUrls: ['./change-shift.component.scss'],
})
export class ChangeShiftComponent implements OnInit, OnDestroy {
    @ViewChild('input', { static: false }) input: ElementRef;
    @ViewChild('scroll', { static: false }) scroll: ElementRef;
    @ViewChild('allPeople', { static: false }) allPeople: ElementRef;
    @ViewChild('addShift', { static: false }) addShift: ElementRef;

    mapPosition = [
        {
            code: 'responsible',
            name: 'Старший оператор',
        },
        {
            code: 'common',
            name: 'Оператор',
        },
    ];

    public icon: string = 'peoples';
    public previewTitle: string = 'change-shift';
    public title: string = '';

    public comments: ShiftComment[] = [];
    public aboutWidget: IWidgets;
    public currentShift: Shift = null;
    public presentMembers: ShiftMember[] = null;
    public absentMembers: ShiftMember[] = null;
    public addingShiftMembers: ShiftMember[] = [];
    public brigadeId: number;

    private subscriptions: Subscription[] = [];

    static itemCols: number = 16;
    static itemRows: number = 30;

    constructor(
        private widgetService: NewWidgetService,
        private shiftService: ShiftService,
        private snackBar: MatSnackBar,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscriptions.push(
            this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
                this.aboutWidget = data;
                this.title = this.aboutWidget.title;
                try {
                    this.setRealtimeData(
                        this.aboutWidget.widgetType,
                        this.shiftService.shiftPass.getValue()
                    );
                } catch {}
            })
        );
        this.subscriptions.push(
            this.shiftService.shiftPass.subscribe((data) => {
                if (this.aboutWidget) {
                    this.setRealtimeData(this.aboutWidget.widgetType, data);
                }
            })
        );
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {
        if (this.subscriptions) {
            for (const subscribe of this.subscriptions) {
                subscribe.unsubscribe();
            }
        }
    }

    private setRealtimeData(widgetType, data): void {
        if (!widgetType || !data) {
            return;
        }
        if (widgetType === 'shift-pass') {
            this.currentShift = data.passingShift;
        } else {
            this.currentShift = data.acceptingShift;
            console.log(this.currentShift);
        }

        if (this.currentShift.shiftMembers) {
            let index = this.currentShift.shiftMembers.findIndex(
                (item) => item.position === 'responsible'
            );
            if (index === -1) {
                console.warn('No responsible found in shift: ' + JSON.stringify(this.currentShift));
                index = 0;
            }

            this.currentShift.shiftMembers[index].employee.main = true;
            const tempMember = this.currentShift.shiftMembers[0];
            this.currentShift.shiftMembers[0] = this.currentShift.shiftMembers[index];
            this.currentShift.shiftMembers[index] = tempMember;

            this.comments = [];
            if (widgetType === 'shift-pass') {
                for (const commentObj of this.currentShift.shiftPassingComments || []) {
                    this.setMessage(commentObj);
                }
            } else {
                for (const commentObj of this.currentShift.shiftAcceptingComments || []) {
                    this.setMessage(commentObj);
                }
            }
        }

        this.absentMembers = this.currentShift.shiftMembers.filter((el) => el.status === 'absent');
        this.presentMembers = this.currentShift.shiftMembers.filter((el) => el.status !== 'absent');
    }

    getDisplayPosition(code): string {
        if (code) {
            return this.mapPosition.find((el) => el.code === code).name;
        }
    }

    async onSendMessage(): Promise<void> {
        if (this.input.nativeElement.value) {
            const comment = await this.shiftService.sendComment(
                this.currentShift.shiftMembers.find((el) => el.position === 'responsible').employee
                    .id,
                this.currentShift.id,
                this.input.nativeElement.value,
                this.aboutWidget.widgetType
            );
            this.setMessage(comment);
        }
        setTimeout(() => {
            this.scrollBottom();
        }, 50);
    }

    private setMessage(comment: ShiftComment): void {
        this.comments.push(comment);
        try {
            this.input.nativeElement.value = '';
        } catch {}
    }

    onEnterPush(event?: any): void {
        if (event.keyCode === 13) {
            this.onSendMessage();
        }
    }

    scrollBottom(): void {
        this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
    }

    getMain(): ShiftMember {
        if (this.currentShift) {
            return this.currentShift.shiftMembers.find((item) => item.employee.main);
        }
    }

    showPeople(): void {
        const classes: DOMTokenList = this.addShift.nativeElement.classList;
        if (classes.contains('onShift__add-active')) {
            classes.remove('onShift__add-active');
            this.allPeople.nativeElement.classList.remove('onShift__allPeople-active');
        } else {
            this.showFreeShiftMembers();
            classes.add('onShift__add-active');
            this.allPeople.nativeElement.classList.add('onShift__allPeople-active');
        }
    }

    @HostListener('document:changeShift_clickAddBtn', ['$event'])
    removeAddPeople(event): void {
        const classes: DOMTokenList = this.addShift.nativeElement.classList;
        if (classes.contains('onShift__add-active')) {
            classes.remove('onShift__add-active');
            this.allPeople.nativeElement.classList.remove('onShift__allPeople-active');
        }
    }

    async showFreeShiftMembers(): Promise<void> {
        const tempShiftMembers = await this.shiftService.getFreeShiftMembers(this.currentShift.id);
        this.addingShiftMembers.splice(0, this.addingShiftMembers.length);
        for (const i in tempShiftMembers) {
            const addingShiftMember: ShiftMember = new (class implements ShiftMember {
                employee = null;
                shiftType = null;
                status = null;
                position = 'common';
            })();
            addingShiftMember.employee = tempShiftMembers[i];
            this.addingShiftMembers.push(addingShiftMember);
        }
    }

    shiftApply() {
        // TODO
        const typeOfChangingShift: string =
            this.aboutWidget.widgetType === 'shift-pass' ? 'pass' : 'accept';
        this.shiftService
            .applyShift(this.currentShift.id, typeOfChangingShift)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                if (err.status === 400) {
                    const message: string = 'Выберите главного';
                    const panelClass: string = 'snackbar-red';
                    this.openSnackBar(message, panelClass);
                    console.error(err.status);
                } else {
                    console.error(err.status);
                }
            });
    }

    openSnackBar(
        msg: string = 'Операция выполнена',
        panelClass: string | string[] = '',
        msgDuration: number = 5000,
        actionText?: string,
        actionFunction?: () => void
    ): void {
        const configSnackBar = new MatSnackBarConfig();
        configSnackBar.panelClass = panelClass;
        configSnackBar.duration = msgDuration;
        const snackBarInstance = this.snackBar.open(msg, actionText, configSnackBar);
        if (actionFunction) {
            snackBarInstance.onAction().subscribe(() => actionFunction());
        }
    }

    onRefuse(): void {
        this.shiftService.getShiftInfo().then(() => {
            const currentComments: ShiftComment[] = this.currentShift.shiftAcceptingComments;
            if (currentComments.length === 0) {
                const message: string = 'Введите комментарий';
                const panelClass: string = 'snackbar-red';
                this.openSnackBar(message, panelClass);
            } else {
                alert('Have comments');
            }
        });
    }
}
