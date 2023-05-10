export class Music {
    artist: string[];
    nameSong: string;
    image: string;

    constructor(artist: string[], nameSong: string, image: string) {
        this.artist = artist;
        this.nameSong = nameSong;
        this.image = image;
    }
}