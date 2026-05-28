import type { Project, ProjectStatus } from "@/types/project";

const STATUS_LABELS: Record<ProjectStatus, string> = {
  concept: "Concept",
  draft: "Draft",
  in_progress: "In progress",
  shipped: "Shipped",
  archived: "Archived",
};

type ProjectExpandMetaProps = {
  project: Project;
};

export function ProjectExpandMeta({ project }: ProjectExpandMetaProps) {
  const items = [
    { label: "Year", value: project.year },
    { label: "Type", value: project.type },
    { label: "Role", value: project.role },
    { label: "Status", value: STATUS_LABELS[project.status] },
    { label: "Context", value: project.context },
  ];

  return (
    <dl className="expand-meta">
      {items.map(({ label, value }) => (
        <div key={label} className="expand-meta__item">
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
