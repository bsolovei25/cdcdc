import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    Inject,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import {
    ChangeShiftStatus,
    ChangeShiftType,
    IChangeShiftComment,
    IChangeShiftDto,
    IChangeShiftMember,
    IChangeShiftModel,
    IChangeShiftVerifier,
} from './change-shift.interfaces';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { SnackBarService } from '../../../dashboard/services/snack-bar.service';
import { ChangeShiftHelperService } from './services/change-shift-helper.service';
import { ChangeShiftKeeperService } from './services/change-shift-keeper.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, distinct, distinctUntilChanged, filter, map, take } from 'rxjs/operators';
import { ClaimService } from '@dashboard/services/claim.service';
import { ChangeShiftCommonService } from '@widgets/EVJ/change-shift/services/change-shift-common.service';

@Component({
    selector: 'evj-change-shift',
    templateUrl: './change-shift.component.html',
    styleUrls: ['./change-shift.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeShiftComponent extends WidgetPlatform implements OnInit, OnDestroy {
    @ViewChild('input') input: ElementRef;
    @ViewChild('scroll') scroll: ElementRef;

    public shift$: BehaviorSubject<IChangeShiftModel> = this.changeShiftKeeperService.shift$;
    public dates$: Observable<Date[]> = this.shift$.pipe(
        map((x) => [x?.startFact ?? new Date(), x?.endFact ?? new Date()])
    );
    public mainMember$: Observable<IChangeShiftMember> = this.shift$.pipe(
        map((x) => (x?.members ?? []).find((m) => this.changeShiftHelperService.isMainMember(m)) ?? null)
    );
    public members$: Observable<IChangeShiftMember[]> = this.changeShiftKeeperService.shift$.pipe(
        map((x) => x?.members ?? [])
    );
    public presentMembers$: Observable<IChangeShiftMember[]> = this.changeShiftKeeperService.shift$.pipe(
        map((x) => x?.members?.filter((m) => m?.user?.status !== 'absent') ?? [])
    );
    public absentsMembers$: Observable<IChangeShiftMember[]> = this.changeShiftKeeperService.shift$.pipe(
        map((x) => x?.members?.filter((m) => m?.user?.status === 'absent') ?? [])
    );
    public comments$: Observable<IChangeShiftComment[]> = this.changeShiftKeeperService.shift$.pipe(
        map((x) => (x?.comments?.length ? x.comments : []))
    );
    public isShiftApplyAvailable: Observable<boolean> = this.changeShiftKeeperService.shift$.pipe(
        map((x) => x?.status === 'acceptReady' || x?.status === 'accepted' || x?.status === 'init')
    );
    public shiftStatus$: Observable<ChangeShiftStatus> = this.shift$.pipe(map((x) => x?.status));

    public shiftType$: BehaviorSubject<ChangeShiftType> = new BehaviorSubject<ChangeShiftType>('accept');
    public unitId: number = null;

    constructor(
        protected widgetService: WidgetService,
        private materialController: SnackBarService,
        public changeShiftHelperService: ChangeShiftHelperService,
        public changeShiftKeeperService: ChangeShiftKeeperService,
        private claimService: ClaimService,
        private changeShiftCommonService: ChangeShiftCommonService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
        this.widgetIcon = 'peoples';
    }

    @HostListener('document:change-shift-update', ['$event'])
    public refreshShift(): void {
        const shiftType = this.changeShiftHelperService.getShiftTypeByName(this.widgetType);
        this.changeShiftKeeperService.loadShift(this.unitId, shiftType).then();
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.addVerifyListener();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected async dataConnect(): Promise<void> {
        super.dataConnect();
        this.changeShiftKeeperService.widgetId = this.widgetId;
        this.unitId = await this.changeShiftKeeperService.getUnitId(this.widgetId);
        const shiftType = this.changeShiftHelperService.getShiftTypeByName(this.widgetType);
        combineLatest([
            this.changeShiftCommonService.getCommonShiftId(this.unitId, shiftType),
            this.changeShiftCommonService.isRealtimeData$,
        ]).subscribe(([shift, isRealtime]: [IChangeShiftDto, boolean]) => {
            console.log(shiftType, shift);
            if (isRealtime) {
                this.changeShiftKeeperService.loadShift(this.unitId, shiftType);
                return;
            }
            if (!shift) {
                this.changeShiftKeeperService.setEmptyShift();
                return;
            }
            this.changeShiftKeeperService.loadShiftById(shift.id);
        });
        this.checkClaims(this.unitId);
        this.shiftType$.next(shiftType);
    }

    protected dataHandler(ref: { data: IChangeShiftVerifier }): void {
        this.changeShiftKeeperService.verifyAction$.next(ref?.data);
    }

    private addVerifyListener(): void {
        this.subscriptions.push(
            this.changeShiftKeeperService.verifyAction$.subscribe((value) => {
                if ((value?.type === 'shift' && value?.isConfirmed) || value.type === 'refresh') {
                    const event = new CustomEvent('change-shift-update');
                    document.dispatchEvent(event);
                }
            })
        );
    }

    private checkClaims(unitId: number): void {
        this.subscriptions.push(
            this.claimService.allUserClaims$.subscribe((x) => {
                const res = !!(
                    x.find(
                        (c) =>
                            c.claimType === 'shiftChangeStatusNotConfirm' &&
                            c.claimCategory === 'allow' &&
                            +c.value === unitId
                    ) ?? null
                );
                this.changeShiftKeeperService.isAdminClaim = res;
            })
        );
    }

    async onSendMessage(isRequired: boolean = false): Promise<void> {
        const message: string = this.input.nativeElement.value;
        if (!message) {
            return;
        }
        if (isRequired) {
            this.changeShiftKeeperService.setRequiredComment(message);
        } else {
            await this.changeShiftKeeperService.addShiftComment(message);
        }
        this.input.nativeElement.value = '';
        setTimeout(() => this.scrollBottom(), 50);
    }

    public onEnterPush(event?: KeyboardEvent): void {
        if (event.keyCode === 13) {
            this.onSendMessage().then();
        }
    }

    private scrollBottom(): void {
        this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
    }

    public shiftApply(): void {
        const type = this.shiftType$.getValue();
        if (this.changeShiftHelperService.isReadyShift(this.shift$.getValue())) {
            this.changeShiftKeeperService.applyShift(this.widgetId, null, type).then();
            return;
        }
        this.materialController.openSnackBar('Для продолжения оставьте комментарий');
        this.changeShiftKeeperService.setIsCommentRequired(true);
        this.changeShiftKeeperService.requiredComment$.pipe(take(1)).subscribe((x) => {
            if (!!x.result) {
                this.changeShiftKeeperService.applyShift(this.widgetId, x.comment, type).then();
            } else {
                this.materialController.openSnackBar('Отмена');
            }
            this.changeShiftKeeperService.setIsCommentRequired(false);
        });
    }

    public unsetRequireComment(): void {
        this.changeShiftKeeperService.setRequiredComment('', true);
    }
}
