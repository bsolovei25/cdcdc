import { ChangeDetectionStrategy, Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import {
    ISouFlowIn,
    ISouFlowOut,
    ISouManufacture,
    ISouObjects,
    ISouOptions,
    ISouSection,
    ISouUnit,
} from '../../../dashboard/models/SOU/sou-operational-accounting-system.model';
import { SouMvpMnemonicSchemeService } from '../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
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
    sections$: Observable<ISouSection[]>;
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

    public readonly settings: string[] = ['Мгновенное', 'За час', 'Накоплено'];

    subChannels$: BehaviorSubject<ISouSubchannel[]> = new BehaviorSubject<ISouSubchannel[]>([]);
    sectionSubchannel$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    footerSubchannel$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    optionsGroup: FormGroup = new FormGroup({
        manufacture: new FormControl(null),
        unit: new FormControl(null),
        section: new FormControl(null),
    });
    options$: BehaviorSubject<ISouOptions> = new BehaviorSubject<ISouOptions>({ manufactures: [] });
    selectionOptions: ISouSelectionOptions = {
        manufactures$: this.options$.pipe(map((x) => x.manufactures)),
        units$: combineLatest([this.options$, this.optionsGroup.valueChanges]).pipe(
            map(([options, group]) => options.manufactures.find((x) => x.name === group?.manufacture)?.units ?? [])
        ),
        sections$: combineLatest([this.options$, this.optionsGroup.valueChanges]).pipe(
            map(
                ([options, group]) =>
                    options.manufactures
                        .find((x) => x.name === group?.manufacture)
                        ?.units?.find((x) => x.id === group?.unit)?.section ?? []
            )
        ),
    };
    chosenSetting$: Observable<number>;
    schemeView$: BehaviorSubject<SouMvpMnemonicSchemeView> = new BehaviorSubject<SouMvpMnemonicSchemeView>(null);

    flowInAb: ISouFlowIn[];
    flowInVb: ISouFlowIn[];
    sectionsData: (ISouFlowOut | ISouFlowIn | ISouObjects)[] = []; // Массив всех элементов
    sectionsDataIzo: (ISouFlowOut | ISouFlowIn | ISouObjects)[] = []; // Массив всех элементов Изомалка
    sectionsDataPark: (ISouFlowOut | ISouFlowIn | ISouObjects)[] = [];

    constructor(
        public widgetService: WidgetService,
        public mvpService: SouMvpMnemonicSchemeService,
        private injector: Injector,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'reference';
    }

    ngOnInit(): void {
        super.widgetInit();
        this.subscriptions.push(
            this.optionsGroup.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((x) => {
                this.mvpService.closePopup();
                this.setSubchannelBySelection(x.section, x.unit);
                this.schemeView$.next(this.getViewType(x));
                this.mvpService.selectedOptions$.next(this.getWsOptions(x));
                this.stateController().save(x);
                this.setDefaultSection(x);
            }),
            this.optionsGroup
                .get('manufacture')
                .valueChanges.subscribe((x) => this.optionsGroup.get('unit').setValue(null)),
            this.optionsGroup.get('unit').valueChanges.subscribe((x) => this.optionsGroup.get('section').setValue(null))
        );
        this.chosenSetting$ = this.mvpService.chosenSetting$;
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.widgetService.getWidgetSubchannels<ISouSubchannel>(this.widgetId).then((x) => {
            this.subChannels$.next(x);
            console.log('subchannels', x);
        });
        this.loadState();
    }

    protected dataHandler(ref: ISouOptions): void {
        this.options$.next({ ...ref });
    }

    public getInjector = (
        widgetId: string,
        channelId: string,
        viewType: SouMvpMnemonicSchemeView = null,
    ): Injector => {
        return Injector.create({
            providers: [
                { provide: 'widgetId', useValue: widgetId },
                { provide: 'channelId', useValue: channelId },
                { provide: 'viewType', useValue: viewType },
                { provide: 'unitName', useValue: this.getUnitNameById(this.optionsGroup.get('unit').value) },
            ],
            parent: this.injector,
        });
    };

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
        }
        if (unitName.includes('изомалк')) {
            return 'izomalk';
        } else if (sectionName.includes('аб')) {
            return 'ab';
        } else if (sectionName.includes('вб')) {
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
            console.log('subchannel', subchannel);
            console.log('unit', unit?.name);
            this.footerSubchannel$.next(subchannel?.id);
        } else if (unit?.balance === 'section') {
            this.footerSubchannel$.next('section');
        }
    }

    private getWsOptions(form: ISouSelectionOptionsForm): { manufacture: string; unit: string } {
        const manufacture = form.manufacture;
        const unit = this.options$.value.manufactures?.flatMap((x) => x.units)?.find((x) => x.id === form.unit)?.name;
        return { manufacture, unit };
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
}
