import {Country} from "./country";

export class Release extends Country{
    primary: boolean;
    release_date: string;
    certification: string;
}

export class Releases{
    countries: Array<Release>;
}