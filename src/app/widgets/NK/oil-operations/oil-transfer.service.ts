import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IOilTransfer } from '../../../dashboard/models/oil-operations';


@Injectable({
    providedIn: 'root'
})
export class OilTransferService {

    private currentTransfer$: BehaviorSubject<IOilTransfer | null> = new BehaviorSubject<IOilTransfer>(null);
    public currentTransfer: Observable<IOilTransfer> = this.currentTransfer$.asObservable();

    public setCurrentTransfer(transferParam: IOilTransfer): void {
        this.currentTransfer$.next(transferParam);
    }
}
