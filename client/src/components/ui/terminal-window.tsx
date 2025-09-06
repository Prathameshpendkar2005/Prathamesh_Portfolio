import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function TerminalWindow({ title = "terminal", children, className, hover = false }: TerminalWindowProps) {
  return (
    <div className={cn(
      "terminal-window",
      hover && "hover:glow-border transition-all duration-300",
      className
    )}>
      <div className="terminal-header">
        <div className="terminal-dot dot-red"></div>
        <div className="terminal-dot dot-yellow"></div>
        <div className="terminal-dot dot-green"></div>
        <span className="font-mono text-sm text-muted ml-4">{title}</span>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
