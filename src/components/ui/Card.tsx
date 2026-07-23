import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass rounded-[20px] border border-white/50 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
