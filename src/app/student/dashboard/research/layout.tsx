import type React from "react";
export default function PenalCodeSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto py-6 h-[calc(100vh-6rem)]">
      {children}
    </div>
  );
}
