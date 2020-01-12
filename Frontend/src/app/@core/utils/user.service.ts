import { Injectable } from "@angular/core";
import { HttpService } from "../../config/http.service";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { IndexedDbService } from "../../config/indexdb.service";
import { IPinfo } from "../models/models";

@Injectable({
  providedIn: "root"
})
export class UserService extends HttpService<any> {
  count: any;
  // count$: Subject<any[]> = new Subject() as Subject<any[]>;

  aggregation_data_front: Array<any> = [];
  aggregation_data_front$: Subject<any[]> = new Subject() as Subject<any[]>;

  aggregation_data_back: Array<any> = [];
  aggregation_data_back$: Subject<any[]> = new Subject() 

  private dashboardQueriesFront = [
    { // cities
      colList: "city",
      colCount: "city",
      countryCodeEquals: "IN",
      limit: 5
    },
    { // isp
      colList: "isp",
      colCount: "isp",
      countryCodeEquals: "IN",
      limit: 5
    },
    { // map
      colList: "country_name, country_code",
      colCount: "country_code",
      limit: 100
    },
  ]
  private dashboardQueriesBack = [
    { // countries
      colList: "country_name",
      colCount: "country_name",
      limit: 5
    },
    { // isp 
      colList: "isp",
      colCount: "isp",
      limit: 5
    },
  ];

  constructor(
    private httpClient: HttpClient,
    public indexDB: IndexedDbService
  ) {
    super(
      httpClient,
      {
        path: "/ipinfo"
      },
      indexDB
    );
    this.init().then();
  }

  async init() {
    try {
        this.dashboardQueriesFront.forEach(async (dq, i) => {
          const res = await this.getAggregation(dq);
          this.aggregation_data_front[i] = res;
        });
        // add to indexDB
        this.aggregation_data_front$.next(this.aggregation_data_front);

        this.dashboardQueriesBack.forEach(async (dq, i) => {
          const res = await this.getAggregation(dq);
          this.aggregation_data_back[i] = res;
        });
        // add to indexDB
        this.aggregation_data_back$.next(this.aggregation_data_back);

        this.count = await this.getIPCount();

    } catch (e) {
      console.error(e);
    }
  }

  async getIPCount(): Promise<any> {
    return this.query({}, "get_count/");
  }

  async getAggregation(query): Promise<any> {
    return this.query(query, "get_aggregation/");
  }
}
