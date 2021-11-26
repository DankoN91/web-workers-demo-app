/// <reference lib="webworker" />

addEventListener('message', ({ data }: any) => {
  let n = Math.pow(10, data.power1);
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += Math.pow(i, data.power2);
  }
  postMessage(sum);
});
