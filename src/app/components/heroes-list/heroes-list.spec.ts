import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';

import { HeroesList } from './heroes-list';
import { HeroService } from '../../services/hero-service';

describe('HeroesList', () => {
  let component: HeroesList;
  let fixture: ComponentFixture<HeroesList>;

  const mockMatDialog = {
    open: jasmine.createSpy('open')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeroesList,
        MatTableModule,
        MatToolbarModule,
        MatInputModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatPaginatorModule,
        MatMenuModule
      ],
      providers: [
        HeroService,
        provideHttpClient(withFetch()),
        provideNoopAnimations(),
        { provide: MatDialog, useValue: mockMatDialog }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
