import { Component, OnInit , ElementRef, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import  html2canvas from 'html2canvas';
import  jsPDF from 'jspdf';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('reportTable', { static: true }) reportTable: ElementRef | undefined;
  numberOfUsers: number = 0;
  numberOfCharities: number = 0;
  maxCharityCategories: any[] = [];
  reports: any[] = [];

  Benefits : any[] = [];
 
  chartData: any[] = [];
  view: [number, number] = [700, 400];
  colorScheme = 'vivid';
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  constructor(private adminService: AdminService) {}

  
  ngOnInit(): void {
    this.getNumberOfUsers();
    this.getNumberOfCharities();
    this.getMaxCharityCategories();
    this.getReports();
    this.getBenefits() ;

  }

  getNumberOfUsers() {
    this.adminService.getNumberOfUsers().subscribe(
      (numberOfUsers) => {
        this.numberOfUsers = numberOfUsers;
      },
      (error) => {
        console.error('Error while fetching number of users:', error);
      }
    );
  }
  getNumberOfCharities() {
    this.adminService.getNumberOfCharities().subscribe(
      (numberOfCharities) => {
        this.numberOfCharities = numberOfCharities;
      },
      (error) => {
        console.error('Error while fetching number of Charities:', error);
      }
    );
  }
  generatePDF(): void {
    if (!this.reportTable) {
      console.error('Report table element not found.');
      return;
    }
  
    const element = this.reportTable.nativeElement;
  
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save('report.pdf');
    });
  }
  
  getMaxCharityCategories() {
    this.adminService.getMaxCharityCategory().subscribe(
      (categories) => {
        this.maxCharityCategories = categories;
      },
      (error) => {
        console.error('Error while fetching max charity categories:', error);
      }
    );
  }

  getReports() {
    this.adminService.getReports().subscribe(
      (reports) => {
        this.reports = reports;
      },
      (error) => {
        console.error('Error while fetching reports:', error);
      }
    );
  }
  getBenefits() {
    this.adminService.getBenefits().subscribe(
      (Benefits) => {
        this.Benefits = Benefits;
        this.chartData = Benefits;

        console.log(Benefits);
      },
      (error) => {
        console.error('Error while fetching reports:', error);
      }
    );
  }
  createChart() {
    const chartData = this.Benefits.map(benefit => ({
      name: benefit.profits,
      value: benefit.value
    }));
    this.chartData = chartData; 
  }

  Chart() {
    this.adminService.getBenefits().subscribe(
      (Benefits) => {
        this.chartData = Benefits;

        console.log(Benefits);
      },
      (error) => {
        console.error('Error while fetching reports:', error);
      }
    );
  }

}