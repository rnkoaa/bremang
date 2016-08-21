export class BremTitle{
    title: string;
    isoLanguageCode: string;
    isoCountryCode: string;
    isOriginal: boolean;
    isMain: boolean;

    constructor(title: string, isoLanguageCode: string,isoCountryCode: string, isOriginal : boolean = false){
        this.title = title;
        this.isoLanguageCode = isoLanguageCode;
        this.isoCountryCode = isoCountryCode;
        this.isOriginal = isOriginal;
        this.isMain = false;

    }
}