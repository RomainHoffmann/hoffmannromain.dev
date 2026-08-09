import type { HTMLAttributes } from "react";

type TechTagsProps = {
  items: readonly string[];
} & HTMLAttributes<HTMLUListElement>;

export function TechTags({ items, className = "", ...rest }: TechTagsProps) {
  return (
    <ul
      className={["tech-tags", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {items.map((tech) => (
        <li key={tech} className="tech-tags__item">
          {tech}
        </li>
      ))}
    </ul>
  );
}
