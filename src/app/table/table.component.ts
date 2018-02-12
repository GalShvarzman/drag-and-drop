import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit , AfterViewInit {
  @Input() csv : {[key:string] : string}[];
  @Input() headers : {[key:string] : string};
  @Input() displayedColumns : string[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private dataSource: MatTableDataSource<{[key:string] : string}>;  
  constructor() {
    this.dataSource = new MatTableDataSource([]);
  }

  private applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.dataSource.data = this.csv;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
