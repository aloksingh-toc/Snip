export default function FormField({ label, type = 'text', placeholder, value, onChange, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        required={required}
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
