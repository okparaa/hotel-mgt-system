import React, { useRef, useEffect } from "react";

interface PieChartProps {
  data: number[];
  width: number;
  height: number;
}

const PieChart: React.FC<PieChartProps> = ({ data, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Calculate total value for all data points
        const totalValue = data.reduce((acc, val) => acc + val, 0);

        // Calculate center and radius of the pie chart
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2;

        // Draw pie slices
        let startAngle = 0;
        data.forEach((value, index) => {
          const sliceAngle = (value / totalValue) * 2 * Math.PI;

          // Set color for pie slice
          const sliceColor = `hsl(${index * (360 / data.length)}, 70%, 50%)`;
          ctx.fillStyle = sliceColor;

          // Draw pie slice
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(
            centerX,
            centerY,
            radius,
            startAngle,
            startAngle + sliceAngle
          );
          ctx.lineTo(centerX, centerY);
          ctx.fill();

          // Update start angle for next slice
          startAngle += sliceAngle;
        });
      }
    }
  }, [data, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default PieChart;
