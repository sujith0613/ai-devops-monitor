import { forwardRef } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TextureCardStyled = forwardRef(function TextureCardStyled(
  { className, children, ...props },
  ref
) {
  return (
    <div ref={ref} className={cn("tc-styled", className)} {...props}>
      <div className="tc-layer tc-layer-1">
        <div className="tc-layer tc-layer-2">
          <div className="tc-layer tc-layer-3">
            <div className="tc-inner">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
});

const TextureCard = forwardRef(function TextureCard(
  { className, children, ...props },
  ref
) {
  return (
    <div ref={ref} className={cn("tc", className)} {...props}>
      <div className="tc-b1">
        <div className="tc-b2">
          <div className="tc-b3">
            <div className="tc-b4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
});

const TextureCardHeader = forwardRef(function TextureCardHeader(
  { className, ...props },
  ref
) {
  return <div ref={ref} className={cn("tc-header", className)} {...props} />;
});

const TextureCardTitle = forwardRef(function TextureCardTitle(
  { className, ...props },
  ref
) {
  return <h3 ref={ref} className={cn("tc-title", className)} {...props} />;
});

const TextureCardDescription = forwardRef(function TextureCardDescription(
  { className, ...props },
  ref
) {
  return (
    <p ref={ref} className={cn("tc-desc", className)} {...props} />
  );
});

const TextureCardContent = forwardRef(function TextureCardContent(
  { className, ...props },
  ref
) {
  return <div ref={ref} className={cn("tc-content", className)} {...props} />;
});

const TextureCardFooter = forwardRef(function TextureCardFooter(
  { className, ...props },
  ref
) {
  return <div ref={ref} className={cn("tc-footer", className)} {...props} />;
});

const TextureSeparator = forwardRef(function TextureSeparator(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("tc-sep", className)}
      {...props}
    />
  );
});

export {
  TextureCard,
  TextureCardStyled,
  TextureCardHeader,
  TextureCardTitle,
  TextureCardDescription,
  TextureCardContent,
  TextureCardFooter,
  TextureSeparator,
};
