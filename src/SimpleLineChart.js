import React from "react";
import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ReferenceLine,
	ReferenceArea,
	Area,
	Bar,
	ComposedChart,
} from "recharts";

const SimpleLineChart = ({ ...props }) => {
	const { data } = props;
	const standardPercentiles = [
		[10, "red"],
		[25, "#82ca9d"],
		[50, "#B0B0B0"],
		[75, "#ffc658"],
		[85, "red"],
	];
	console.log(data);
	return (
		<ResponsiveContainer width="99%" height={320}>
			<ComposedChart data={data}>
				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />

				{standardPercentiles.map((s, i) => (
					<Line
						key={i}
						activeDot={false}
						name={`${s[0]}th Percentile`}
						type="monotone"
						unit="kg"
						dataKey={s[0]}
						stackId="1"
						// fill={s[1]}
						stroke={s[1]}
					/>
				))}
				<Line
					name="Weight"
					unit="kg"
					type="monotone"
					dataKey="weight"
					stroke="#8884d8"
					activeDot={{ r: 8 }}
				/>
				<XAxis dataKey="age" />
				<YAxis dataKey="weight" domain={[0, "dataMax"]} unit="kg" />
				<Tooltip />
				<Legend />
			</ComposedChart>
		</ResponsiveContainer>
	);
};

export default SimpleLineChart;
