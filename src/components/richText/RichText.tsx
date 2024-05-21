import { serializeLexical } from "./serialize";

export const RichText: React.FC<any> = (props) => {
  const { className, content } = props;

  if (!props) {
    return null;
  }

  return (
    <div className={["typography prose", className].filter(Boolean).join(" ")}>
      {content &&
        !Array.isArray(content) &&
        typeof content === "object" &&
        "root" in content &&
        serializeLexical({ nodes: content?.root?.children })}
    </div>
  );
};
