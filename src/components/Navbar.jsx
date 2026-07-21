
export default function Navbar({ eyebrow, title, children }) {
  return (
    <header className="flex items-center justify-between gap-4 flex-wrap mb-6">
      {(eyebrow || title) && (
        <div className="flex flex-col gap-1">
          {eyebrow && <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-primary">{eyebrow}</span>}
          {title && <h1 className="text-[26px] max-[560px]:text-[22px] font-bold">{title}</h1>}
        </div>
      )}
      {children && <div className="flex items-center gap-3">{children}</div>}
    </header>
  );
}
