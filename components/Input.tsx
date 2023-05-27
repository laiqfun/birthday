export default function Input({
  hint = "",
  disabled = false,
  value = "",
  onChange = (v: string) => (value = v),
}: {
  hint?: string;
  disabled?: boolean;
  onChange?(value: string): unknown;
  value?: string;
}) {
  return (
    <div className="flex flex-col text-gray-800">
      <input
        value={value}
        onChange={(ev) => onChange(ev.target.value)}
        disabled={disabled}
        className="border rounded-full duration-200 outline-gray-300 px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
      ></input>
      <p className="text-sm text-opacity-60 p-2 text-center text-red-600">
        {hint}
      </p>
    </div>
  );
}
