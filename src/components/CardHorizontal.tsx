import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type CardHorizontalProps = {
  title: string;
  description?: string;
  image: string;
  link: string;
  date?: string;
  categoryName?: string;
  children?: ReactNode; // 🚀 extra content
};

export function CardHorizontal({
  title,
  description,
  image,
  link,
  date,
  categoryName,
  children,
}: CardHorizontalProps) {
  return (
    <div className="card-horizontal">
      <Link to={link}>
        <img src={image} alt={title} />
      </Link>
      <div className="card-info">
        <h3>
          <Link to={link}>{title}</Link>
        </h3>
        {date && (
          <p className="meta">
            {date} {categoryName ? `· ${categoryName}` : ""}
          </p>
        )}
        {description && <p>{description}</p>}

        {/* 🚀 render children if provided */}
        {children && <div className="card-extra">{children}</div>}
      </div>
    </div>
  );
}
