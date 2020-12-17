import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Status} from '../models/status.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statusApiUrl = environment.apiUrl + 'status';


  constructor(private http: HttpClient) {
  }

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.statusApiUrl);

  }
}
