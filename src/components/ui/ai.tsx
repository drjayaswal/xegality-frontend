"use client";

import { useEffect, useRef, useState } from "react";

interface SiriWaveProps {
  isWaveMode: boolean;
  colors: string[];
}

const SiriWave: React.FC<SiriWaveProps> = ({ isWaveMode, colors }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [amplitude, setAmplitude] = useState(isWaveMode ? 30 : 0);
  const ACCENT_COLOR = "#3b82f6";

  useEffect(() => {
    const waves: SVGPathElement[] = Array.from({ length: 4 }, (_, i) =>
      svgRef.current?.querySelector(`#wave${i + 1}`)
    ).filter(Boolean) as SVGPathElement[];

    let t = 0;

    const drawWave = (
      path: SVGPathElement | null,
      amplitude: number,
      frequency: number,
      speed: number,
      phaseOffset: number
    ) => {
      if (!path) return;

      const width = 300;
      const height = 300;
      const centerY = height / 2;
      const points: [number, number][] = [];

      for (let x = 0; x <= width; x += 3) {
        const y =
          centerY +
          Math.sin((x + t * speed + phaseOffset) * frequency) * amplitude;
        points.push([x, y]);
      }

      let d = `M${points[0][0]},${points[0][1]}`;
      for (let i = 1; i < points.length; i++) {
        d += ` L${points[i][0]},${points[i][1]}`;
      }
      path.setAttribute("d", d);
    };

    const animate = () => {
      waves.forEach((wave, i) => {
        drawWave(wave, amplitude, 0.02 + i * 0.006, 0.8 + i * 0.05, i * 100);
      });
      t += 1;
      requestAnimationFrame(animate);
    };

    animate();
  }, [amplitude]);

  useEffect(() => {
    const targetAmplitude = isWaveMode ? 5 : 0.5;
    const step = isWaveMode ? 1 : -1;

    const interval = setInterval(() => {
      setAmplitude((current) => {
        const next = current + step;
        if (
          (step > 0 && next >= targetAmplitude) ||
          (step < 0 && next <= targetAmplitude)
        ) {
          clearInterval(interval);
          return targetAmplitude;
        }
        return next;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [isWaveMode]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          borderRadius: "50%",
          backgroundColor: "transparent",
          overflow: "hidden",
        }}
      >
        <g fill="none" strokeWidth={isWaveMode ? 2 : 1}>
          {Array.from({ length: 4 }).map((_, i) => (
            <path
              key={`wave${i + 1}`}
              id={`wave${i + 1}`}
              stroke={colors[i]}
              strokeOpacity={0.5}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default SiriWave;
