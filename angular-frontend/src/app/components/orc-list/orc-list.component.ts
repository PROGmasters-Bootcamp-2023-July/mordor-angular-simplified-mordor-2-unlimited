import { Component, OnInit } from '@angular/core';

import { OrcService } from '../../services/orc.service';
import {OrcListItemModel} from '../../models/orcListItem.model';

@Component({
    selector: 'app-orc-list',
    templateUrl: './orc-list.component.html',
    styleUrls: ['./orc-list.component.css'],
})
export class OrcListComponent implements OnInit {

    orcs: Array<OrcListItemModel> = [];

    constructor(private orcService: OrcService) {
      this.renderOrcList();
      // orcService.getOrcList().subscribe({
      //   next: (value) => this.orcs = value,
      //   error: (err) => console.log(err),
      //   complete: () => console.log('Lista megjött!')
      // });
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

  renderOrcList() {
    this.orcService.getOrcList().subscribe({
      next: (value) => this.orcs = value,
      error: (err) => console.log(err),
      complete: () => console.log('Lista megjött!')
    });
  }


}
