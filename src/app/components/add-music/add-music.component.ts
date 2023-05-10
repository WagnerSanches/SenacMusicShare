import { Component, OnInit } from '@angular/core';
import { Music } from 'src/app/models/Music';
import { SearchService } from 'src/app/service/search-service';

@Component({
  selector: 'app-add-music',
  templateUrl: './add-music.component.html',
  styleUrls: ['./add-music.component.css']
})
export class AddMusicComponent implements OnInit {
  
  musics: Music[] = [];
  meuInput: string = "";
  next = '';

  ngOnInit(): void {
  }

  constructor(private searchService: SearchService) {}

  onInputChanged() {

    console.log("estou aqui")
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

}
