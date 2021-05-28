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
import { IPlanItem } from '@widgets/EVJ/evj-events-workspace/evj-cmid-event/cmid-event.interface';

@Injectable({
    providedIn: 'root',
})
export class CmidDictionaryService {
    private restUrl: string;
    private cmidUrl: string;
    private kdpazCards: IPlanItem[] = [];
    private reasonsCache: IDirectoryData[];

    constructor(public http: HttpClient, private configService: AppConfigService) {
        this.cmidUrl = this.configService.cmidUrl;
        this.restUrl = this.configService.restUrl;
    }

    public getKdpazCard(manufacture: string, plant: string): Observable<IPlanItem[]> {
        return (
            this.http
                .get<IPlanItem[]>(
                    `${this.restUrl}/api/cmid-kdpaz/card/position-list/manufacture/${manufacture}/unit/${plant}`
                )
                // кешируем ответ для работы поиска на фронте
                .pipe(tap((cards) => (this.kdpazCards = cards)))
        );
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

    public getManufactures(id: string = '1'): Observable<Record<string, unknown>[]> {
        // Замоканый метод
        return this.http
            .get<IReasonOfDisconnect>(`assets/mock/CMID/manufactures.json`)
            .pipe(map((manufactures) => manufactures[id]));
    }

    public getPlants(id: string = '1'): Observable<Record<string, unknown>[]> {
        // Замоканый метод
        return this.http.get<IReasonOfDisconnect>(`assets/mock/CMID/plants.json`).pipe(tap(console.log), map((plants) => plants[id]));
    }

    public getSetups(id: string): Observable<Record<string, unknown>[]> {
        // Замоканый метод
        return this.http.get<IReasonOfDisconnect>(`assets/mock/CMID/units.json`).pipe(map((units) => units[id]));
    }

    public getPositions(query: string = ''): Observable<IPlanItem[]> {
        if (query.length && this.kdpazCards.length) {
            return of(
                this.kdpazCards.filter(
                    (el) =>
                        el.positionName.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
                        el.positionDescription.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
                        el.positionId.toLowerCase().indexOf(query.toLowerCase()) > -1
                )
            );
        }
        return of(this.kdpazCards);
    }
}
