import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserSettingsService } from '../../services/user-settings.service';
import { Subscription } from 'rxjs';
import { IScreenSettings } from '../../models/user-settings.model';
import { ClaimService, EnumClaimScreens } from '../../services/claim.service';

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

    public localSaved: number;

    private timerOff: any = null;

    isShowScreens: boolean = false;

    constructor(private userSettings: UserSettingsService, private claimService: ClaimService) {}

    ngOnInit(): void {
        this.subscriptions.push(
            this.userSettings.screens$.subscribe((screens) => {
                console.log(screens);
                this.dataScreen = screens;
                this.localSaved = Number(localStorage.getItem('screenid'));
                this.LoadScreen(this.localSaved);
                this.nameScreen = this.getActiveScreen();
                for (const item of this.dataScreen) {
                    item.updateScreen = false;
                    item.isFilter = true;
                }
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

    ScreenActive(e): void {
        if (this.timerOff) {
            clearTimeout(this.timerOff);
        }
        if (this.idScreen) {
            console.log('scroll');
            console.log(this.idScreen);
            const el = document.getElementById('screen_' + this.idScreen);
            el.scrollIntoView({behavior: 'smooth'});
        }
        this.isShowScreens = true;
    }

    ScreenDisable(e): void {
        this.timerOff = setTimeout(() => {
            this.dataScreen.forEach((screen) => screen.isFilter = true);
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
        if (this.localSaved) {
            const found = this.dataScreen.find((x) => x.id === this.localSaved);
            if (found) {
                return found.screenName;
            }
        }
        if (this.dataScreen[0]) { return this.dataScreen[0].screenName; }
    };

    setActiveScreen(screen): void {
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

    public deleteScreen(id: any): void {
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

    public updateScreen(id, newName): void {
        for (const item of this.dataScreen) {
            if (item.id === id) {
                item.updateScreen = false;
            }
        }
        this.userSettings.updateScreen(id, newName);
    }

    public addScreen(): void {
        const newScreen = {
            id: 0,
            name: this.tempScreen,
            isActive: false,
        };
        this.userSettings.PushScreen(this.tempScreen);
        this.tempScreen = '';
    }

    onUpdateForm(id: number): void {
        const item = this.dataScreen.find((el) => el.id === id);
        item.updateScreen = true;
        this.newNameScreen = item.screenName;
    }

    isLeaveScreen(e): void {
        for (const item of this.dataScreen) {
            item.updateScreen = false;
        }
    }
    isOverScreen(e): void {}

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
}
