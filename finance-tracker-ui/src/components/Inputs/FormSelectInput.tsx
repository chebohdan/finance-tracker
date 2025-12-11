import { ErrorMessage } from "@hookform/error-message";
import type {
  FieldValues,
  Path,
  UseFormRegister,
  RegisterOptions,
  FieldErrors,
} from "react-hook-form";

export type FormSelectInputOption = {
  label: string;
  value: string;
};

type FormSelectInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  options: FormSelectInputOption[];
  register?: UseFormRegister<T>;
  disabled: boolean;
  registerOptions?: RegisterOptions<T, Path<T>>;
  errors?: FieldErrors<T>; // ✅ add errors
};

{
  /*TODO Make disabled optional*/
}
function FormSelectInput<T extends FieldValues>({
  name,
  label,
  options,
  register,
  registerOptions,
  disabled,
  errors,
}: Readonly<FormSelectInputProps<T>>) {
  return (
    <div className="mt-3">
      <label className="flex flex-col items-start gap-1 text-[var(--color-dark-text)]">
        <span>{label}</span>
        <select
          className={`
            mt-3 bg-[var(--color-dark-bg)] 
            rounded-lg block w-full p-2.5 
            text-[var(--color-dark-text)] 
            focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]
            ${
              disabled
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-[var(--color-dark-bg)] text-[var(--color-dark-text)]"
            }
          `}
          {...(register ? register(name, registerOptions) : {})}
          disabled={disabled}
        >
          <option value="">Select {label.toLowerCase()}</option>{" "}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {errors && (
        <ErrorMessage
          errors={errors}
          name={name as any}
          render={({ message }) => (
            <span className="text-red-500">{message}</span>
          )}
        />
      )}
    </div>
  );
}

export default FormSelectInput;
