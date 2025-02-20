import { Component, OnInit } from '@angular/core';
import { ModeratorService } from 'src/app/moderator.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  newData: any =[]
  studentData: any
  title = 'angular-app';
  fileName= 'applications.xlsx';

  constructor(private moderator:ModeratorService) { }

  ngOnInit(): void {
    
    this.moderator.studentData(localStorage.getItem("id")).subscribe((data) => {
      this.newData = JSON.parse(JSON.stringify(data))
      console.log(this.newData)
      this.moderator.studentHistory(this.newData).subscribe((studata) => {
        console.log(studata)
        this.studentData = JSON.parse(JSON.stringify(studata))
  })

})
    }

    exportexcel(): void
  {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }


  }