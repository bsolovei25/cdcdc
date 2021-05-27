import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { Observable, of } from 'rxjs';
import {
    IDirectoryData,
    IDirectoryRow,
    IReasonOfDisconnect,
} from '@dashboard/services/widgets/CMID/cmid-dictionary.interface';
import { map, tap } from 'rxjs/operators';

const MockPlants = {
    '1': [{ id: '1', name: 'ФСБ' }]
};

const MockSetups = {
    '1': [
        { name: 'БОВ-1', id: '1' },
        { name: 'БОВ-10', id: '1' },
        { name: 'БОВ-6А', id: '1' },
        { name: 'БОВ-7', id: '1' },
        { name: 'БОВ-8', id: '1' },
        { name: 'Водозабор 1', id: '2' },
        { name: 'Насосная 146', id: '2' },
        { name: 'Насосная тит. 146 и РП', id: '2' },
        { name: 'УПНШ', id: '2' },
        { name: 'ХБС', id: '2' }],
    '2': [
        { name: '19/3', id: '1' },
        { name: '21-10/3М', id: '2' },
        { name: 'АВТ-10', id: '3' },
        { name: 'АВТ-6', id: '2' },
        { name: 'АВТ-7', id: '2' },
        { name: 'АВТ-8, ТЭУ', id: '2' },
        { name: 'АТ-9', id: '2' },
        { name: 'БОТК', id: '2' },
        { name: 'ТЭУ', id: '2' },
        { name: 'УПНК', id: '2' },
        { name: 'ФСБ', id: '2' },
        { name: 'ЭЛОУ-7,8', id: '2' },
        { name: 'ЭЛОУ-8', id: '2' },
    ],
};

const MockManufactures = [
    { name: 'Общезаводское хозяйство - ОЗХ', id: '1' },
    { name: 'Производство №1 - ПППНБК', id: '2' },
];

const MockPositions = {
    '1': [
        {
            id: 6,
            name: 'K_DBL_FI43A',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 7,
            name: 'K_DBL_LSA1464',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 8,
            name: 'K_DBL_FRSA42B',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 9,
            name: 'K_DBL_P1_1_BL6',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 18,
            name: 'K_DBL_P1_1_BL6',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 10,
            name: 'K_DBL_P1_1_BL6',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 11,
            name: 'K_DBL_P1_1_BL6',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 12,
            name: 'K_DBL_P1_1_BL6',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 13,
            name: 'K_DBL_P1_1_BL6',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 14,
            name: 'K_DBL_P1_1_BL6',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 15,
            name: 'K_DBL_P1_1_BL6',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 16,
            name: 'K_DBL_P1_1_BL6',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
    ],
    '2': [
        {
            id: 5,
            name: 'K_DBL_TI796',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 6,
            name: 'K_DBL_FI43A',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 7,
            name: 'K_DBL_LSA1464',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 8,
            name: 'K_DBL_FRSA42B',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 9,
            name: 'K_DBL_P1_1_BL6',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 18,
            name: 'K_DBL_P1_1_BL6',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 10,
            name: 'K_DBL_P1_1_BL6',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 11,
            name: 'K_DBL_P1_1_BL6',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 12,
            name: 'K_DBL_P1_1_BL6',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 13,
            name: 'K_DBL_P1_1_BL6',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 14,
            name: 'K_DBL_P1_1_BL6',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 15,
            name: 'K_DBL_P1_1_BL6',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
        {
            id: 16,
            name: 'K_DBL_P1_1_BL6',
            description: 'Темп-ра в обратном тр/пр на теплоснабжение калориферов_л.Т2',
            position: '00341-PAZ01-PAZ-0001-K_DBL_D161',
            piTag: 'AVT10:K_DBL_D161_blk',
        },
    ]
};

@Injectable({
    providedIn: 'root',
})
export class CmidDictionaryService {
    private restUrl: string;
    private cmidUrl: string;
    private reasonsCache: IDirectoryData[];

    constructor(public http: HttpClient, private configService: AppConfigService) {
        this.cmidUrl = this.configService.cmidUrl;
        this.restUrl = this.configService.restUrl;
    }

    public getKdpazCard(manufacture: string, plant: string): Observable<any> {
        return this.http
            .get(`${this.restUrl}/api/cmid-kdpaz/card/position-list/${manufacture}/plant/${plant}`)
            .pipe(tap(console.log));
    }

    public getTypeOfReason(): Observable<IDirectoryData[]> {
        if (this.reasonsCache) {
            // Отдаем по следующему запросу кешированную копию ответа
            return of(this.reasonsCache);
        }

        // Кешируем список причин
        // return this.http.get<IReasonOfDisconnect>(`${this.restUrl}/api/Card/getReasonOfDisconnectionCard`)
        //     .pipe(map(reasonsOfDisconnect => reasonsOfDisconnect.directoryData),
        //         tap(directoryData => this.reasonsCache = directoryData ));

        // Замоканый метод
        return this.http.get<IReasonOfDisconnect>(`assets/mock/KPE/directory-object.json`).pipe(
            map((reasonsOfDisconnect) => reasonsOfDisconnect.directoryData),
            tap((directoryData) => (this.reasonsCache = directoryData))
        );
    }

    public getReasonOfDisconnection(id: string = null): Observable<IDirectoryRow[]> {
        if (id) {
            return of(this.reasonsCache.find((el) => el.id === id)?.rows);
        }

        return of([]);
    }

    public getManufactures(): Observable<any> {
        return of(MockManufactures);
    }

    public getPlants(id: string): Observable<any> {
        return of(MockPlants[id]);
    }

    public getSetups(id: string): Observable<any> {
        return of(MockSetups[id]);
    }

    public getPositions(id: string, query: string = ''): Observable<any> {
        if (query) {
            return of(MockPositions[id].filter(position => position.name.toLowerCase().indexOf(query.toLowerCase()) > -1));
        }
        return of(MockPositions[id]);
    }
}
