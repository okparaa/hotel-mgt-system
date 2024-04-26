import React from "react";

interface BarChartProps {
  data: number[];
  width: number;
  height: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, width, height }) => {
  // Calculate maximum value for scaling
  const maxValue = Math.max(...data);

  // Calculate horizontal and vertical scales
  const barWidth = width / data.length;
  const verticalScale = height / maxValue;

  // Generate bars for each data point
  const bars = data.map((value, index) => {
    const barHeight = value * verticalScale;
    const x = index * barWidth;
    const y = height - barHeight;
    const barColor = `hsl(${index * (360 / data.length)}, 70%, 50%)`; // Generate different colors for each bar
    return (
      <rect
        key={index}
        x={x}
        y={y}
        width={barWidth}
        height={barHeight}
        fill={barColor}
      />
    );
  });

  // Generate x-axis ticks and labels
  const xAxisTicks = data.map((_, index) => (
    <text
      key={index}
      x={index * barWidth + barWidth / 2}
      y={height + 15}
      textAnchor="middle"
    >
      {index}
    </text>
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
      {/* Draw bars */}
      {bars}

      {/* Draw x-axis ticks and labels */}
      {xAxisTicks}

      {/* Draw y-axis ticks and labels */}
      {yAxisTicks}
    </svg>
  );
};

export default BarChart;
