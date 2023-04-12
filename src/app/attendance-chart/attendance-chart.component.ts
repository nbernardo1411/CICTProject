import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js/auto';



@Component({
  selector: 'app-attendance-chart',
  template: '<canvas id="attendance-chart"></canvas>',
})
export class AttendanceChartComponent implements OnInit {
  attendanceChart: any;

  constructor() {}

  ngOnInit(): void {
    const ctx = document.getElementById('attendance-chart') as HTMLCanvasElement | null;
    if (ctx) {

      const config: ChartConfiguration<ChartType, number[], string> = {
        type: 'doughnut',
        data: {
          labels: ['Present', 'Absent'],
          datasets: [
            {
              data: [10, 1],
              backgroundColor: ['#00ff40', '#ff0000'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      };

      this.attendanceChart = new Chart(ctx, config);
    }
  }
}
