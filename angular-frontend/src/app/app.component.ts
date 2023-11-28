import { Component } from '@angular/core';
import {OrcService} from "./services/orc.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {

    currentPage: string = 'list';

    constructor(private orcService: OrcService) {}

    // switchPage(page: string) {
    //    this.currentPage = page;
    // }

  switchToForm() {
    this.orcService.resetForm.next(null);
    this.currentPage = 'form';
  }

  switchToList() {
    this.orcService.orcId = null;
    this.currentPage = 'list';
  }
}
