import '../stylez/styles.css';

export default function InputField({ label, name, type, placeholder, value, onChange, icon, required }) {
  return (
    <div className="input-field">
      <label className="input-label" htmlFor={name}>{label}</label>
      <div className="input-wrapper">
        {icon}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="input-box"
        />
      </div>
    </div>
  );
}
