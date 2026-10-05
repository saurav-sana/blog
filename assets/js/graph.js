// Example: Render a simple line chart using Chart.js for all graph sections
document.addEventListener('DOMContentLoaded', function() {
  var ctx = document.getElementById('changeGraph');
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Start', 'Mid', 'End'],
        datasets: [{
          label: 'Change Progress',
          data: [0, 50, 100],
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37,99,235,0.1)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true }
        }
      }
    });
  }
});