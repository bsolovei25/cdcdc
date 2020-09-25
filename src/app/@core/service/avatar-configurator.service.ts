import { Injectable } from '@angular/core';
import { AppConfigService } from '@core/service/app-config.service';

@Injectable({
    providedIn: 'root',
})
export class AvatarConfiguratorService {
    public readonly defaultAvatarPath: string = 'assets/icons/widgets/admin/default_avatar2.svg';

    constructor(private configService: AppConfigService) {}

    public getAvatarPath(photoId: string): string {
        if (photoId) {
            return `${this.configService.restUrl}/api/file-storage/${photoId}`;
        }
        return this.defaultAvatarPath;
    }
}
