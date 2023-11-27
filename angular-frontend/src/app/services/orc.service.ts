import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {OrcFormDataModel} from '../models/orcFormData.model';
import {Observable} from 'rxjs';
import {FormInitDataModel} from '../models/formInitData.model';
import {OrcListItemModel} from '../models/orcListItem.model';

const BASE_URL: string = 'http://localhost:8080/api/orcs';

@Injectable({providedIn: 'root'})
export class OrcService {

    constructor(private http: HttpClient) {}

    getInitialFormData(): Observable<FormInitDataModel> {
        return this.http.get<FormInitDataModel>(BASE_URL + '/formData');
    }

    createOrc(data: OrcFormDataModel): Observable<any> {
        return this.http.post(BASE_URL, data);
    }

}
