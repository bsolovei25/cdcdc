import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../services/appConfigService';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OverlayService {

    closed$ = new BehaviorSubject<boolean>(false);

    constructor() {
    }

}
