import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserSettingsService } from '../../services/user-settings.service';
import { Subscription } from 'rxjs';
import { IScreenSettings } from '../../models/user-settings.model';
import { ClaimService, EnumClaimScreens } from '../../services/claim.service';
import { ViewportScroller } from '@angular/common';
import { OverlayService } from '../../services/overlay.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { IAlertWindowModel } from '@shared/models/alert-window.model';

@Component({
    selector: 'evj-indicator-selector',
    templateUrl: './indicator-selector.component.html',
    styleUrls: ['./indicator-selector.component.scss'],
})
export class IndicatorSelectorComponent implements OnInit, OnDestroy {
    public dataScreen: IScreenSettings[] = [];

    private subscriptions: Subscription[] = [];

    public claimScreens: EnumClaimScreens[] = [];
    EnumClaimScreens = EnumClaimScreens;

    isReadyAdd: boolean = false;

    tempScreen: string = '';
    newNameScreen: string = '';
    public idScreen: number;
    public nameScreen: string;

    private timerOff: any = null;

    isShowScreens: boolean = false;

    constructor(
        private userSettings: UserSettingsService,
        private claimService: ClaimService,
        private overlayService: OverlayService,
        private snackBar: SnackBarService,
    ) {}

    ngOnInit(): void {
        this.userSettings.ScreenId = Number(localStorage.getItem('screenid'));
        this.userSettings.GetScreens();
        this.subscriptions.push(
            this.userSettings.screens$.subscribe((screens) => {
                console.log(screens);
                this.dataScreen = screens;
                this.idScreen = this.userSettings.ScreenId;
                this.LoadScreen(this.idScreen);
                this.nameScreen = this.getActiveScreen();
                for (const item of this.dataScreen) {
                    item.updateScreen = false;
                    item.isFilter = true;
                }
                console.log('update');
                this.scrollToScreenById(this.idScreen);
            }),
            this.claimService.claimScreens$.subscribe((w) => {
                this.claimScreens = w;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }

    public LoadScreen(id: number): void {
        this.userSettings.LoadScreen(id);
    }

    ScreenActive(): void {
        if (this.timerOff) {
            clearTimeout(this.timerOff);
        } else {
            if (!this.isShowScreens) {
                this.scrollToScreenById(this.idScreen);
            }
        }
        this.isShowScreens = true;
    }

    ScreenDisable(): void {
        this.timerOff = setTimeout(() => {
            this.dataScreen.forEach((screen) => {
                screen.isFilter = true;
                screen.updateScreen = false;
            });
            this.isShowScreens = false;
        }, 300);
    }

    public getActiveScreen = (): string => {
        if (this.idScreen) {
            const currentScreen = this.dataScreen.find((x) => x.id === this.idScreen);
            if (currentScreen) {
                return currentScreen.screenName;
            }
        }
        if (this.dataScreen[0]) { return this.dataScreen[0].screenName; }
    };

    setActiveScreen(screen: IScreenSettings): void {
        this.nameScreen = screen.screenName;
        this.idScreen = screen.id;
        screen.isActive = true;
    }

    onChangeAdder(): void {
        if (this.tempScreen !== '') {
            this.isReadyAdd = true;
        } else {
            this.isReadyAdd = false;
        }
    }

    public deleteScreenButton(screen: IScreenSettings): void {
        const windowsParam = {
            isShow: true,
            questionText: `Вы уверены, что хотите удалить экран "${screen.screenName}"?`,
            acceptText: 'Да',
            cancelText: 'Отменить',
            acceptFunction: () => this.deleteScreen(screen.id),
            closeFunction: () => this.overlayService.closeDashboardAlert(),
            cancelFunction: () => this.snackBar.openSnackBar(`Экран "${screen.screenName}" не удален и доступен для работы`)
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
            this.LoadScreen(this.idScreen);
        }
    }

    public updateScreenButton(screen: IScreenSettings, newName: string): void {
        const windowsParam: IAlertWindowModel = {
            isShow: true,
            questionText: `Вы уверены, что хотите изменить название экрана с "${screen.screenName}" на "${newName}"?`,
            acceptText: 'Да',
            cancelText: 'Отменить',
            acceptFunction: () => this.updateScreen(screen, newName),
            closeFunction: () => this.overlayService.closeDashboardAlert(),
            cancelFunction: () => this.snackBar.openSnackBar(`Внесенные изменения для экрана "${screen.screenName}" не сохранены`),
        };
        this.overlayService.dashboardAlert$.next(windowsParam);
    }

    public updateScreen(screen: IScreenSettings, newName: string): void {
        screen.updateScreen = false;
        this.userSettings.updateScreen(screen.id, newName);
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

    isLeaveScreen(e): void {
        // for (const item of this.dataScreen) {
        //     item.updateScreen = false;
        // }
    }
    isOverScreen(e): void {}

    public closeEdit(): void {
        this.dataScreen.forEach((el) => {
            el.updateScreen = false;
        });
    }

    public isScreenDelete(screen: IScreenSettings): boolean {
        return !!(screen.claims.find((claim) => claim.claimType === 'screenDel' ||
            claim.claimType === 'screensDel' ||
            claim.claimType === 'screenAdmin'));
    }

    public isScreenEdit(screen: IScreenSettings): boolean {
        return !!(screen.claims.find((claim) => claim.claimType === 'screensEdit' ||
            claim.claimType === 'screenEdit' ||
            claim.claimType === 'screenAdmin'));
    }

    public screensFilter(filter: string): void {
        this.dataScreen.forEach((screen) => {
            screen.isFilter = screen.screenName.toLowerCase().includes(filter.toLowerCase());
        });
    }

    private scrollToScreenById(idScreen: number): void {
        if (idScreen) {
            setTimeout(() => {
                console.log('scroll');
                console.log(this.idScreen);
                const el = document.getElementById('screen_' + this.idScreen);
                el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'end' });
                // this.viewportScroller.scrollToAnchor('screen_' + this.idScreen);
            }, 200);
        }
    }
}
