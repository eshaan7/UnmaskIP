import { Component, Input } from "@angular/core";

@Component({
  selector: "ngx-gmaps",
  styleUrls: ["./gmaps.component.scss"],
  template: `
    <agm-map [zoom]="11" [latitude]="lat" [longitude]="lng">
      <agm-marker [latitude]="lat" [longitude]="lng"></agm-marker>
    </agm-map>
  `
})
export class GmapsComponent {
  @Input() lat;
  @Input() lng;
}
