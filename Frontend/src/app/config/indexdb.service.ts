import {Injectable} from '@angular/core';
import {DexieService} from './dexie.service'; 

@Injectable()
export class IndexedDbService {
 
    constructor(private dexieService: DexieService) {}
 
    addOrReplace(table_name:string, obj: Object) {
        this.dexieService.table(table_name).put(obj).then(
            result => { console.log(result); },
            error => { console.error(error); });
    }

}