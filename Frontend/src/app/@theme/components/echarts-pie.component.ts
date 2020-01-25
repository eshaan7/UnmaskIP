import {
  Component,
  OnDestroy,
  Input,
  OnChanges
} from "@angular/core";
import { NbThemeService } from "@nebular/theme";

@Component({
  selector: "ngx-echarts-pie",
  template: `
    <div echarts *ngIf="pieChartData!==undefined" [options]="options" class="echart"></div>
  `
})
export class EchartsPieComponent implements OnChanges, OnDestroy {
  options: any = {};
  themeSubscription: any;

  @Input() pieChartData: any;
  @Input() pieChartName: any;

  constructor(private theme: NbThemeService) {}

  ngOnChanges(): void {
   
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      if (this.pieChartData===null || this.pieChartData===undefined) {
        return;
      }
      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [
          colors.warningLight,
          colors.infoLight,
          colors.dangerLight,
          colors.successLight,
          colors.primaryLight
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          center: "top",
          // data: ['USA', 'Germany', 'France', 'Canada', 'Russia'],
          data: this.pieChartData.map(d => {
            return d.name;
          }),
          textStyle: {
            color: echarts.textColor
          }
        },
        series: [
          {
            name: this.pieChartName,
            type: "pie",
            radius: "40%",
            center: ["50%", "50%"],
            data: this.pieChartData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor
              }
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor
                }
              }
            }
          }
        ]
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
