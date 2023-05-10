import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable, catchError, of, tap, throwError, timer } from "rxjs";

@Injectable()
export class AuthService {

    private expirationDate!: Date;
    private tokenExpirationTimer: any; 
    private url = "https://accounts.spotify.com/api/token";
    private readonly clientId = '21c0f7da57ff41d889b4999ffc316d8b';
    private readonly clientSecret = '4f12f531dc7946b8a15c6ca8414ba368';
    private grantType = 'client_credentials';

    constructor(private http: HttpClient) {}

    getAuthToken(): any {
        return localStorage.getItem('token');
    }

    getToken(): Observable<any> {

        console.log("aqui é o meu " + this.getAuthToken())

        if(this.getAuthToken() != null && this.expirationDate && !this.isTokenExpired()) {
            return of(this.getAuthToken());
        }

        return this.refreshToken().pipe(tap(res => this.startTokenExpirationTimer()));
    }

    refreshToken(): Observable<any> {

        const authHeader = btoa(this.clientId + ':' + this.clientSecret);
        const headers = new HttpHeaders({
          'Authorization': 'Basic ' + authHeader,
          'Content-Type': 'application/x-www-form-urlencoded'
        });

        const body = new URLSearchParams();
        body.set('grant_type', this.grantType);

        return this.http.post<any>(this.url, body.toString(), { headers: headers }).pipe(
            tap(response => {

                const expirationDate = new Date(new Date().getTime() + response.expires_in * 1000)

                console.log(expirationDate)

                this.setAccessToken(response.access_token);
                this.setExpirationDate(expirationDate);

                // this.startTokenExpirationTimer()  // se pa da erro
            
            }),
            catchError(error => {
                console.error(error)
                return throwError(error);
            })
        );
    }

    
    private setAccessToken(token: string): void {
        localStorage.setItem('token', token);
    }

    private setExpirationDate(date: Date): void {
        this.expirationDate = date;
    }

    isTokenExpired(): boolean {
        return this.expirationDate.getTime() <= new Date().getTime();
    }

    startTokenExpirationTimer(): void {
        const timeDiffInSeconds = (this.expirationDate.getTime() - new Date().getTime()) / 1000;
        const timeout = (timeDiffInSeconds - 60) * 1000;

        console.log("timeDiffInSeconds: " + timeDiffInSeconds);
        console.log("timeout: " + timeout);

        this.tokenExpirationTimer = timer(timeout).subscribe(() => {
            if(this.isTokenExpired()) {
                console.log("Token expirou. Atualizando...")
                this.refreshToken().subscribe(() => {
                    console.log('Token atualizado com sucesso!');
                    this.startTokenExpirationTimer();
                });
            } else {
                console.log(`Token ainda é válido por mais ${timeDiffInSeconds} segundos.`);
                this.startTokenExpirationTimer();
            }
        })

    }

}