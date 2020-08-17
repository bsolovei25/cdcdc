import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AstueOnpzConsumptionIndicatorsService {

    private selectedId: BehaviorSubject<number> = new BehaviorSubject(0);
    public sharedSelectedId: Observable<number> = this.selectedId.asObservable();

    constructor() { }

    public setId(id: number): void {
        this.selectedId.next(id);
    }
}
