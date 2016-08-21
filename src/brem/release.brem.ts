
import {BremCountry} from "./country.brem";
export class BremRelease extends BremCountry {
    certification: string;
    primary: boolean;
    releaseDate: Date;

    constructor(countryCode: string, certification: string, releaseDate: Date, primary: boolean = false) {
        super("", countryCode);
        this.certification = certification;
        this.releaseDate = releaseDate;
        this.primary = primary;
    }
}