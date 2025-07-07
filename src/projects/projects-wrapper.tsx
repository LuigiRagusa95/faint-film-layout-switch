import type { ReactNode } from 'react';

export function ProjectsWrapper({ children }: { children?: ReactNode }) {
  return (
    <div className="wrapper">
      <div className="scroller">
        <div className="projects">{children}</div>
      </div>
    </div>
  );
}
