export class Title{
    id: number;
    title: string;
    iso_3166_1: string;
}

export class AlternativeTitles{
    titles: Array<Title>;
}