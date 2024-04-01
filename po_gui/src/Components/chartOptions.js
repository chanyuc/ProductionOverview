// (CY): Function to view the chartbox
export const options = {
    scales: {
      x: {
        grid: {
          display: false,
          color: 'azure'
        },
        ticks: {
          color: 'azure'
        }
      },
      y: {
        grid: {
          display: false,
          color: 'azure'
        },
        ticks: {
          color: 'azure'
        },
        min: -100,
        max: 100
      }
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        position: 'nearest',
        borderWidth: 5,
        padding: 20,
      },
      legend: {
        labels: {
          color: 'azure'
        }
      }
    }
};
  