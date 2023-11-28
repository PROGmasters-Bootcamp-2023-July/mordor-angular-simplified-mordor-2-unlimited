import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {OrcListComponent} from './components/orc-list/orc-list.component';
import {OrcFormComponent} from './components/orc-form/orc-form.component';

@NgModule({
    declarations: [
        AppComponent,
        OrcListComponent,
        OrcFormComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
