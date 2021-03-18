// Angular
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PreloaderService {
    isLoad$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
}
