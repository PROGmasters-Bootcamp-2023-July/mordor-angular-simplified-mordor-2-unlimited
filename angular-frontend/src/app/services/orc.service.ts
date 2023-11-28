import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {OrcFormDataModel} from '../models/orcFormData.model';
import {Observable, Subject} from 'rxjs';
import {FormInitDataModel} from '../models/formInitData.model';


const BASE_URL: string = 'http://localhost:8080/api/orcs';

@Injectable({providedIn: 'root'})
export class OrcService {

  // orcToModifySubject: Subject<OrcFormDataModel> = new Subject<OrcFormDataModel>();

  orcId: number;
  resetForm = new Subject();

  constructor(private http: HttpClient) {
  }

  getInitialFormData(): Observable<FormInitDataModel> {
    return this.http.get<FormInitDataModel>(BASE_URL + '/formData');
  }

  createOrc(data: OrcFormDataModel): Observable<any> {
    return this.http.post(BASE_URL, data);
  }

  getOrcList(): Observable<any> {
    return this.http.get(BASE_URL);
  }

  deleteOrc(id: number): Observable<any> {
    return this.http.delete(BASE_URL + '/' + id);
  }

  updateOrc(data: OrcFormDataModel, orcId: number): Observable<any> {
    return this.http.put(BASE_URL + '/' + orcId, data);
  }

  fetchOrcDetails(id: number): Observable<any> {
    return this.http.get(BASE_URL + '/' + id);
  }

}
