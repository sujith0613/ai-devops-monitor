import { forwardRef } from "react";

const sizeStyles = {
  sm:   { outerRadius: 6, innerRadius: 4, px: 16, py: 4, fontSize: 12 },
  default: { outerRadius: 12, innerRadius: 10, px: 16, py: 8, fontSize: 13 },
  lg:   { outerRadius: 12, innerRadius: 10, px: 16, py: 8, fontSize: 14 },
  icon: { outerRadius: 9999, innerRadius: 9999, px: 4, py: 4, fontSize: 13 },
};

const TextureButton = forwardRef(function TextureButton(
  { children, variant = "primary", size = "default", className, style, asChild, ...props },
  ref
) {
  const s = sizeStyles[size] || sizeStyles.default;

  const Comp = asChild ? "span" : "button";

  return (
    <Comp
      ref={ref}
      className={`tb-btn tb-btn-${variant}${className ? " " + className : ""}`}
      style={{
        display: "inline-flex",
        padding: 1,
        cursor: "pointer",
        border: "1px solid #0a0a0a",
        borderRadius: s.outerRadius,
        transition: "all 0.3s ease-in-out",
        fontFamily: "Geist, sans-serif",
        textDecoration: "none",
        outline: "none",
        userSelect: "none",
        ...style,
      }}
      {...props}
    >
      <div
        className="tb-inner"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          borderRadius: s.innerRadius,
          padding: `${s.py}px ${s.px}px`,
          fontSize: s.fontSize,
          fontWeight: 500,
          whiteSpace: "nowrap",
          flex: 1,
          transition: "all 0.3s ease-in-out",
        }}
      >
        {children}
      </div>
    </Comp>
  );
});

export { TextureButton };
