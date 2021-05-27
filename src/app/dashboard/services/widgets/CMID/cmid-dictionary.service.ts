import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppConfigService } from "@core/service/app-config.service";
import { Observable, of } from "rxjs";
import { IDirectoryData, IDirectoryRow, IReasonOfDisconnect } from "@dashboard/services/widgets/CMID/cmid-dictionary.interface";
import { map, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class CmidDictionaryService {
    private restUrl: string;
    private reasonsCache: IDirectoryData[];

    constructor(public http: HttpClient, private configService: AppConfigService) {
        this.restUrl = this.configService.cmidUrl;
    }

    public getTypeOfReason(): Observable<IDirectoryData[] > {
        if (this.reasonsCache) {
            // Отдаем по следующему запросу кешированную копию ответа
            return of(this.reasonsCache);
        }

        // Кешируем список причин
        // return this.http.get<IReasonOfDisconnect>(`${this.restUrl}/api/Card/getReasonOfDisconnectionCard`)
        //     .pipe(map(reasonsOfDisconnect => reasonsOfDisconnect.directoryData),
        //         tap(directoryData => this.reasonsCache = directoryData ));

        // Замоканый метод
        return this.http.get<IReasonOfDisconnect>(`assets/mock/KPE/directory-object.json`)
            .pipe(map(reasonsOfDisconnect => reasonsOfDisconnect.directoryData),
                tap(directoryData => this.reasonsCache = directoryData ));
    }

    public getReasonOfDisconnection(id: string = null): Observable<IDirectoryRow[]> {
        if (id) {
            return of(this.reasonsCache.find((el) => el.id === id)?.rows);
        }

        return of([]);
    }
}
