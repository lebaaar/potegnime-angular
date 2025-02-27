import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, catchError } from 'rxjs';
import { urlConst } from 'src/app/modules/shared/enums/url.enum';
import { UserRegisterDto } from '../../models/user-register.interface';
import { UserLoginDto } from '../../models/user-login.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/modules/shared/services/token-service/token.service';
import { timingConst } from 'src/app/modules/shared/enums/toastr-timing.enum';
import { ForgotPasswordDto } from '../../models/forgot-password.interface';
import { ResetPasswordDto } from '../../models/reset-password.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private readonly http: HttpClient,
        private readonly router: Router,
        private readonly jwtHelper: JwtHelperService,
        private readonly tokenService: TokenService,
        private readonly toastr: ToastrService
    ) { }

    public register(userRegisterDto: UserRegisterDto): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<any>(`${urlConst.apiBase}/auth/register`, userRegisterDto, { headers: headers });
    };

    public login(userLoginDto: UserLoginDto): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<any>(`${urlConst.apiBase}/auth/login`, userLoginDto, { headers: headers });
    };

    public logout(): void {
        this.tokenService.deleteToken();
        this.router.navigate(['/prijava']);
        this.toastr.success('', 'Odjava uspešna', { timeOut: timingConst.success });
    }

    public unauthorizedHandler(): void {
        // Called on 401, or when page cannot be displayed
        this.tokenService.deleteToken();
        this.router.navigate(['/prijava']);
    }

    public verifyToken(): boolean {
        const token = this.tokenService.getToken();
        if (!token) {
            return false;
        }
        if (this.jwtHelper.isTokenExpired(token)) {
            return false;
        }

        return true;
    }

    public refreshToken(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.tokenService.getToken()}`
            })
        };
        return this.http.post<string>(`${urlConst.apiBase}/auth/refresh`, {}, httpOptions);
    }

    public forgotPassword(forgorPasswordDto: ForgotPasswordDto): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<any>(`${urlConst.apiBase}/auth/forgotPassword`, forgorPasswordDto, { headers: headers });
    }

    public resetPassword(resetPasswordDto: ResetPasswordDto): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<any>(`${urlConst.apiBase}/auth/resetPassword`, resetPasswordDto, { headers: headers });
    }
}