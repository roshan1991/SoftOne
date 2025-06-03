import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BehaviorSubject, debounce, distinctUntilChanged, interval} from 'rxjs';
import _ from 'lodash'
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  @Output() rowEditClicked = new EventEmitter<any>();
  @Output() rowDeleteClicked = new EventEmitter<any>();
  @Output() searchText = new EventEmitter<any>();

  tableRowData= new BehaviorSubject<any>([]);
  tableColumnData:any[] = []
  title = ''
  tempRowData:any[] = []
  searchControl:FormControl = new FormControl(null);

  @Input() set inputRowData(value:any) {
    this.tableRowData.next(value);
    this.tempRowData = value
  }

  @Input() set inputColData(value:any) {
    this.tableColumnData = value;
  }

  @Input() set inputTitle(value:any) {
    this.title = value;
  }

  constructor() {



  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounce(()=> interval(300)), distinctUntilChanged()).subscribe((value:any)=>{
      if(value && value.length > 0){
        this.searchText.emit(value);
        this.searchData(value)
      }else{
        this.tableRowData.next(this.tempRowData) ;
      }
    })
  }


  editeClick(rowvalue: any) {
    console.log(rowvalue)
    this.rowEditClicked.emit(rowvalue)
  }

  deleteClick(rowvalue: any) {
    this.rowDeleteClicked.emit(rowvalue)
  }

  searchData(searchValue: any) {
    this.tableRowData.next(this.tempRowData.filter(val =>
      Object.values(val).toString().toLowerCase().includes(searchValue.toLowerCase())
    )) ;
  }

  tableSort(sortValue:any) {
    console.log(sortValue)
    sortValue = sortValue == 'Task ID' ? 'id' : sortValue == 'Title' ? 'name' : sortValue;
    let value = _.sortBy(this.tempRowData, sortValue.toLowerCase())
    this.tableRowData.next(value)
  }
}
