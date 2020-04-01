import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserSettingsService } from '../../services/user-settings.service';
import { Subscription } from 'rxjs';
import { ScreenSettings } from '../../models/user-settings.model';
import { ClaimService, EnumClaimScreens } from '../../services/claim.service';

@Component({
    selector: 'evj-indicator-selector',
    templateUrl: './indicator-selector.component.html',
    styleUrls: ['./indicator-selector.component.scss'],
})
export class IndicatorSelectorComponent implements OnInit, OnDestroy {
    public dataScreen: ScreenSettings[] = [];

    private subscriptions: Subscription[] = [];

    public claimScreens: EnumClaimScreens[] = [];
    EnumClaimScreens = EnumClaimScreens;

    isReadyAdd: boolean = false;

    tempScreen: string = '';

    newNameScreen: string = '';

    public idScreen: number;

    public nameScreen: string;

    public localSaved;

    private timerOff = null;

    isShowScreens: boolean = false;

    constructor(private userSettings: UserSettingsService, private claimService: ClaimService) {}

    ngOnInit(): void {
        this.subscriptions.push(
            this.userSettings.screens$.subscribe((dataW) => {
                console.log(dataW);
                this.dataScreen = dataW;
                this.localSaved = Number(localStorage.getItem('screenid'));
                this.LoadScreen(this.localSaved);
                this.nameScreen = this.getActiveScreen();
                for (const item of this.dataScreen) {
                    item.updateScreen = false;
                }
            }),
            this.claimService.claimScreens$.subscribe((w) => {
                this.claimScreens = w;
            })
        );
    }

    ngOnDestroy(): void {
        if (this.subscriptions.length > 0) {
            for (const subscribe of this.subscriptions) {
                subscribe.unsubscribe();
            }
        }
    }

    public LoadScreen(id: any): void {
        this.userSettings.LoadScreen(id);
    }

    ScreenActive(e) {
        if (this.timerOff) {
            clearTimeout(this.timerOff);
        }
        this.isShowScreens = true;
    }

    ScreenDisable(e) {
        this.timerOff = setTimeout(() => {
            this.isShowScreens = false;
        }, 700);
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
            this.LoadScreen(this.localSaved);
        }

        if (this.dataScreen[0]) return this.dataScreen[0].screenName;
    };

    setActiveScreen(screen) {
        this.nameScreen = screen.screenName;
        this.idScreen = screen.id;
        screen.isActive = true;
    }

    onChangeAdder() {
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

    public addScreen() {
        const newScreen = {
            id: 0,
            name: this.tempScreen,
            isActive: false,
        };
        this.userSettings.PushScreen(this.tempScreen);
        this.tempScreen = '';
    }

    onUpdateForm(id) {
        for (const item of this.dataScreen) {
            if (item.id === id) {
                item.updateScreen = true;
                this.newNameScreen = item.screenName;
            }
        }
    }

    isLeaveScreen(e) {
        for (const item of this.dataScreen) {
            item.updateScreen = false;
        }
    }
    isOverScreen(e) {}
}
