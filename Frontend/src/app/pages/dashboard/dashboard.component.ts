import { Component} from "@angular/core";
import { UserService } from "../../@core/utils/user.service";

@Component({
  selector: "ngx-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {
  dataFront: any[] = [null, null];
  dataBack: any[] = [null, null];
  bubbleMapData: any[];

  constructor(public userService: UserService) {
    setTimeout(() => {
      this.initFrontData(this.userService.aggregation_data_front);
      this.initBackData(this.userService.aggregation_data_back);
    }, 500);
  }

  initFrontData(data): void {
    this.dataFront[0] = this.constructGraphData(data[0], "city");
    this.dataFront[1] = this.constructGraphData(data[1], "isp");
    this.bubbleMapData = data[2];
  }

  initBackData(data): void {
    this.dataBack[0] = this.constructGraphData(data[0], "country_name");
    this.dataBack[1] = this.constructGraphData(data[1], "isp");
  }

  constructGraphData(data: any, key: string) {
    const new_data = data.map(obj => {
      return { name: obj[key], value: obj["count"] };
    });
    return new_data;
  }

}
