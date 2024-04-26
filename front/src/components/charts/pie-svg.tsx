import React from "react";

interface PieChartProps {
  data: number[];
  width: number;
  height: number;
}

const PieChart: React.FC<PieChartProps> = ({ data, width, height }) => {
  // Calculate total value for all data points
  const totalValue = data.reduce((acc, val) => acc + val, 0);

  // Calculate center and radius of the pie chart
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2;

  // Generate path data for each slice of the pie chart
  let startAngle = 0;
  const pathData = data.map((value, _) => {
    const sliceAngle = (value / totalValue) * 360;
    const endAngle = startAngle + sliceAngle;
    const largeArcFlag = sliceAngle > 180 ? 1 : 0;
    const startX = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
    const startY = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
    const endX = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
    const endY = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
    const path = `M${centerX},${centerY} L${startX},${startY} A${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY} Z`;
    startAngle = endAngle;
    return path;
  });

  // Generate labels for each slice of the pie chart
  const labels = data.map((value, index) => (
    <text
      key={index}
      x={centerX}
      y={centerY - radius + 20}
      transform={`rotate(${
        startAngle + (value / totalValue) * 180
      }, ${centerX}, ${centerY})`}
      textAnchor="middle"
    >
      {value}
    </text>
  ));

  return (
    <svg width={width} height={height}>
      {pathData.map((d, i) => (
        <path
          key={i}
          d={d}
          fill={`hsl(${i * (360 / data.length)}, 70%, 50%)`}
        />
      ))}
      {labels}
    </svg>
  );
};

export default PieChart;
