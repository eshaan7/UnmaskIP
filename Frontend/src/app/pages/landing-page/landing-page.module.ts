import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ThemeModule } from "../../@theme/theme.module";
import { FormsModule } from "@angular/forms";
import {
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbListModule,
  NbTabsetModule,
  NbBadgeModule
} from "@nebular/theme";
import { LandingPageComponent } from "./landing-page.component";
import { CheckIpComponent } from "./check-ip/check-ip.component";
import { NbEvaIconsModule } from "@nebular/eva-icons";

@NgModule({
  declarations: [LandingPageComponent, CheckIpComponent],
  imports: [
    ThemeModule,
    FormsModule,
    NbCardModule,
    NbInputModule,
    NbTabsetModule,
    NbIconModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbListModule,
    NbBadgeModule
  ]
})
export class LandingPageModule {}
