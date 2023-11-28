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

  orcs: OrcListItemModel[] = [];
  @Output() editClicked = new EventEmitter();

  constructor(private orcService: OrcService) {
  }

  ngOnInit() {
    this.renderOrcList();
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

  // modifyOrc(orc: OrcFormDataModel) {
  //   this.orcModify.emit();
  //   this.orcService.orcToModifySubject.next(orc);
  // }

  editOrc = (id: number) => {
    this.orcService.orcId = id;
    this.editClicked.emit();
  };


  renderOrcList = () => {
    this.orcService.getOrcList().subscribe(
      (orcList: OrcListItemModel[]) => {
        this.orcs = orcList;
      },
      error => console.warn(error),
    );

  }

}
