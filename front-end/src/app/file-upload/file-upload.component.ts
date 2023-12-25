import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Chart, { ChartType } from 'chart.js/auto';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFile: File | undefined;
  analysisData: any = {};
  barChart: Chart | undefined;
  pieChart: Chart | undefined;


  constructor(private http: HttpClient) {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onFileUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post<any>('http://localhost:3000/upload', formData).subscribe({
        next: response => {
          console.log('Ответ сервера:', response);
          this.chartsDestroy()
          this.displayBarChart(response);
          this.displayPieChart(response);
          this.displayCategoricalValues(response);
          this.displayNumericValues(response);
        },
        error: error => {
          console.error('Ошибка загрузки файла', error);
        }
      });
    }
  }

  displayCategoricalValues(analysisData: any) {
    this.analysisData = analysisData;
    const categoricalValuesContainer = document.getElementById('categoricalValues');
    if (categoricalValuesContainer && this.analysisData.categoricalColumns) {
      categoricalValuesContainer.innerHTML = '';
      Object.keys(this.analysisData.categoricalColumns).forEach(column => {
        const listItem = document.createElement('li');
        listItem.textContent = `${column}: categorical`;
        categoricalValuesContainer.appendChild(listItem);
      });
    } else {
      console.error('Элемент "categoricalValues" не найден или отсутствуют данные для отображения');
    }
  }

  displayNumericValues(analysisData: any) {
    const numericValuesContainer = document.getElementById('numericValues');

    if (numericValuesContainer && this.analysisData.numericColumns) {
      numericValuesContainer.innerHTML = '';
      Object.keys(this.analysisData.numericColumns).forEach(column => {
        const listItem = document.createElement('li');
        listItem.textContent = `${column}: numerical`;
        numericValuesContainer.appendChild(listItem);
      });
    } else {
      console.error('Элемент "numericValues" не найден или отсутствуют данные для отображения');
    }
  }


  displayBarChart(analysisData: any) {
    this.analysisData = analysisData;

    // console.log(Object.keys(this.analysisData.numericColumns))

    const chartData = {
      labels: Object.keys(this.analysisData.numericColumns),
      datasets: [{
        label: 'Значения',
        data: this.analysisData.numericColumns,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }]
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      // Дополнительные опции для столбчатой диаграммы
    };

    const ctx = document.getElementById('chartBarCanvas') as HTMLCanvasElement;
    this.barChart = new Chart(ctx, {
      type: 'bar' as ChartType,
      data: chartData,
      options: chartOptions,
    });
  }

  displayPieChart(analysisData: any) {
    this.analysisData = analysisData;

    const chartData = {
      labels: this.analysisData.labels,
      datasets: [{
        data: this.analysisData.values[0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(234, 162, 235, 0.5)',
          'rgba(75, 62, 35, 0.5)',
          'rgba(175, 62, 35, 0.5)',
          'rgba(175, 162, 35, 0.5)',
          'rgba(5, 162, 35, 0.5)',
          'rgba(55, 6, 186, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(234, 162, 235, 1)',
          'rgba(75, 62, 35, 1)',
          'rgba(175, 62, 35, 1)',
          'rgba(175, 162, 35, 1)',
          'rgba(5, 162, 35, 1)',
          'rgba(55, 6, 186, 1)'
        ],
        borderWidth: 1,
      }]
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      // Дополнительные опции для круговой диаграммы
    };

    const ctx = document.getElementById('chartPieCanvas') as HTMLCanvasElement;
    this.pieChart = new Chart(ctx, {
      type: 'pie' as ChartType,
      data: chartData,
      options: chartOptions,
    });
  }




  chartsDestroy() {
    if (this.barChart) {
      this.barChart.destroy();
    }
    if (this.pieChart) {
      this.pieChart.destroy();
    }
    this.analysisData = null;
  }



}
