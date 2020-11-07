import CanvasJSReact from './canvasjs.react';
import React, { Component } from 'react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;



class PieChart extends Component {
	render() {
		const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "My Budget"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints: [
					{ y: 18, label: "Food" },
					{ y: 49, label: "Rent" },
					{ y: 9, label: "Gas" },
					{ y: 5, label: "Misc" },
					{ y: 19, label: "Social" }
				]
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default PieChart;