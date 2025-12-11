type FormCheckboxProps = {
  label: string;
  name: string;
  handleToggle: () => void;
  checked: boolean;
};

function ToggleCheckbox({
  label,
  name,
  handleToggle,
  checked,
  ...props
}: Readonly<FormCheckboxProps>) {
  return (
    <div className="text-[var(--color-dark-text)]">
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleToggle}
          {...props}
          className="w-5 h-5 rounded border border-[var(--color-dark-surface)] 
                     bg-[var(--color-dark-bg)] text-[var(--color-accent)] 
                     focus:ring-2 focus:ring-[var(--color-accent)] transition-colors"
        />
        <span className="text-sm font-medium">{label}</span>
      </label>
    </div>
  );
}

export default ToggleCheckbox;
