import { projects } from './projetcs.data.ts';

export function ProjectsList() {
  return (
    <div className="projects-list">
      <div className="projects-list__contents">
        {projects?.map(({ id, position, name, image }) => (
          <a key={id} className="project">
            <p className="project__number">{position}</p>
            <span className="project__image">
              <img src={image} alt={name} draggable={false} />
            </span>
          </a>
        ))}
      </div>
      <div className="projects-list__preview">
        <p className="projects-years">
          <span>2024</span>
          <span />
          <span>2025</span>
        </p>
      </div>
    </div>
  );
}
