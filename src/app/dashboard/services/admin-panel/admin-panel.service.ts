import { Injectable } from '@angular/core';
import { IWorker } from '../../models/worker';

@Injectable({
    providedIn: 'root',
})
export class AdminPanelService {
    public activeWorker: IWorker = null;

    private defaultWorker: IWorker = {
        id: null,
        name: '',
        phone: 'Номер телефона',
        email: 'Электронная почта',
        brigade: 'Номер бригады',
        accessLevel: 'Уровень доступа',
        position: '',
    };

    constructor() {}
}
