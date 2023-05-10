import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, switchMap, throwError } from "rxjs";
import { AuthService } from "./auth-service";

@Injectable()
export class Inteceptador implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log(req.url)

        if(req.url.includes('https://api.spotify.com/')) {

            return this.authService.getToken().pipe(
                switchMap(token => {
                    console.log("Eu estou aqui dentro")
                    const authReq = req.clone({
                        headers: req.headers.set('Authorization', `Bearer ${token}`)
                    });
                    return next.handle(authReq);
                })
            )
        }
        return next.handle(req);
    }
}