import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-search-repo',
  templateUrl: './search-repo.component.html',
  styleUrls: ['./search-repo.component.scss']
})
export class SearchRepoComponent implements OnInit {
    
  constructor(private fb: FormBuilder, private commonService: CommonService) { }

  userForm = this.fb.group({
    userName: ['', Validators.required],
  });

  ngOnInit(): void {
    
  }

  onSubmit(form: FormGroup) {
    console.log('Username', form.value); // true or false
    this.commonService.userName.next(form.value.userName);
  }
}
