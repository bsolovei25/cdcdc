// Angular
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PreloaderService {
    isLoad$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
}
