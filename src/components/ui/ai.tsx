"use client";

import { useEffect, useRef, useState } from "react";

interface SiriWaveProps {
  isWaveMode: boolean; // Prop to determine wave or streamline mode
}

const SiriWave: React.FC<SiriWaveProps> = ({ isWaveMode }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [amplitude, setAmplitude] = useState(isWaveMode ? 30 : 0);

  useEffect(() => {
    const wave1 = svgRef.current?.querySelector("#wave1") as SVGPathElement;
    const wave2 = svgRef.current?.querySelector("#wave2") as SVGPathElement;
    const wave3 = svgRef.current?.querySelector("#wave3") as SVGPathElement;

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

      for (let x = 0; x <= width; x += 2) {
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
      drawWave(wave1, amplitude, 0.02, 0.8, 0);
      drawWave(wave2, amplitude, 0.03, 0.9, 0);
      drawWave(wave3, amplitude, 0.04, 1, 200);
      t += 1;
      requestAnimationFrame(animate);
    };

    animate();
  }, [amplitude]);

  useEffect(() => {
    // Smooth transition of amplitude using an interval
    const targetAmplitude = isWaveMode ? 7 : 0.8;
    const step = isWaveMode ? 1 : -1;

    const interval = setInterval(() => {
      setAmplitude((current) => {
        const nextAmplitude = current + step;
        if (
          (step > 0 && nextAmplitude >= targetAmplitude) ||
          (step < 0 && nextAmplitude <= targetAmplitude)
        ) {
          clearInterval(interval);
          return targetAmplitude;
        }
        return nextAmplitude;
      });
    }, 15);

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
        <g fill="none" strokeWidth={isWaveMode ? "1" : "0.5"}>
          <path id="wave1" stroke="#4f46e5" />
          <path id="wave2" stroke="#ec4899" />
          <path id="wave3" stroke="#9c2dec" />
        </g>
      </svg>
    </div>
  );
};

export default SiriWave;
