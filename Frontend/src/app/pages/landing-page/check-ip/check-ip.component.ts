import { Component, OnInit } from "@angular/core";
import { DataService } from "../../../@core/utils/data.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "check-ip",
  templateUrl: "./check-ip.component.html",
  styleUrls: ["./check-ip.component.scss"]
})
export class CheckIpComponent implements OnInit {
  ip_to_check: String;
  result: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private http: DataService
  ) {
    this.activateRoute.params.subscribe(res => {
      if (res["ip_to_check"] !== "0.0.0.0") {
        this.ip_to_check = res["ip_to_check"];
        this.getIPInfo();
      }
    });
  }

  ngOnInit() {}

  async getIPInfo() {
    try {
      this.result = await this.http.query(
        {},
        `fetchipinfo/${this.ip_to_check}/`
      );
      console.log(this.result);
    } catch (e) {
      console.error(e);
    }
  }
}
