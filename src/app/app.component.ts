import { Component } from '@angular/core';
import { SearchService } from './service/search-service';
import { Music } from './models/Music';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  meuInput: string = "";
  title = 'senac-music-share';
  musics: Music[] = [];
  urlImage = '';
  next = '';

  constructor(private searchService: SearchService) {}

  onInputChanged() {
    this.searchService.searchTracks(this.meuInput).subscribe((res) => {
      this.next = res.tracks.next;
      console.log(this.next)
      this.musics = res.tracks.items.map((item: any) => {
        return new Music(
          item.artists.map((artist: any) => { return artist.name}),
          item.name,
          item.album.images[0].url
        )
      });
    })
  }

  searchMusic() {
    this.searchService.searchForOneMusic("0mAUhfFsha3VqcvLmPnBgw").subscribe((res) => {
      console.log(res);
      this.urlImage = res.album.images[1].url;
    });
  }

  seeMore() {
    this.searchService.searchForNextTrack(this.next).subscribe((res) => {
      this.next = res.tracks.next;
      
      res.tracks.items.map((item: any) => {
        
        this.musics.push( 
          new Music(
            item.artists.map((artist: any) => { return artist.name}),
            item.name,
            item.album.images[0].url
        ))
      
      });
    });
  }

}
