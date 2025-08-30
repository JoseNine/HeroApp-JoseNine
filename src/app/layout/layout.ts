import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeroesList } from '../components/heroes-list/heroes-list';
import { LoadingService } from '../services/loading.service';
import { LoadingComponent } from '../components/loader-spinner/loader-spinner.component';

@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    HeroesList,
    LoadingComponent,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  loadingService = inject(LoadingService);
}
