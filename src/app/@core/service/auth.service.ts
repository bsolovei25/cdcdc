// Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// RxJS
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/appConfigService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from '../../dashboard/models/events-widget';
import { SnackBarService } from '../../dashboard/services/snack-bar.service';

import { JSEncrypt } from 'jsencrypt';
// Local modules

export interface ITokenData extends IUser {
    token: string;
}

@Injectable({
    providedIn: 'root', // singleton service
})
export class AuthService {

    private privateKey: string = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDObZtjxfplZYRgo6TKZM9E6b3RVQpXTpKTOiqefTKEpT9//ru1
x0rHgqpsjcw1BoXFX3SuYRPn3ijCM/C9WHnc2PDjEgGu0KezIxvqE7nCjbHed7pf
f6fov6ZajFsiwcf2r3oOwCjWMW1ChHP0ZYF2Ai1HmInarJutHTwE+Elb3QIDAQAB
AoGAHLkVmRFwIPG6NLQwdtUGHiGj/t+lW7acII5EZd8ny1su9cFdHxMG7bHZwtcM
JgitTmRU2Pq7CVVZOIR/p+kKs5cPE6gH5UGlYi0MTZV3sD4hSWMRs+baNiRkaWLE
COxk0o4Xe80StheoL89K2dIwFrc28BAowdvrHHjeqvYRsgECQQDymDTCXjoHGAhG
T77gnAVmOY9QsB00mIeVxC06LHwC1TfM51k8QgalUDIp/pxaCZp5F0l4Uy2Tzg+B
phr2+OVdAkEA2dXIh0rSJM8zw312MJT5YFwNkDpgmMN/aN1FPAVHtLVoMn8d7p8p
w7DUEQ5sl+Sk5XwWWa9AEckkG3SRW3BogQJBAL5Flwvj78tklAjhvypX9PwqpTd6
Ck4YXC+hQH/iKBnote1mftz+REwgzFeXtXYBFkFnfF59jr/g3NSpPXj72pkCQCan
LZ78Is/PSIMexxMVzC5SB0IZabyRrBECel+NHE0vh162eaw25+VGgkrIgXJuaugh
naGqXDcLtvF8PLK5/oECQQDkQl/IAPBbI5QXLmfiseu7duRtZ9px/7HYDOEDtjia
sOyBGW2Ml7FYxYTPJX6uIhxfIpX1Bt1Kdtue3Wu3OMRC
-----END RSA PRIVATE KEY-----`;

    private publicKey: string = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDObZtjxfplZYRgo6TKZM9E6b3R
VQpXTpKTOiqefTKEpT9//ru1x0rHgqpsjcw1BoXFX3SuYRPn3ijCM/C9WHnc2PDj
EgGu0KezIxvqE7nCjbHed7pff6fov6ZajFsiwcf2r3oOwCjWMW1ChHP0ZYF2Ai1H
mInarJutHTwE+Elb3QIDAQAB
-----END PUBLIC KEY-----`;

    $encrypt: any; // JSEncrypt

    private authTokenData: ITokenData | null;
    private restUrl: string;

    user$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

    get userIsAuthenticated(): boolean {
        return this.authTokenData !== null;
    }

    get userSessionToken(): string | null {
        const storageToken: string | null = localStorage.getItem('authentication-token');
        return this.authTokenData ? this.authTokenData.token : storageToken;
    }

    constructor(
        private router: Router,
        private http: HttpClient,
        private configService: AppConfigService,
        private materialController: SnackBarService
    ) {
        // this.restUrl = configService.restUrl;
        this.configService.restUrl$.subscribe((value) => {
            this.restUrl = value;
        });
        this.$encrypt = new JSEncrypt();
    }

    async authenticate(username: string, password: string): Promise<ITokenData> {
        const encryptPass = this.encrypt(password);
        try {
            const auth = await this.http
                .post<ITokenData>(this.restUrl + `/api/user-management/auth`, {
                    username,
                    password,
                })
                .toPromise();
            this.configureUserAuth(auth);
            return auth;
        } catch (error) {
            if (error.status === 0) {
                this.materialController.openSnackBar('Сервер не отвечает');
            } else {
                this.materialController.openSnackBar(
                    'Ошибка авторизации, неверный логин или пароль, обратитесь к системному администратору!'
                );
            }
            console.error(error);
        }
    }

    async resetPassword(password: string, oldPassword: string): Promise<ITokenData> {
        const encryptPass = this.encrypt(password);
        const encryptOldPass = this.encrypt(oldPassword);
        const body = {
            username: this.user$.getValue().login,
            password,
            oldPassword
        };
        return await this.http
            .post<ITokenData>(this.restUrl + `/api/user-management/user/${this.user$.getValue().id}/password`, body)
            .toPromise();
    }

    async getUserAuth(): Promise<ITokenData> | null {
        if (!this.restUrl) {
            return null;
        }

        let current: ITokenData;

        // Try get current by token
        try {
            if (this.userSessionToken) {
                current = await this.http
                    .get<ITokenData>(this.restUrl + '/api/user-management/current')
                    .toPromise();
                this.configureUserAuth(current);
                return current;
            }
        } catch (error) {
            console.warn(error);
        }

        // If not loaded by token, try with Windows auth
        try {
            current = await this.http
                .get<ITokenData>(this.restUrl + '/api/user-management/windows-current', {
                    withCredentials: true,
                })
                .toPromise();

            this.configureUserAuth(current);
            return current;
        } catch (error) {
            this.router.navigate(['login']);
            this.materialController.openSnackBar(
                'Ошибка авторизации, неудачная попытка Windows аутентификации, обратитесь к системному администратору!'
            );
            console.warn(error);
        }
        return null;
    }

    private configureUserAuth(tokenData: ITokenData): void {
        this.user$.next(tokenData);

        if (!tokenData.token) return;

        this.authTokenData = tokenData;
        // save token
        localStorage.setItem('authentication-token', this.authTokenData.token);
    }

    private resetUserAuth(clearTokenFromStorage?: boolean): void {
        this.authTokenData = null;
        this.user$.next(null);
        if (clearTokenFromStorage) {
            localStorage.removeItem('authentication-token');
        }
    }

    async logOut(): Promise<void> {
        try {
            this.resetUserAuth(true);
        } catch (error) {
            console.error(error);
        }
    }

    private encrypt(msg: string): string {
        const text = `${msg}`.trim();
        if (text.length > 117) {
            console.error('Error pass length');
            return null;
        } else {
            this.$encrypt.setPublicKey(this.publicKey);
            return this.$encrypt.encrypt(text);
        }
    }
    private decrypt(msg: string): string {
        this.$encrypt.setPrivateKey(this.privateKey);
        const sourceMsg = this.$encrypt.decrypt(msg);
        if (!sourceMsg) {
            console.error('decrypt failed');
            return null;
        }
        return sourceMsg;
    }
}
