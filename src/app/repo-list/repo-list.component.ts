import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { CommonService } from '../services/common.service';
import { Repo } from './repo';
import { RepoListService } from './repo-list.service';



@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnInit {
userName;
repoList:Repo[];
avatar_url:string;
displayName:string;
displayedColumns: string[] = ['owner','name', 'description', 'stargazers_count', 'open_issues_count', 'watchers'];
dataSource:any;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
// @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private repoListService:RepoListService,  private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.userName.subscribe((value)=>{
      this.userName = value;
      this.getRepoes(this.userName);
    })
  
  }


  
  getRepoes(userName){
    if(this.userName) {
      this.repoListService.getRepoList(userName).subscribe(response =>{
        console.log(response)
        if(response) {
          this.repoList=response;
          this.dataSource = new MatTableDataSource(this.repoList);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.avatar_url = this.repoList[0]?.owner.avatar_url;
          this.displayName = this.repoList[0]?.owner.login;
        }
      }, error => {
      alert(error.message)}
      )
    }
   
  }
}
