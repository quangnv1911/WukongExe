import React from "react";
import ReactApexChart from "react-apexcharts";

class LineChart extends React.Component {
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
    if ((prevProps.revenues !== this.props.revenues) || (prevProps.profits !== this.props.profits)) {
      this.updateChart();
    }
  }

  updateChart() {
    this.setState({
      chartData: [
        {
          name: "Revenue",
          data: this.props.revenues,
        },
        {
          name: "Profit",
          data: this.props.profits,
        },
      ],
      chartOptions: this.props.chartOptions,
    });
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type='line'
        width='100%'
        height='100%'
      />
    );
  }
}

export default LineChart;
