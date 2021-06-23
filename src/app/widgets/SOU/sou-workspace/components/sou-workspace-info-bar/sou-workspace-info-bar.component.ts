import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SouStreamsService } from '@dashboard/services/widgets/SOU/sou-streams.service';
import { ISouStreamsClient, ISouStreamsObject, ISouStreamsSingleObject } from '@dashboard/models/SOU/sou-streams.model';

@Component({
    selector: 'evj-sou-workspace-info-bar',
    templateUrl: './sou-workspace-info-bar.component.html',
    styleUrls: ['./sou-workspace-info-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SouWorkspaceInfoBarComponent implements OnInit {

    @Input() data: {};

    public objectType: 'Tank'|'Unit';

    // dropdowns
    public clients: ISouStreamsClient[];
    public clientObjects: ISouStreamsClient[];
    public objectProducts: string[];
    public formGroup: FormGroup;

    constructor(
        public souStreamsService: SouStreamsService,
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.loadClients();
        this.loadClientObjects();
        this.loadObjectProducts();
    }

    public get isValid(): boolean {
        return this.formGroup?.valid;
    }

    public get selectedClient(): ISouStreamsClient {
        return this.clients?.find(c => c.id === this.formGroup?.value?.clientId);
    }

    public get selectedClientObject(): ISouStreamsObject {
        const selectedObjectId = this.formGroup?.get('clientObjectId')?.value;
        return this.clientObjects?.find(o => o.id === selectedObjectId);
    }

    public get selectedProductName(): string {
        return this.formGroup?.value?.objectProductId;
    }

    private initForm(): void {
        this.formGroup = new FormGroup({
            clientId: new FormControl(null),
            clientObjectId: new FormControl(null),
            objectProductId: new FormControl(null),
        });

        this.formGroup
            .get('clientId')
            .valueChanges
            .subscribe(() => {
                this.formGroup.get('clientObjectId').reset(null);
                this.formGroup.get('objectProductId').reset(null);
                this.clientObjects = [];
                this.objectProducts = [];
                this.loadClientObjects();
            });

        this.formGroup
            .get('clientObjectId')
            .valueChanges
            .subscribe(() => {
                this.formGroup.get('objectProductId').reset(null);
                this.objectProducts = [];
                this.loadObjectProducts();
                this.updateObjectType();
            });
    }

    private loadClients(): void {
        this.souStreamsService
            .getClients()
            .subscribe((resp: ISouStreamsClient[]) => {
                this.clients = resp;
            });
    }

    private loadClientObjects(): void {
        const clientId = this.formGroup?.get('clientId').value;

        if (clientId) {
            this.souStreamsService
                .getClientObjects(clientId)
                .subscribe((resp: ISouStreamsObject[]) => {
                    this.clientObjects = resp;
                });
        }
    }

    private loadObjectProducts(): void {
        const objectName = this.selectedClientObject?.objectName;

        if (objectName) {
            this.souStreamsService
                .getObjectProducts(objectName)
                .subscribe((resp: string[]) => {
                    this.objectProducts = resp;
                });
        }
    }

    private updateObjectType(): void {
        const objectName = this.selectedClientObject?.objectName;

        if (objectName) {
            this.souStreamsService
                .getObject(objectName)
                .subscribe((resp: ISouStreamsSingleObject) => {
                    this.objectType = resp?.objectType;
                });
        }
    }

}
