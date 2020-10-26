import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserSettingsService } from '../../../services/user-settings.service';
import { Subscription } from 'rxjs';
import { IScreenSettings } from '../../../models/user-settings.model';
import { ClaimService, EnumClaimScreens } from '../../../services/claim.service';
import { OverlayService } from '../../../services/overlay.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import { IAlertWindowModel } from '@shared/models/alert-window.model';
import { IInputOptions } from '@shared/models/input.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'evj-indicator-selector',
    templateUrl: './indicator-selector.component.html',
    styleUrls: ['./indicator-selector.component.scss']
})
export class IndicatorSelectorComponent implements OnInit, OnDestroy {
    public dataScreen: IScreenSettings[] = [];

    private subscriptions: Subscription[] = [];

    public claimScreens: EnumClaimScreens[] = [];
    EnumClaimScreens = EnumClaimScreens;

    isReadyAdd: boolean = false;

    //#region SEARCH_OPTIONS
    public inputOptions: IInputOptions = {
        type: 'text',
        state: 'normal',
        placeholder: 'Поиск экрана',
        isMovingPlaceholder: false,
        icon: {
            src: 'assets/icons/search-icon.svg',
            svgStyle: { 'width.px': 17, 'height.px': 17 },
            isClickable: false
        }
    };

    public searchScreen: string = '';
    //#endregion

    tempScreen: string = '';
    newNameScreen: string = '';
    public idScreen: number;
    public nameScreen: string;

    private timerOff: any = null;

    isShowScreens: boolean = false;

    constructor(
        private userSettings: UserSettingsService,
        private claimService: ClaimService,
        public overlayService: OverlayService,
        private snackBar: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
    ) {
    }

    ngOnInit(): void {
        // this.router.navigate([], { queryParams: {screenId: 1}});
        this.loadScreenInit();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }



    private loadScreenInit(): void {
        const screenIdFromRoute = this.route.snapshot.queryParamMap.get('screenId');
        if (!screenIdFromRoute) {
            let screenId: number = null;
            screenId = Number(sessionStorage.getItem('screenid'));
            if (!screenId) {
                screenId = Number(localStorage.getItem('screenid'));
            }
            this.userSettings.ScreenId = screenId;
        } else {
            this.userSettings.ScreenId = Number(screenIdFromRoute);
        }
        this.subscriptions.push(
            this.userSettings.screensShared.subscribe((screens) => {
                if (!screens?.length) {
                    this.idScreen = undefined;
                    this.nameScreen = 'СОЗДАЙТЕ ЭКРАН!';
                    this.dataScreen = [];
                    this.loadScreen(this.idScreen);
                    return;
                }
                this.dataScreen = screens;
                if (this.dataScreen.findIndex((s) => s.id === this.userSettings.ScreenId) === -1) {
                    this.userSettings.ScreenId = this.dataScreen[0].id;
                }
                this.idScreen = this.userSettings.ScreenId;
                this.loadScreen(this.idScreen);
                this.nameScreen = this.getActiveScreen();
                for (const item of this.dataScreen) {
                    item.updateScreen = false;
                    item.isFilter = true;
                }

                this.scrollToScreenById(this.idScreen);
            }),
            this.claimService.claimScreens$.subscribe((w) => {
                this.claimScreens = w;
            })
        );
    }

    public loadScreen(id: number): void {
        this.userSettings.LoadScreen(id);
    }

    screenActive(): void {
        if (this.timerOff) {
            clearTimeout(this.timerOff);
        } else {
            if (!this.isShowScreens) {
                this.scrollToScreenById(this.idScreen);
            }
        }
        this.isShowScreens = true;
    }

    screenDisable(): void {
        this.timerOff = setTimeout(() => {
            this.dataScreen.forEach((screen) => {
                screen.isFilter = true;
                screen.updateScreen = false;
            });
            this.isShowScreens = false;
            this.searchScreen = '';
        }, 300);
    }

    public getActiveScreen = (): string => {
        if (this.idScreen) {
            const currentScreen = this.dataScreen.find((x) => x.id === this.idScreen);
            if (currentScreen) {
                return currentScreen.screenName;
            }
        }
        if (this.dataScreen[0]) {
            return this.dataScreen[0].screenName;
        }
    };

    setActiveScreen(screen: IScreenSettings): void {
        this.nameScreen = screen.screenName;
        this.idScreen = screen.id;
        screen.isActive = true;
    }

    onChangeAdder(): void {
        this.isReadyAdd = this.tempScreen !== '';
    }

    public deleteScreenButton(screen: IScreenSettings): void {
        const windowsParam = {
            isShow: true,
            questionText:
                `Вы уверены, что хотите удалить экран '${screen.screenName}'?`
            ,
            acceptText: 'Да',
            cancelText: 'Отменить',
            acceptFunction: () => this.deleteScreen(screen.id),
            closeFunction: () => this.overlayService.closeDashboardAlert(),
            cancelFunction: () =>
                this.snackBar.openSnackBar(
                    `Экран '${screen.screenName}' не удален и доступен для работы`
                )
        };
        this.overlayService.dashboardAlert$.next(windowsParam);
    }

    public deleteScreen(id: number): void {
        this.userSettings.deleteScreen(id);
        for (const item of this.dataScreen) {
            if (item.id === Number(id)) {
                this.dataScreen.splice(this.dataScreen.indexOf(item), 1);
            }
        }
        if (this.idScreen === Number(id)) {
            this.nameScreen = this.dataScreen[0].screenName;
            this.idScreen = this.dataScreen[0].id;
            this.loadScreen(this.idScreen);
        }
    }

    public updateScreenButton(screen: IScreenSettings, newName: string): void {
        const windowsParam: IAlertWindowModel = {
            isShow: true,
            questionText:
                `Вы уверены, что хотите изменить название экрана с '${screen.screenName}' на '${newName}'?`
            ,
            acceptText: 'Да',
            cancelText: 'Отменить',
            acceptFunction: () => this.updateScreen(screen, newName),
            closeFunction: () => this.overlayService.closeDashboardAlert(),
            cancelFunction: () =>
                this.snackBar.openSnackBar(
                    `Внесенные изменения для экрана '${screen.screenName}' не сохранены`
                )
        };
        this.overlayService.dashboardAlert$.next(windowsParam);
    }

    public updateScreen(screen: IScreenSettings, newName: string): void {
        screen.updateScreen = false;
        screen.screenName = newName;
        this.userSettings.updateScreen(screen);
    }

    public addScreen(): void {
        this.userSettings.PushScreen(this.tempScreen);
        this.tempScreen = '';
    }

    onUpdateForm(id: number): void {
        const item = this.dataScreen.find((el) => el.id === id);
        item.updateScreen = true;
        this.newNameScreen = item.screenName;
    }

    onHiddenScreen(screen: IScreenSettings): void {
        screen.isHidden = !screen.isHidden;
        this.userSettings.updateScreen(screen);
    }

    isLeaveScreen(e): void {
        // for (const item of this.dataScreen) {
        //     item.updateScreen = false;
        // }
    }

    isOverScreen(e): void {
    }

    public closeEdit(): void {
        this.dataScreen.forEach((el) => {
            el.updateScreen = false;
        });
    }

    public isScreenDelete(screen: IScreenSettings): boolean {
        return !!screen.claims.find(
            (claim) =>
                claim.claimType === 'screenDel' ||
                claim.claimType === 'screensDel' ||
                claim.claimType === 'screenAdmin'
        );
    }

    public isScreenEdit(screen: IScreenSettings): boolean {
        return !!screen.claims.find(
            (claim) =>
                claim.claimType === 'screensEdit' ||
                claim.claimType === 'screenEdit' ||
                claim.claimType === 'screenAdmin'
        );
    }

    public screensFilter(filter: string): void {
        this.searchScreen = filter;
        this.dataScreen.forEach((screen) => {
            screen.isFilter = screen.screenName.toLowerCase().includes(filter.toLowerCase());
        });
    }

    private scrollToScreenById(idScreen: number): void {
        if (idScreen) {
            setTimeout(() => {
                const el = document.getElementById('screen_' + this.idScreen);
                el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'end' });
                // this.viewportScroller.scrollToAnchor('screen_' + this.idScreen);
            }, 200);
        }
    }
}
