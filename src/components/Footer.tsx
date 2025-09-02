type FooterProps = {
  edition?: string;
};

export function Footer({ edition }: FooterProps) {
  return (
    <div className="footer">
      <h2>{edition ?? "Edition 08/2025"}</h2>
	</div>
  );
}