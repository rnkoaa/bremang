export class BremLanguage{
    name: string;
    languageCode: string;
    original: boolean;

    constructor(name: string, languageCode: string, original: boolean = false) {
        this.name = name;
        this.languageCode = languageCode;
        this.original = original;
    }
}