import React, { useRef, useEffect } from "react";

interface LineChartProps {
  data: number[];
  width: number;
  height: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Calculate maximum value for scaling
        const maxValue = Math.max(...data);

        // Calculate horizontal and vertical scales
        const horizontalScale = width / (data.length - 1);
        const verticalScale = height / maxValue;

        // Draw lines connecting data points
        ctx.beginPath();
        data.forEach((value, index) => {
          const x = index * horizontalScale;
          const y = height - value * verticalScale;
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.strokeStyle = "blue";
        ctx.stroke();

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
        const horizontalTickSpacing = width / (data.length - 1);
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        data.forEach((_, index) => {
          const x = index * horizontalTickSpacing;
          ctx.beginPath();
          ctx.moveTo(x, height);
          ctx.lineTo(x, height + 5);
          ctx.stroke();
          ctx.fillText(`${index}`, x, height + 8);
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

export default LineChart;
