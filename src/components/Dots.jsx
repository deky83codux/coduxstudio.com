"use client";
// Section titles that end with a full stop get three coloured "typing" dots
// instead. Titles without a trailing "." render unchanged.
export function Dots({ children }) {
  if (typeof children !== "string" || !children.endsWith(".") || children.endsWith("..")) {
    return children;
  }
  const text = children.slice(0, -1);
  const cut = text.lastIndexOf(" ") + 1;
  return (
    <>
      {text.slice(0, cut)}
      {/* last word + dots never wrap apart */}
      <span style={{ whiteSpace: "nowrap" }}>
        {text.slice(cut)}
        <span className="tdots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </span>
      <span className="sr-dot">.</span>
    </>
  );
}
