import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})

export class LineChartComponent implements OnInit, AfterViewInit {
  myChart;
  @ViewChild('myDiv') divEle: ElementRef;

  constructor() {}
  ngOnInit() {

  }

  ngAfterViewInit() {
    console.log(this.divEle.nativeElement);
    this.myChart = new Chart(this.divEle.nativeElement, {
      type: 'pie',
      data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Orange'],
          datasets: [{
              label: '# of Votes',
              data: [12, 38, 3, 5, 2, 3, 7],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.3)',
                  'rgba(54, 162, 235, 0.3)',
                  'rgba(255, 206, 86, 0.3)',
                  'rgba(75, 192, 192, 0.3)',
                  'rgba(153, 102, 255, 0.3)',
                  'rgba(255, 159, 64, 0.3)',
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
  }
}
