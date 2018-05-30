import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Category } from '../domain/category';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DeleteConfirmationComponent } from '../delete-confiremation/delete-confiremation.component';
import { CategoriesService } from '../categories.service';
import { fadeAnimation } from '../../shared/animations';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss'],
  animations: [fadeAnimation]
})
export class CatComponent implements OnInit {
  @HostBinding('@fadeAnimation') fadeAnimation = true;
  @HostBinding('style.display') display = 'block';

  @ViewChild('table') public table;

  displayedColumns = ['select', 'title', 'description', 'save'];
  dataSource = new MatTableDataSource();

  public selected: any;


  constructor(private _dialog: MatDialog,
    public catService: CategoriesService) { }

  onSelect($event, row) {
    this.selected = $event.checked ? row : null;
  }

  onAdd() {
    this.selected = { id: 0, title: '', description: '' };
  }

  submit() {
    if (this.selected.id == 0) {
      this.catService.add(this.selected)
        .subscribe(res => {
          this.selected.changed = false;
          this.selected.id = res;
          this.dataSource.data.push(this.selected);
          this.table.renderRows();
          this.selected = null;
        });
    } else {
      this.update(this.selected);
    }
  }

  update(row: any) {
    this.catService.edit(row)
      .subscribe(res => {
        row.changed = false;
      });
  }

  onDelete() {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.data = 'CATEGORY_DELETE_CONFI';
    this._dialog.open(DeleteConfirmationComponent, config).afterClosed()
      .subscribe(res => {
        if (res) {
          this.catService.delete(this.selected.id)
            .subscribe(res => {
              this.selected = null;
              this.loadCategories();
            });
        }

      });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.catService.getCategories()
      .subscribe(res => {
        this.dataSource.data = res;
      });
  }


}





