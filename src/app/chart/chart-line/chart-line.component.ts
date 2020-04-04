import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.css']
})

export class ChartLineComponent implements AfterViewInit {
  charts = ['line', 'bar', 'radar', 'doughnut', 'pie', 'polarArea', 'bubble', 'scatter'];
  myChart;
  selection = 'bar';
  @ViewChild('canId') EleDiv: ElementRef;
  constructor() {}
  ngAfterViewInit() {
    this.onChart();
  }
  onChart() {
    console.log(this.selection);
    this.myChart = new Chart(this.EleDiv.nativeElement, {
      type: this.selection,
      data: {
        labels: ['jan', 'march', 'may', 'july', 'sep'],
        datasets: [
          {
            data: [15, 29, 24, 15, 21],
            label: 'Bar Dataset',
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
