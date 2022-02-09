import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

export const SECRET_PASSWORD = 'secret';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private primengConfig: PrimeNGConfig, private httpClient: HttpClient) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
