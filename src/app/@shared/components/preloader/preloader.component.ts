import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PreloaderService } from '@core/service/preloader.service';

@Component({
    selector: 'evj-preloader',
    templateUrl: './preloader.component.html',
    styleUrls: ['./preloader.component.scss'],
})
export class PreLoaderComponent implements OnInit, OnDestroy {
    @Input() isHidden: boolean = false;
    isLoad: boolean = false;
    subscription: Subscription;

    @Input() set isLoading(data: boolean) {}

    constructor(private preloader: PreloaderService) {}

    ngOnInit(): void {
        this.subscription = this.preloader.isLoad$.subscribe((data) => {
            if (data) {
                // this.isHidden = data;
                this.isLoad = data;
            } else {
                this.isHidden = true;
                setTimeout(() => {
                    this.isLoad = data;
                    this.isHidden = false;
                }, 3000);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
