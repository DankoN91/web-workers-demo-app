import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'web-worker-demo-app';

  power1: number;
  power2: number;

  sumWebWorker = 0;
  sum = 0;
  stopwatch = 0;

  constructor() {}

  ngOnInit() {
    setInterval(() => {
      this.stopwatch++;
    }, 1000);
  }

  getSum = () => {
    let n = Math.pow(10, this.power1);
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += Math.pow(i, this.power2);
    }
    this.sum = sum;
  };

  getSumWebWorker = () => {
    this.sumWebWorker = 0;
    if (typeof Worker !== 'undefined') {
      const worker = new Worker('./transactions.worker', { type: 'module' });

      worker.postMessage({ power1: this.power1, power2: this.power2 });

      worker.onmessage = ({ data }) => {
        this.sumWebWorker = data;
      };
      //
    } else {
      //   // Web Workers are not supported in this environment.
      //   // You should add a fallback so that your program still executes correctly.
    }
  };
}

// if (typeof Worker !== 'undefined') {
//   // Create a new
//   const worker = new Worker('./app.worker', { type: 'module' });
//   worker.onmessage = ({ data }) => {
//     console.log(`page got message: ${data}`);
//   };
//   worker.postMessage('hello');
// } else {
//   // Web Workers are not supported in this environment.
//   // You should add a fallback so that your program still executes correctly.
// }
