import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Module } from '../domain/module';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DeleteConfirmationComponent } from '../delete-confiremation/delete-confiremation.component';
import { ModulesService } from '../modules.service';
import { fadeAnimation } from '../../shared/animations';
import { SpecialtiesService } from '../specialties.service';
import { Specialty } from '../domain/spcialty';

@Component({
  selector: 'app-mod',
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.scss'],
  animations: [fadeAnimation]
})
export class ModComponent implements OnInit {
  @HostBinding('@fadeAnimation') fadeAnimation = true;
  @HostBinding('style.display') display = 'block';

  @ViewChild('table') public table;

  displayedColumns = ['select', 'abb', 'name', 'semmster', 'year', 'spcailtyId', 'save'];
  dataSource = new MatTableDataSource();

  public selected: any;
  public specailties: Specialty[] = [];

  constructor(private _dialog: MatDialog,
    public modService: ModulesService,
    public specialtiesService: SpecialtiesService) { }

  onSelect($event, row) {
    this.selected = $event.checked ? row : null;
  }

  onAdd() {
    this.selected = { id: 0, to: 5, from: 1, abb: '', name: '' };
  }

  submit() {
    if (this.selected.id == 0) {
      this.modService.add(this.selected)
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
    this.modService.edit(row)
      .subscribe(res => {
        row.changed = false;
      });
  }

  getSpeById(id) {
    return this.specailties.find(item => item.id == id);
  }
  loadSpecailties() {
    this.specialtiesService.getSpecialties()
      .subscribe((spe: Specialty[]) => {
        this.specailties = spe;
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
    config.data = 'MOD_DELETE_CONFI';
    this._dialog.open(DeleteConfirmationComponent, config).afterClosed()
      .subscribe(res => {
        if (res) {
          this.modService.delete(this.selected.id)
            .subscribe(res => {
              this.selected = null;
              this.loadModules();
            });
        }

      });
  }

  getSpecialtiesByYear() {
    return this.selected && this.selected.year ? this.specailties.filter(item => item.from <= this.selected.year && item.to >= this.selected.year) : [];
  }

  ngOnInit() {
    this.loadModules();
    this.loadSpecailties();
  }

  loadModules() {
    this.modService.getModules()
      .subscribe(res => {
        this.dataSource.data = res;
      });
  }


}





