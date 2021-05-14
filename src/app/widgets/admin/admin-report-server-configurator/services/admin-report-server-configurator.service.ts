import { BehaviorSubject } from "rxjs";
import { IFolder, IReportTemplate, ITemplate, ITemplateFolder } from "../models/admin-report-server-configurator.model";

export class AdminReportConfiguratorService {
  public data: IFolder;
  public reports: IReportTemplate[];
  public headerSettingsPicker: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public folders$: BehaviorSubject<ITemplateFolder[]>
    = new BehaviorSubject<ITemplateFolder[]>(null);
  public reports$: BehaviorSubject<ITemplate[]> = new BehaviorSubject<ITemplate[]>(null);
  public reportParameters$: BehaviorSubject<IReportTemplate> = new BehaviorSubject<IReportTemplate>(null);
  public address$: BehaviorSubject<ITemplateFolder> = new BehaviorSubject<ITemplateFolder>(null);
  public search$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
  ) {
  }

  public openParameters(): void {
    this.headerSettingsPicker.next(1);
  }
  public openAccessLevel(): void {
    this.headerSettingsPicker.next(2);
  }
}