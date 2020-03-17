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
import { NewWidgetService } from '../../services/new-widget.service';
import {
    ICommentRequired,
    IVerifyWindow,
    Shift,
    ShiftComment,
    ShiftMember,
} from '../../models/shift.model';
import { IWidgets } from '../../models/widget.model';
import { MaterialControllerService } from '../../services/material-controller.service';
import { WidgetPlatform } from '../../models/widget-platform';

@Component({
    selector: 'evj-change-shift',
    templateUrl: './change-shift.component.html',
    styleUrls: ['./change-shift.component.scss'],
})
export class ChangeShiftComponent extends WidgetPlatform implements OnInit, OnDestroy {
    @ViewChild('input') input: ElementRef;
    @ViewChild('scroll') scroll: ElementRef;
    @ViewChild('allPeople') allPeople: ElementRef;
    @ViewChild('addShift') addShift: ElementRef;

    mapPosition: { code: string; name: string }[] = [
        {
            code: 'responsible',
            name: 'Старший оператор',
        },
        {
            code: 'common',
            name: 'Оператор',
        },
    ];

    public comments: ShiftComment[] = [];
    public currentShift: Shift = null;
    public presentMembers: ShiftMember[] = null;
    public absentMembers: ShiftMember[] = null;
    public addingShiftMembers: ShiftMember[] = [];

    public isWindowVerifyActive: boolean = false;
    public verifyInfo: IVerifyWindow = null;

    protected static itemCols: number = 16;
    protected static itemRows: number = 30;

    constructor(
        protected widgetService: NewWidgetService,
        public shiftService: ShiftService,
        private materialController: MaterialControllerService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'peoples';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.shiftService.shiftPass.subscribe((data) => {
                if (this.widgetType) {
                    this.setRealtimeData(this.widgetType, data);
                }
            })
        );
        this.subscriptions.push(
            this.shiftService.verifyWindowObservable(this.id).subscribe((obj) => {
                if (obj.action === 'close') {
                    setTimeout(() => (this.isWindowVerifyActive = false), 1000);
                } else if (obj.action === 'open') {
                    this.verifyInfo = obj;
                    this.isWindowVerifyActive = true;
                }
                this.verifyInfo.result = obj.result;
            })
        );
    }

    protected dataHandler(ref: any): void {
        this.shiftService.resultVerify(this.id, ref.isConfirm);
    }

    private setRealtimeData(widgetType: string, data): void {
        if (!widgetType || !data) {
            return;
        }
        if (widgetType === 'shift-pass') {
            this.currentShift = data.passingShift;
            console.log(this.currentShift);
        } else {
            this.currentShift = data.acceptingShift;
            console.log(this.currentShift);
        }

        if (this.currentShift.shiftMembers) {
            let index = this.currentShift.shiftMembers.findIndex(
                (item) => item.position === 'responsible'
            );
            if (index === -1) {
                console.warn('No responsible found in shift');
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

        this.presentMembers = this.currentShift.shiftMembers.filter(
            (el) =>
                el.status !== 'absent' && el.status !== 'initialization' && el.status !== 'missing'
        );

        this.absentMembers = this.currentShift.shiftMembers.filter(
            (el) =>
                el.status === 'absent' || el.status === 'initialization' || el.status === 'missing'
        );

        console.log();
    }

    public getDisplayPosition(code): string {
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
                this.widgetType
            );
            this.setMessage(comment);
        }
        setTimeout(() => {
            this.scrollBottom();
        }, 50);
    }

    private setMessage(comment: ShiftComment): void {
        this.comments.push(comment);
        this.setRequireComment(comment.comment);
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

    public async showPeople(): Promise<void> {
        if (this.currentShift.status !== 'inProgressAccepted') {
            return;
        }
        const classes: DOMTokenList = this.addShift.nativeElement.classList;
        if (classes.contains('onShift__add-active')) {
            classes.remove('onShift__add-active');
            this.allPeople.nativeElement.classList.remove('onShift__allPeople-active');
        } else {
            await this.showFreeShiftMembers();
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

    private async showFreeShiftMembers(): Promise<void> {
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

    shiftApply(): void {
        // TODO
        const typeOfChangingShift: string = this.widgetType === 'shift-pass' ? 'pass' : 'accept';
        this.shiftService
            .applyShift(this.currentShift.id, typeOfChangingShift)
            .then((res) => {
                console.log(res);
                if (this.widgetType === 'shift-pass') {
                    this.materialController.openSnackBar('Смена передана');
                } else {
                    this.materialController.openSnackBar('Смена принята');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    public shiftCancel(): void {
        this.materialController.openSnackBar('Для продолжения оставьте комментарий');
        this.shiftService.setIsCommentRequired(true, this.widgetType);
        console.log(this.shiftService.getIsCommentRequired(this.widgetType));
        const subscription = this.shiftService
            .getRequiredComment(this.currentShift.id)
            .asObservable()
            .subscribe((ans) => {
                if (ans.result) {
                    console.log('continue');
                    this.shiftService.cancelShift(this.currentShift.id, ans.comment);
                    this.materialController.openSnackBar('Отказ от смены');
                } else {
                    console.log('cancel');
                }
                this.shiftService.setIsCommentRequired(false, this.widgetType);
                if (subscription) {
                    subscription.unsubscribe();
                }
            });
    }

    public setRequireComment(ref: string): void {
        const requiredComment: ICommentRequired = {
            idShift: this.currentShift.id,
            comment: ref,
            result: true,
        };
        this.shiftService.continueWithComment.next(requiredComment);
    }

    public unsetRequireComment(): void {
        const requiredComment: ICommentRequired = {
            idShift: this.currentShift.id,
            comment: null,
            result: false,
        };
        this.shiftService.continueWithComment.next(requiredComment);
    }
}
