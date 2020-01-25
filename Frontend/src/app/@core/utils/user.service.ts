import { Injectable } from "@angular/core";
import { HttpService } from "../../config/http.service";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { IndexedDbService } from "../../config/indexdb.service";

@Injectable({
  providedIn: "root"
})
export class UserService extends HttpService<any> {
  count: any;

  aggregation_data_front: Array<any> = [];
  aggregation_data_back: Array<any> = [];

  private dashboardQueriesFront = [
    {
      // cities
      colList: "city",
      colCount: "city",
      countryCodeEquals: "IN",
      limit: 5
    },
    {
      // isp
      colList: "isp",
      colCount: "isp",
      countryCodeEquals: "IN",
      limit: 5
    },
    {
      // map
      colList: "country_name, country_code",
      colCount: "country_code",
      limit: 100
    }
  ];
  private dashboardQueriesBack = [
    {
      // countries
      colList: "country_name",
      colCount: "country_name",
      limit: 5
    },
    {
      // isp
      colList: "isp",
      colCount: "isp",
      limit: 5
    }
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
    this.init2().then();
  }

  // async init() {
  //   try {
  //       this.dashboardQueriesFront.forEach(async (dq, i) => {
  //         const res = await this.getAggregation(dq);
  //         this.aggregation_data_front[i] = res;
  //       });
  //       // add to indexDB
  //       this.aggregation_data_front$.next(this.aggregation_data_front);

  //       this.dashboardQueriesBack.forEach(async (dq, i) => {
  //         const res = await this.getAggregation(dq);
  //         this.aggregation_data_back[i] = res;
  //       });
  //       // add to indexDB
  //       this.aggregation_data_back$.next(this.aggregation_data_back);

  //       this.count = await this.getIPCount();

  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  async init2() {
    const queriesFront = [
      "top5cities_india",
      "top5ISPs_india",
      "countPerCountry"
    ];
    const queriesBack = ["top5countries", "top5ISPs_world"];
    try {
      queriesFront.forEach(async (q, i) => {
        await this.getJSONData(q).then(
          data => (this.aggregation_data_front[i] = data)
        );
      });
      // this.aggregation_data_front$.next(this.aggregation_data_front);

      queriesBack.forEach(async (q, i) => {
        await this.getJSONData(q).then(
          data => (this.aggregation_data_back[i] = data)
        );
      });
      // this.aggregation_data_back$.next(this.aggregation_data_back);

      this.count = {
        ip: 895185,
        isp: 25827,
        country: 205
      };
    } catch (e) {
      console.error(e);
    }
  }

  getJSONData(filename: string): Promise<any> {
    const request: Observable<any> = this.http.get(
      `assets/data/${filename}.json`
    );
    return new Promise((resolve, reject) =>
      request.subscribe(
        res => {
          return resolve(res);
        },
        err => {
          HttpService.catchError(err);
          return reject(err);
        }
      )
    );
  }

  async getIPCount(): Promise<any> {
    return this.query({}, "get_count/");
  }

  async getAggregation(query): Promise<any> {
    return this.query(query, "get_aggregation/");
  }
}
