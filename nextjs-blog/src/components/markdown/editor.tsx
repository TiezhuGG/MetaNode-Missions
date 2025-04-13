import MDEditor from "@uiw/react-md-editor";

export function MarkdownEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="border rounded-lg overflow-hidden" data-color-mode="light">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || "")}
        height={500}
      />
    </div>
  );
}
