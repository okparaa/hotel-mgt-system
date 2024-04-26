import React, { useRef, useEffect } from "react";

interface BarChartProps {
  data: number[];
  width: number;
  height: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Calculate bar width based on number of data points
        const barWidth = width / data.length;

        // Find the maximum value in data for scaling
        const maxValue = Math.max(...data);

        // Draw bars
        data.forEach((value, index) => {
          const barHeight = (value / maxValue) * height;
          const x = index * barWidth;
          const y = height - barHeight;
          const barColor = `hsl(${index * (360 / data.length)}, 70%, 50%)`; // Generate different colors for each bar

          // Draw bar
          ctx.fillStyle = barColor;
          ctx.fillRect(x, y, barWidth, barHeight);

          // Draw data point text
          ctx.fillStyle = "black";
          ctx.textAlign = "center";
          ctx.fillText(value.toString(), x + barWidth / 2, y - 5); // Position text above the bar
        });

        // Draw horizontal axis
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(width, height);
        ctx.stroke();

        // Draw vertical axis
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, height);
        ctx.stroke();

        // Draw horizontal axis ticks and labels
        const horizontalTickSpacing = width / (data.length + 1);
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        data.forEach((_, index) => {
          const x = (index + 1) * horizontalTickSpacing;
          ctx.beginPath();
          ctx.moveTo(x, height);
          ctx.lineTo(x, height + 5);
          ctx.stroke();
          ctx.fillText(`${index + 1}`, x, height + 8);
        });

        // Draw vertical axis ticks and labels
        const verticalTickSpacing = height / 5;
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        for (let i = 0; i <= 5; i++) {
          const y = height - i * verticalTickSpacing;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(-5, y);
          ctx.stroke();
          ctx.fillText(`${(maxValue / 5) * i}`, -8, y);
        }
      }
    }
  }, [data, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default BarChart;
