import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'any',
})
export class KpeTableService {
    public selectAverageUnit$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public selectInstantUnit$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
}