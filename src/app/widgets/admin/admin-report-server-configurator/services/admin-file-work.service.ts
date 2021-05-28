import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IChildrenFolder, IFolder, ITemplate, ITemplateFolder } from '@dashboard/models/ADMIN/report-server.model';

@Injectable({
    providedIn: 'root',
})
export class AdminFileWorkService {
    public foldersWork$: BehaviorSubject<ITemplateFolder[] | IChildrenFolder[] | IFolder>
        = new BehaviorSubject<ITemplateFolder[] | IChildrenFolder[] | IFolder>(null);
    public reportsWork$: BehaviorSubject<ITemplate[]> = new BehaviorSubject<ITemplate[]>(null);
    public addressWork$: BehaviorSubject<ITemplateFolder> = new BehaviorSubject<ITemplateFolder>(null);

    constructor() {
    }
}
