export class Title{
    id: number;
    title: string;
   // isoLanguageCode: string;
    iso_3166_1: string;
}

export class AlternativeTitles{
    titles: Array<Title>;
}