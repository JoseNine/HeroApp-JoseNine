import {
  Component,
  inject,
  signal,
  resource,
  computed,
  ViewChild,
} from '@angular/core';
import { HeroService } from '../../services/hero-service';
import { Hero, PageSize } from '../../interfaces/heroes.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { debounceTime, firstValueFrom, of } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { HeroDetails } from '../hero-details/hero-details';

@Component({
  selector: 'app-heroes-list',
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatMenuModule,
  ],
  templateUrl: './heroes-list.html',
  styleUrl: './heroes-list.scss',
})
export class HeroesList {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private heroService = inject(HeroService);
  private dialog = inject(MatDialog);

  pageSizeOptions: PageSize[] = [10, 20, 50, 100];
  pageSize = signal<PageSize>(10);
  pageIndex = signal<number>(0);
  length = signal<number>(0);
  displayedColumns: string[] = ['id', 'name', 'occupation', 'menu'];

  value = '';
  searchValue = signal<string>('');
  debouncedSearchValue = toSignal(
    toObservable(this.searchValue).pipe(debounceTime(1000)),
    {
      initialValue: '',
    }
  );

  heroesResource = resource({
    loader: () => firstValueFrom(this.heroService.getAllHeroes()),
  });

  dataSource = computed(() => {
    const newDataSource = new MatTableDataSource<Hero>([]);

    if (this.debouncedSearchValue()) {
      newDataSource.data = this.heroService.searchHeroesByName(
        this.debouncedSearchValue()
      );
    } else if (this.heroesResource.hasValue()) {
      newDataSource.data = this.heroesResource.value();
    }
    newDataSource.paginator = this.paginator;

    return newDataSource;
  });

  setSearchSignal() {
    this.searchValue.set(this.value ?? '');
  }

  createHero() {
    this.dialog.open(HeroDetails, {
      width: '50rem',
      data: {
        mode: 'create',
      },
    });
  }
}
