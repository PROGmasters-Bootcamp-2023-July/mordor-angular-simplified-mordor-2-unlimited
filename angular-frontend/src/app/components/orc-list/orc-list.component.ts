import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {OrcService} from '../../services/orc.service';
import {OrcListItemModel} from '../../models/orcListItem.model';
import {OrcFormDataModel} from "../../models/orcFormData.model";

@Component({
  selector: 'app-orc-list',
  templateUrl: './orc-list.component.html',
  styleUrls: ['./orc-list.component.css'],
})
export class OrcListComponent implements OnInit {

  orcs: Array<OrcListItemModel> = [];

  @Output() orcModify = new EventEmitter();

  constructor(private orcService: OrcService) {
    this.renderOrcList();
  }

  ngOnInit() {

  }

  deleteOrc(id: number) {
    this.orcService.deleteOrc(id).subscribe({
      next: (value) => console.log('Sikeres törlés!'),
      error: (err) => console.log(err),
      complete: () => {
        console.log('Lefutott a complete ág (törlés)!');
        this.renderOrcList();
      }
    });
  }

  modifyOrc(orc: OrcFormDataModel) {
    this.orcModify.emit();
    this.orcService.orcToModifySubject.next(orc);
  }


  renderOrcList() {
    this.orcService.getOrcList().subscribe({
      next: (value) => this.orcs = value,
      error: (err) => console.log(err),
      complete: () => console.log('Lista megjött!')
    });
  }
}
