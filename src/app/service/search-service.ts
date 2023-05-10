import { Injectable } from "@angular/core";
import { Music } from "../models/Music";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    searchForOne =  "https://api.spotify.com/v1/tracks";
    searchTrack = "https://api.spotify.com/v1/search?type=track&limit=3&offset=3";

    constructor(private http: HttpClient) {}
    
    searchForMusic(msg: string) {
        console.log(msg)
    }

    searchForOneMusic(idTrack: string): Observable<any> {
        return this.http.get<any>(`${this.searchForOne}/${idTrack}`);
    }

    searchTracks(search: string): Observable<any> {
        return this.http.get<any>(`${this.searchTrack}&q=${search}`);
    }

    searchForNextTrack(url: string): Observable<any> {
        return this.http.get<any>(url);
    }
}