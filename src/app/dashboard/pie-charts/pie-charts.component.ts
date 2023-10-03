import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Eod } from 'app/model/eod';
import { NGXToastrService } from 'app/service/toastr.service';
import { data } from 'app/shared/data/smart-data-table';
import { Chart } from 'chart.js';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-pie-charts',
  templateUrl: './pie-charts.component.html',
  styleUrls: ['./pie-charts.component.scss']
})
export class PieChartsComponent implements OnInit ,AfterViewInit{

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  }
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
      this.eodReports();
  };

   eod=new Eod();
   eods:Eod[];
   //reports:any;
  storename:string=localStorage.getItem("storename");
  today:number=0;

  eodReports(){
    console.log("we are in eod reports");
 return this.http.get<Eod[]>(environment.smartSafeAPIUrl + "/reports/EODReportChartsCopy/"+this.storename+"/"+this.today,this.httpOptions).subscribe(data=>{
      console.log(data);
      this.eods=data;
      console.log("this is reports info",this.eods.map(row =>row.totalValue));
  });
  
   
  }

  


ngAfterViewInit(){
  setTimeout(() => {
		if(this.eods){
      this.pie = new Chart('pie',{
      type: 'pie',
      options: {
          
          responsive: true,
        title: {
          display: true,
          text: 'Pie Chart'
        },legend: {
                    position: 'top',
                },animation: {
                    animateScale: true,
                    animateRotate: true
                }
      },
      data: {
                datasets: [{
                    data:this.eods.map(row =>row.totalValue),
                    backgroundColor: ["red","orange","yellow","green","blue"],
                    label: 'Dataset 1'
                }],
                labels: this.eods.map(row =>row.userName)
            }
    })
    }
    
	}, 10000);
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
  ngOnInit() {
    console.log(this.storename);
    
    console.log("this is ",this.eods);
  
    }

}

  


