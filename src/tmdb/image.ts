export class Image{
    id: number;
    aspect_ratio: number;
    file_path: string;
    vote_average : number;
    width : number;
    height : number;
    vote_count : number;
    iso_639_1: string;
    primary: boolean;
    isBackDrop: boolean;
    isPoster: boolean;
}

export class Images{
    backdrops: Array<Image>;
    posters : Array<Image>;
}