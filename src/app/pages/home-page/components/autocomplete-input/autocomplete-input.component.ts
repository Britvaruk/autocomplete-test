import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompaniesApiService } from 'src/app/core/api/companies/companies-api.service';
import { Company } from 'src/app/core/interfaces/company.interface';
import tippy, {Instance, Props} from 'tippy.js';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent implements OnInit {
  @ViewChild('selectEl') private selectEl!: ElementRef;
  @ViewChild('selectBodyEl') private selectBodyEl!: ElementRef;

  private tippyInstanse!: Instance<Props>;
  private subscription!: Subscription;
  
  public companyList: Company[] = [];
  public searchValue: string = '';  

  constructor(private companiesService: CompaniesApiService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.initTippy(
        this.selectEl.nativeElement, 
        this.selectBodyEl.nativeElement
      );
    }, 0);
  }

  public search(): void {
    if (this.searchValue !== '') {
      this.getCompaniesByName(this.searchValue);
      this.tippyInstanse.show();
    } else {
      this.companyList = [];
      this.tippyInstanse.hide();      
    }
  }

  public showTippy(): void {
    if (this.searchValue !== '') {
      this.tippyInstanse.show();
    } 
  }  

  public selectItem(item: Company): void {
    console.log("Вы выбрали:");
    console.log(item);

    this.searchValue = item.name;
    this.getCompaniesByName(this.searchValue);
    this.tippyInstanse.hide();   
  }

  private getCompaniesByName(name: string): void {
    this.subscription = 
      this.companiesService.getCompanies(name).subscribe(
        (res) => this.companyList = res
      );
  }

  private initTippy(selectEl: HTMLElement, selectBodyEl: HTMLElement): void {
    this.tippyInstanse = tippy(selectEl, {
      content: selectBodyEl,
      placement: 'bottom-start',
      animation: 'shift-away',
      trigger: 'manual',
      allowHTML: true,
      theme: 'drop-search',
      arrow: false,
      offset: [0, -1],
      interactive: true,
      onShow(instanse): false | void {
        setTimeout(() => {
          selectBodyEl.style.width = `${selectEl.clientWidth}px`;
        }, 0);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
