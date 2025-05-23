"use client";

import { useEffect, useRef } from "react";

const SiriWave: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const wave1 = svgRef.current?.querySelector("#wave1") as SVGPathElement;
    // const wave2 = svgRef.current?.querySelector("#wave2") as SVGPathElement;
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
      drawWave(wave1, 30, 0.03, 1, 0);
      // drawWave(wave2, 20, 0.035, 1.2, 100);
      drawWave(wave3, 25, 0.04, 0.8, 200);
      t += 1;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        position: "relative",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        className="circular-border z-10"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(1px)",
          zIndex: -1,
        }}
      ></div>
      <svg
        ref={svgRef}
        width="100"
        height="100"
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          borderRadius: "50%",
          backgroundColor: "transparent",
          overflow: "hidden",
        }}
      >
        <g fill="none" strokeWidth="10">
          <path id="wave1" stroke="#4f46e5" />
          {/* <path id="wave2" stroke="#ec4899" /> */}
          <path id="wave3" stroke="#3b82f6" />
        </g>
      </svg>
    </div>
  );
};

export default SiriWave;
