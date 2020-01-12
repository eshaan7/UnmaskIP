import {Injectable} from '@angular/core';
import {HttpService} from '../../config/http.service';
import {HttpClient} from '@angular/common/http';
import { IndexedDbService } from '../../config/indexdb.service';

@Injectable()
export class DataService extends HttpService<any> {

  constructor(public http: HttpClient, public indexDB: IndexedDbService) {
    super(http, {
      path: '',
    }, indexDB);
  }

}
