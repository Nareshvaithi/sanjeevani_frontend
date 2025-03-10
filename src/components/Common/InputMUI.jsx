// Reusable InputField Component
const InputField = ({ icon, label, name, value, onChange, disabled, options, type = "text" }) => (
    <div className="flex items-start gap-3">
      <div className="text-buttonblue text-xl">{icon}</div>
      <div className="w-full">
        <h3 className="font-semibold -mb-1">{label}</h3>
  
        {options ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full p-2 border rounded ${disabled ? "cursor-not-allowed bg-gray-100" : ""}`}
          >
            <option value="">Select {label}</option> {/* Default Placeholder */}
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type} // Use the type passed as a prop
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full mt-2 p-2 border rounded ${disabled ? "cursor-not-allowed bg-gray-100" : ""}`}
          />
        )}
      </div>
    </div>
  );


export default InputField;