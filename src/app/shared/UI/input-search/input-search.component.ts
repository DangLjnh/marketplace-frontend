import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
})
export class InputSearchComponent {
  @Input() placeholder!: string;
  searchForm = this.fb.group({
    keyword: [''],
  });
  submitForm() {
    this.router.navigate([`/search/${this.searchForm.value.keyword}`]);
  }
  constructor(
    // private customerService: CustomerService,
    private router: Router,
    private fb: FormBuilder
  ) {}
}
