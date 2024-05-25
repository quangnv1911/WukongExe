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
    if ((prevProps.returningCustomers !== this.props.returningCustomers) || (prevProps.newCustomers !== this.props.newCustomers)) {
      this.updateChart();
    }
  }

  updateChart() {
    this.setState({
      chartData: [
        {
          name: "Khách hàng quay lại",
          data: this.props.returningCustomers,
        },
        {
          name: "Khách hàng mới",
          data: this.props.newCustomers,
        },
      ],
      chartOptions: {
        chart: {
          id: 'customer-chart',
        },
        xaxis: {
          categories: [
            'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
            'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
          ],
        },
        title: {
          text: 'Customer Growth',
          align: 'left',
        },
        yaxis: {
          title: {
            text: 'Number of Customers(%)',
          },
        },

      },
    });
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type='area'
        width='100%'
        height='100%'
      />
    );
  }
}

export default LineChart;
