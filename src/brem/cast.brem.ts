import {BremRole} from "./role.brem";
export class BremCast<T> extends BremRole<T>{
    character: string;
    mediaType: string;
    order: number;
    tmdbCreditId: string;

    //intentionally no constructor. use default constructor
}