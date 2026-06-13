export default function BeamButton({ children, className = "", ...props }) {
  return (
    <button className={`btn ${className} beam-btn`} {...props}>{children}</button>
  );
}
