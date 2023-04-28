import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';

interface AttendanceData {
  present: number;
  absent: number;
}

@Component({
  selector: 'app-attendance-chart',
  template: '<canvas id="attendance-chart"></canvas>',
})
export class AttendanceChartComponent implements OnInit {
  attendanceChart: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const ctx = document.getElementById('attendance-chart') as HTMLCanvasElement | null;
    if (ctx) {
      this.fetchAttendanceData().subscribe((data: AttendanceData) => {
        const config: ChartConfiguration<ChartType, number[], string> = {
          type: 'doughnut',
          data: {
            labels: ['Present', 'Absent'],
            datasets: [
              {
                data: [data.present, data.absent],
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
      });
    }
  }

  private fetchAttendanceData() {
    return this.http.get<AttendanceData>('http://localhost/CICTProject/src/get-attendance-data.php');
  }
}
