import React from "react";
import ReactApexChart from "react-apexcharts";

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    this.updateChart();
  }

  componentDidUpdate(prevProps) {
    // Kiểm tra nếu prop chartData thay đổi so với giá trị trước đó
    if (prevProps.chartData !== this.props.chartData) {
      this.updateChart();
    }
  }

  // Phương thức này được tách ra để tái sử dụng trong componentDidMount và componentDidUpdate
  updateChart() {
    this.setState({
      chartData: this.props.chartData,
      chartOptions: {
        labels: this.props.labels ? this.props.labels : ['Label1', 'Label2'],
        colors: ["#55efc4",
          "#74b9ff",
          "#a29bfe",
          "#00b894",
          "#fdcb6e",
          "#e17055",
          "#d63031",
          "#e84393",
          "#fab1a0",
          "#00cec9",
          "#b2bec3"
        ],
        chart: {
          width: "50px",
        },
        states: {
          hover: {
            filter: {
              type: "none",
            },
          },
        },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        hover: { mode: null },
        plotOptions: {
          donut: {
            expandOnClick: false,
            donut: {
              labels: {
                show: false,
              },
            },
          },
        },
        fill: {
          colors: ["#55efc4",
            "#74b9ff",
            "#a29bfe",
            "#00b894",
            "#fdcb6e",
            "#e17055",
            "#d63031",
            "#e84393",
            "#fab1a0",
            "#00cec9",
            "#b2bec3"
          ],
        },
        tooltip: {
          enabled: true,
          theme: "dark",
        },
      },
    });
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type='pie'
        width='100%'
        height='80%'
      />
    );
  }
}

export default PieChart;
