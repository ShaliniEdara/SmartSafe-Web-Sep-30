import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Eod } from 'app/model/eod';
import { StoreResponse } from 'app/model/storeResponse';
import { NGXToastrService } from 'app/service/toastr.service';
import * as Chart from 'chart.js';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-charts-reports',
  templateUrl: './charts-reports.component.html',
  styleUrls: ['./charts-reports.component.scss']
})
export class ChartsReportsComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  }
    storeNames:string;
    title = 'dashboard';
  chart;
  chart2 = [];
  pie: any;
  doughnut: any;

  data1 = [];
    constructor(private http: HttpClient,
      private router: Router,
      private service: NGXToastrService,
      private changeDetectorRefs: ChangeDetectorRef) {
        //this.storeInfo();
        //this.eodReports();
        this.dashBoardInfo();
    }
;
  storename:string=localStorage.getItem("storename");
  //storeinfo=new StoreResponse();
  //storeinfermation:StoreResponse[];
//   storeInfo(){
//     console.log("we are in  charts-reports.ts storeInfo methode");
//  return this.http.get<StoreResponse[]>(environment.smartSafeAPIUrl + "/storeinfo/StoreInfoForDashBoard/"+this.storename,this.httpOptions).subscribe(data=>{
//       console.log(data);
//       this.storeinfermation=data;
//     });
// }
eod=new Eod();
eods:Eod[];
//reports:any;
//storename:string=localStorage.getItem("storename");
today:number=0;

// eodReports(){
//  console.log("we are in eod reports");
// return this.http.get<Eod[]>(environment.smartSafeAPIUrl + "/reports/EODReportChartsCopy/"+this.storename+"/"+this.today,this.httpOptions).subscribe(data=>{
//    console.log(data);
//    this.eods=data;
   
//    console.log("this is reports info",this.eods.map(row =>row.totalValue));
   
// });


//}
dashboard:any;
async dashBoardInfo(){
  console.log("we are in dashboard methode");
    return await this.http.get(environment.smartSafeAPIUrl+"/dashbordinfo/AllDashBoardInfo/"+this.storename+"/"+this.today,this.httpOptions).subscribe(data=>{
    console.log(data);
    this.dashboard=data;
    this.eods=this.dashboard["eodReport"];

    console.log("the total eob bill amount is "+this.dashboard.totalEodBillsAmount);
    
  })
}




ngOnInit(){
  console.log("we are in charts-reports ngOnInit() methode");
  //this.storeInfo();

  setTimeout(() => {
		if(this.eods){
      this.pie = new Chart('pie',{
      type: 'pie',
      options: {
          
          responsive: true,
        title: {
          display: true,
          text: 'Bills Inserted Today'
        },legend: {
                    position: 'bottom',
                },animation: {
                    animateScale: true,
                    animateRotate: true
                }
      },
      data: {
                datasets: [{
                    data:this.eods.map(row =>row.totalValue),
                    backgroundColor: ["red","orange","green","yellow","blue"],
                    label: 'Dataset 1'
                }],
                labels: this.eods.map(row =>row.userName)
            }
    })
    }
    
	}, 5000);
  }

addData(chart, label, data) { 
chart.data.labels.push(label);
chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
});
chart.update();
}

removeData(chart) {
chart.data.labels.pop();
chart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
});
chart.update();
}

updateChartData(chart, data, dataSetIndex){
chart.data.datasets[dataSetIndex].data = data;
chart.update();
}

  


}



