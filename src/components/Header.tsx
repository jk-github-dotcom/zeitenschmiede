type HeaderProps = {
  title?: string;
};

export function Header({ title }: HeaderProps) {
  return <h1 className="header">{title ?? "Default React App"}</h1>;
}
