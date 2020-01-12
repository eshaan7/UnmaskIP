import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../@core/utils/data.service';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  ip_to_check: string;

  constructor(private router: Router) { }

  async check() {
    try {
      this.router.navigate([`/pages/checkip/${this.ip_to_check}/`]).then();
    } catch(e) {
      console.error(e);
    }
  }

}
