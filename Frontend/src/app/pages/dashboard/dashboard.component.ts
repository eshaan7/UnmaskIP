import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "../../@core/utils/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "ngx-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  sub2: Subscription;

  bubbleMapData: any[];

  graphData_in1: any[];
  graphData_in2: any[];

  graphData1: any[];
  graphData2: any[];

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    if (this.userService.aggregation_data_front.length === 2) {
      this.initFrontData();
      this.initBackData();
    }

    this.sub1 = this.userService.aggregation_data_front$.subscribe(res => {
      this.graphData_in1 = this.constructGraphData(res[0], "city");
      this.graphData_in2 = this.constructGraphData(res[1], "isp");
      this.bubbleMapData = res[2];
    });

    this.sub2 = this.userService.aggregation_data_back$.subscribe(res => {
      this.graphData1 = this.constructGraphData(res[0], "country_name");
      this.graphData2 = this.constructGraphData(res[1], "isp");
    });
  }

  initFrontData(): void {
    this.graphData_in1 = this.constructGraphData(
      this.userService.aggregation_data_front[0],
      "country_name"
    );
    this.graphData_in2 = this.constructGraphData(
      this.userService.aggregation_data_front[1],
      "isp"
    );
    this.bubbleMapData = this.userService.aggregation_data_front[2];
  }

  initBackData(): void {
    this.graphData1 = this.constructGraphData(
      this.userService.aggregation_data_back[0],
      "country_name"
    );
    this.graphData2 = this.constructGraphData(
      this.userService.aggregation_data_back[1],
      "isp"
    );
  }

  constructGraphData(data: any, key: string) {
    const new_data = data.map(obj => {
      return { name: obj[key], value: obj["count"] };
    });
    return new_data;
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
}
