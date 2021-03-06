import { ChangeDetectionStrategy, Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, take } from 'rxjs/operators';
import { WidgetService } from '@dashboard/services/widget.service';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import {
    ISouFlowIn,
    ISouFlowOut,
    ISouManufacture,
    ISouObjects,
    ISouOptions,
    ISOUSection,
    ISouSection,
    ISouSingleUnit,
    ISouUnit,
} from '@dashboard/models/SOU/sou-operational-accounting-system.model';
import { SouMvpMnemonicSchemeService } from '@dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';
import { animationsArray } from './sou-mvp-mnemonic-scheme.animations';
import { SouMvpMnemonicSchemeFooterComponent } from './components/sou-mvp-mnemonic-scheme-footer/sou-mvp-mnemonic-scheme-footer.component';
import { SouMvpMnemonicSchemeViewComponent } from './components/sou-mvp-mnemonic-scheme-view/sou-mvp-mnemonic-scheme-view.component';

interface ISouSelectionOptionsForm {
    manufacture: string;
    unit: string;
    section: string;
}

interface ISouSelectionOptions {
    manufactures$: Observable<ISouManufacture[]>;
    units$: Observable<ISouUnit[]>;
    // sections$: Observable<ISouSection[]>;
}

interface ISouSubchannel {
    id: string;
    name: SouSubchannelType;
    manufactureName: string;
    unitName: string;
    sectionName?: string;
}

type SouSubchannelType = 'sou-section' | 'sou-operational-accounting-system' | 'sou_tank_group' | 'sou_tank';
type SouMvpMnemonicSchemeView = 'ab' | 'vb' | 'izomalk' | 'svg' | null;

@Component({
    selector: 'evj-sou-mvp-mnemonic-scheme',
    templateUrl: './sou-mvp-mnemonic-scheme.component.html',
    styleUrls: ['./sou-mvp-mnemonic-scheme.component.scss'],
    animations: animationsArray,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SouMvpMnemonicSchemeComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public readonly footerComponent: typeof SouMvpMnemonicSchemeFooterComponent = SouMvpMnemonicSchemeFooterComponent;
    public readonly viewComponent: typeof SouMvpMnemonicSchemeViewComponent = SouMvpMnemonicSchemeViewComponent;

    public readonly settings: string[] = ['????????????????????', '???? ??????', '??????????????????'];
    public readonly sectionNameMaxLengthTruncate: number = 14;
    private readonly emptyGuid: string = '00000000-0000-0000-0000-000000000000';

    // ??????-?????????? ?? ????????????????????
    subChannels$: BehaviorSubject<ISouSubchannel[]> = new BehaviorSubject<ISouSubchannel[]>([]);
    sectionSubchannel$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    footerSubchannel$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    optionsGroup: FormGroup = new FormGroup({
        manufacture: new FormControl(null),
        unit: new FormControl(null),
        section: new FormControl(null),
    });
    options$: BehaviorSubject<ISouOptions> = new BehaviorSubject<ISouOptions>({ manufactures: [] } as ISouOptions);
    selectionOptions: ISouSelectionOptions = {
        manufactures$: this.options$.pipe(
            map((x) => {
                return x.manufactures;
            })
        ),
        units$: combineLatest([this.options$, this.optionsGroup.valueChanges]).pipe(
            map(([options, group]) => options?.manufactures?.find((x) => x.name === group?.manufacture)?.units ?? [])
        ),
        // sections$: combineLatest([this.options$, this.optionsGroup.valueChanges]).pipe(
        //     map(
        //         ([options, group]) =>
        //             options
        //                 ?.manufactures
        //                 ?.find((x) => x.name === group?.manufacture)
        //                 ?.units
        //                 ?.find((x) => x.id === group?.unit)
        //                 ?.section
        //             ?? []
        //     )
        // )
    };
    public currentUnit$: BehaviorSubject<ISouSingleUnit> = new BehaviorSubject<ISouSingleUnit>(null);
    chosenSetting$: Observable<number>;

    // ???????????????????? ?????? ??????????????????????
    schemeView$: BehaviorSubject<SouMvpMnemonicSchemeView> = new BehaviorSubject<SouMvpMnemonicSchemeView>(null);

    flowInAb: ISouFlowIn[];
    flowInVb: ISouFlowIn[];
    sectionsData: (ISouFlowOut | ISouFlowIn | ISouObjects)[] = []; // ???????????? ???????? ??????????????????
    sectionsDataIzo: (ISouFlowOut | ISouFlowIn | ISouObjects)[] = []; // ???????????? ???????? ?????????????????? ????????????????
    sectionsDataPark: (ISouFlowOut | ISouFlowIn | ISouObjects)[] = [];

    constructor(
        public widgetService: WidgetService,
        public mvpService: SouMvpMnemonicSchemeService,
        private injector: Injector,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
        this.widgetIcon = 'reference';
    }

    ngOnInit(): void {
        super.widgetInit();
        this.mvpService.getConfigs().then();

        this.subscriptions.push(
            combineLatest([this.mvpService.redirectId$, this.subChannels$])
                .pipe(
                    filter((ref) => !!ref[0] && !!ref[1]),
                    map((ref) => ref[0])
                )
                .subscribe(this.redirect.bind(this)),
            // ?????????????????? ??????????
            this.optionsGroup.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((x) => {
                this.mvpService.closePopup();
                this.setSubchannelBySelection(x.section, x.unit);
                // ???????????? ??????
                this.schemeView$.next(this.getViewType(x));
                this.mvpService.selectedOptions$.next(this.getWsOptions(x));
                this.stateController().save(x);
                this.setDefaultSection(x);
            }),
            this.optionsGroup.get('manufacture').valueChanges.subscribe((x) => {
                this.optionsGroup.get('unit').setValue(null);
            }),
            this.optionsGroup.get('unit').valueChanges.subscribe((x) => {
                this.optionsGroup.get('section').setValue(null);
                this.currentUnit$.next(null);
            })
        );
        this.chosenSetting$ = this.mvpService.chosenSetting$;
        this.redirectToSectionNameIfNeed();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.widgetService.getAvailableChannels<ISouSubchannel>(this.widgetId).then((x) => {
            this.subChannels$.next(x);
            console.log('subchannels', x);
        });
        this.loadState();
    }

    protected dataHandler(ref: ISouOptions | { section: ISOUSection[] }): void {
        if ('manufactures' in ref) {
            this.options$.next({ ...ref });
        }
        if ('section' in ref) {
            const flowIn = ref.section?.flatMap((x) => x.flowIn) ?? [];
            const sectionsData = ref.section?.flatMap((x) => [...x.flowIn, ...x.flowOut, ...x.objects]) ?? [];

            sectionsData?.forEach((x) => {
                if (x.linkId === this.emptyGuid) {
                    delete x.linkId;
                }
            });
            this.mvpService.data$.next({
                name: ref?.section?.[0]?.name ?? '',
                flowIn,
                sectionsData,
            });
            this.mvpService.currentSection$.next(ref.section?.[0]);
        }
        if ('sections' in ref) {
            this.currentUnit$.next(ref);
        }
    }

    public getInjector = (widgetId: string, channelId: string, viewType: SouMvpMnemonicSchemeView = null): Injector => {
        const sectionId = this.optionsGroup.get('section').value;
        const unitId = this.optionsGroup.get('unit').value;

        return Injector.create({
            providers: [
                { provide: 'widgetId', useValue: widgetId },
                { provide: 'channelId', useValue: channelId },
                { provide: 'viewType', useValue: viewType },
                { provide: 'unitName', useValue: this.getUnitNameById(unitId) },
                { provide: 'svgName', useValue: this.getSvgNameBySectionId(sectionId) },
            ],
            parent: this.injector,
        });
    };

    // ?????????????? ?????????????????? ??????
    private getViewType(form: ISouSelectionOptionsForm): SouMvpMnemonicSchemeView {
        if (!form) {
            return null;
        }

        const manufactureName = form.manufacture?.toLowerCase();
        const unitName = this.options$.value.manufactures
            ?.flatMap((x) => x.units)
            ?.find((x) => x.id === form.unit)
            ?.name?.toLowerCase();
        const sectionName = this.options$.value.manufactures
            ?.flatMap((x) => x.units)
            ?.flatMap((x) => x.section)
            ?.find((x) => x.id === form.section)
            ?.name?.toLowerCase();

        if (!manufactureName || !unitName || !sectionName) {
            return null;
        } else if (sectionName.includes('??????????????')) {
            return 'izomalk';
        } else if (sectionName.includes('????')) {
            return 'ab';
        } else if (sectionName.includes('????')) {
            return 'vb';
        } else {
            return 'svg';
        }
    }

    private setSubchannelBySelection(sectionId: string, unitId: string): void {
        const subchannels = this.subChannels$.getValue();
        const subchannelSection = subchannels.find((x) => x.id === sectionId);
        const unit = this.options$.value.manufactures?.flatMap((x) => x.units)?.find((x) => x.id === unitId);
        this.sectionSubchannel$.next(subchannelSection?.id);
        if (unit?.balance === 'main') {
            const subchannel = subchannels.find((x) => x.unitName === unit?.name);
            // console.log('subchannel', subchannel);
            // console.log('unit', unit?.name);
            this.footerSubchannel$.next(subchannel?.id);
        } else if (unit?.balance === 'section') {
            this.footerSubchannel$.next('section');
        }
    }

    private getWsOptions(form: ISouSelectionOptionsForm): { manufacture: string; unit: string; section: string } {
        const unit = this.currentUnit$?.value;
        const section = unit?.sections?.find((x) => x.id === form.section);

        return {
            manufacture: form.manufacture,
            unit: unit?.name,
            section: section?.name,
        };
    }

    private setDefaultSection(form: ISouSelectionOptionsForm): void {
        if (!!form.section) {
            return;
        }
        const reference = this.options$.getValue();
        const sections = reference?.manufactures?.flatMap((x) => x.units)?.find((x) => x.id === form.unit)?.section;
        if (sections?.length === 1) {
            this.optionsGroup.get('section').setValue(sections[0].id);
        }
    }

    private getUnitNameById(unitId: string): string {
        return this.options$.value.manufactures?.flatMap((x) => x.units)?.find((x) => x.id === unitId)?.name ?? null;
    }

    private getSvgNameBySectionId(sectionId: string): string {
        return (
            this.options$.value.manufactures
                ?.flatMap((m: ISouManufacture) => m.units)
                ?.flatMap((u: ISouUnit) => u.section)
                ?.find((s: ISouSection) => s.id === sectionId)?.svgName ?? null
        );
    }

    private redirect(sectionId: string): void {
        this.mvpService.dropRedirectMnemonic();

        this.waitForOptionsReady().then(() => {
            const unit: string = this.options$?.value?.manufactures
                ?.flatMap((x) => x.units)
                ?.find((x) => x?.section?.findIndex((s) => s.id === sectionId) !== -1)?.id;
            const manufacture: string = this.options$?.value?.manufactures?.find(
                (x) => x.units?.findIndex((u) => u?.id === unit) !== -1
            )?.name;

            if (!manufacture || !unit || !sectionId) {
                console.warn('redirect mnemonic: no such reference', sectionId);
                return;
            }
            this.optionsGroup.get('manufacture').setValue(manufacture);
            this.optionsGroup.get('unit').setValue(unit);
            this.optionsGroup.get('section').setValue(sectionId);
        });
    }

    private stateController(): { save; load } {
        const key: string = 'sou-scheme-options';
        // tslint:disable-next-line:no-shadowed-variable
        const saveState = (state: ISouSelectionOptionsForm): void => {
            const saveValue = JSON.stringify(state);
            localStorage.setItem(key, saveValue);
        };
        const loadState = (): ISouSelectionOptionsForm => {
            return JSON.parse(localStorage.getItem(key));
        };
        return {
            save: saveState,
            load: loadState,
        };
    }

    private loadState(): void {
        const res = this.stateController().load() as ISouSelectionOptionsForm;
        if (!res) {
            return;
        }
        this.optionsGroup.get('manufacture').setValue(res.manufacture);
        this.optionsGroup.get('unit').setValue(res.unit);
        this.optionsGroup.get('section').setValue(res.section);
    }

    public changeSettings(index: number): void {
        this.mvpService.chosenSetting$.next(index);
    }

    private waitForOptionsReady(): Promise<ISouOptions> {
        return new Promise<ISouOptions>((resolve, reject) => {
            this.options$
                .pipe(
                    filter((value: ISouOptions) => {
                        return value?.manufactures?.length !== 0;
                    }),
                    take(1)
                )
                .subscribe(resolve, reject);
        });
    }

    // ???????? ???????? ???????????? ???????????????? ????????????, ?? ?????????????? ?????????? ?????????????? ????????????????
    private redirectToSectionNameIfNeed(): void {
        if (this.mvpService.sectionNameForRedirect) {
            this.waitForOptionsReady()
                .then((options: ISouOptions) => {
                    const section = options?.manufactures
                        ?.flatMap((m: ISouManufacture) => m.units)
                        ?.flatMap((u: ISouUnit) => u.section)
                        ?.find((s: ISouSection) => s.name === this.mvpService.sectionNameForRedirect);

                    if (section?.id) {
                        this.redirect(section.id);
                    }

                    this.mvpService.sectionNameForRedirect = null;
                })
                .catch(() => {
                    this.mvpService.sectionNameForRedirect = null;
                });
        }
    }
}
