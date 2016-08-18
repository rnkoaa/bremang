import * as Rx from 'rxjs';
import * as fs from 'fs';

export function listFiles(dirPath: string) {
    fs.readdir(dirPath, function (err, data) {
        if (err)
            throw err;
        console.log(data);
    });
}

export function listFilesObservable(dirPath: string) {
    return Rx.Observable.create((observer: Rx.Observer<string[]>) => {
        fs.readdir(dirPath, function (err, data) {
            if (err)
                observer.error(err);
            else {
                observer.next(data);
                //data.map(observer.next);
                observer.complete();
            }
        });
    });
}

export function readFileAsObservable(filePath: string) {
    return Rx.Observable.create((observer: Rx.Observer<string>) => {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err)
                observer.error(err);
            else {
                observer.next(data);
                observer.complete();
            }
        });
    });
}

export function readFilesObservales(dirPath: string) {
    return listFilesObservable(dirPath)
        .flatMap((result: string) => {
            return (Rx.Observable.from(result));
        })
        .flatMap((item: string) => {
             return readFileAsObservable(dirPath + item);
        });
}
this.readFilesObservales('./testdata/')
    .subscribe((item: string) => {
        console.log(`This item => ${item}`);
    });

