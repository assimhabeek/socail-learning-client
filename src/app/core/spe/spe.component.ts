import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Specialty } from '../domain/spcialty';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DeleteConfirmationComponent } from '../delete-confiremation/delete-confiremation.component';
import { SpecialtiesService } from '../specialties.service';
import { fadeAnimation } from '../../shared/animations';

@Component({
  selector: 'app-spe',
  templateUrl: './spe.component.html',
  styleUrls: ['./spe.component.scss'],
  animations: [fadeAnimation]
})
export class SpeComponent implements OnInit {
  @HostBinding('@fadeAnimation') fadeAnimation = true;
  @HostBinding('style.display') display = 'block';

  @ViewChild('table') public table;

  displayedColumns = ['select', 'abb', 'name', 'from', 'to', 'save'];
  dataSource = new MatTableDataSource();

  public selected: any;


  constructor(private _dialog: MatDialog,
    public speService: SpecialtiesService) { }

  onSelect($event, row) {
    this.selected = $event.checked ? row : null;
  }

  onAdd() {
    this.selected = { id: 0, to: 5, from: 1, abb: '', name: '' };
  }

  submit() {
    if (this.selected.id == 0) {
      this.speService.add(this.selected)
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
    this.speService.edit(row)
      .subscribe(res => {
        row.changed = false;
      });
  }

  filter($event) {
    let filterValue = $event.target.value.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onDelete() {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.data = 'SPECIALTY_DELETE_CONFI';
    this._dialog.open(DeleteConfirmationComponent, config).afterClosed()
      .subscribe(res => {
        if (res) {
          this.speService.delete(this.selected.id)
            .subscribe(res => {
              this.selected = null;
              this.loadSpecialties();
            });
        }

      });
  }

  ngOnInit() {
    this.loadSpecialties();
  }

  loadSpecialties() {
    this.speService.getSpecialties()
      .subscribe(res => {
        this.dataSource.data = res;
      });
  }


}





