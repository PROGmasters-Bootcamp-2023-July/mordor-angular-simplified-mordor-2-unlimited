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

    constructor(private orcService: OrcService) {}

    ngOnInit() {

    }

}
