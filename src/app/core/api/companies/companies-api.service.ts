import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Company } from "../../interfaces/company.interface";
import { API_COMPANIES } from "../api.const";

@Injectable({
  providedIn: 'root',
})
export class CompaniesApiService {
  constructor(private httpClient: HttpClient) {}

  public getCompanies(name: string): Observable<Company[]> {
    return this.httpClient.get<Company[]>(API_COMPANIES(name));
  }
}