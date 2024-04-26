import React from "react";

interface LineChartProps {
  data: number[];
  width: number;
  height: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, width, height }) => {
  // Calculate maximum value for scaling
  const maxValue = Math.max(...data);

  // Calculate horizontal and vertical scales
  const horizontalScale = width / (data.length - 1);
  const verticalScale = height / maxValue;

  // Generate path data for the line
  const pathData = data
    .map(
      (value, index) =>
        `${index * horizontalScale},${height - value * verticalScale}`
    )
    .join(" ");

  // Generate x-axis ticks and labels
  const xAxisTicks = data.map((_, index) => (
    <g key={index}>
      <line
        x1={index * horizontalScale}
        y1={height}
        x2={index * horizontalScale}
        y2={height + 5}
        stroke="black"
      />
      <text x={index * horizontalScale} y={height + 8} textAnchor="middle">
        {index}
      </text>
    </g>
  ));

  // Generate y-axis ticks and labels
  const yAxisTicks = Array.from({ length: 6 }).map((_, i) => {
    const y = height - (i * height) / 5;
    return (
      <g key={i}>
        <line x1={0} y1={y} x2={-5} y2={y} stroke="black" />
        <text x={-8} y={y} textAnchor="end" dy="0.32em">
          {(maxValue / 5) * i}
        </text>
      </g>
    );
  });

  return (
    <svg width={width} height={height}>
      {/* Draw line */}
      <polyline points={pathData} fill="none" stroke="blue" strokeWidth="2" />

      {/* Draw x-axis ticks and labels */}
      {xAxisTicks}

      {/* Draw y-axis ticks and labels */}
      {yAxisTicks}
    </svg>
  );
};

export default LineChart;
