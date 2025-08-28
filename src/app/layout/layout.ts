import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeroesList } from '../components/heroes-list/heroes-list';

@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    HeroesList,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
