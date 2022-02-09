import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Description {
  description: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  description$ = this.httpClient.get<Description[]>(`/api/description`);

  constructor(private httpClient: HttpClient) {}
}
