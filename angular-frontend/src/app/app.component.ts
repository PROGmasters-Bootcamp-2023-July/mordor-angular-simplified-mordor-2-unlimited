import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {

    currentPage: string = 'list';

    constructor() {}

    switchPage(page: string) {
       this.currentPage = page;
    }
}