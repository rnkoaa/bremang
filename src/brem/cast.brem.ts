export class BremCast<T>{
   /* tmdbId : number;
    tmdbCastId: number;
    tmdbCreditId: string;
    name: string;
    order: number;
    profilePath: string;
    character: string;*/

    item: T;
    character: string;
    mediaType: string;
    order: number;
    tmdbCreditId: string;

    //intentionally no constructor. use default constructor
}