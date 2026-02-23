import { ErrorMessage } from "@hookform/error-message";
import type {
  FieldValues,
  UseFormRegister,
  Path,
  RegisterOptions,
  FieldErrors,
} from "react-hook-form";

export type InputType =
  | "text"
  | "email"
  | "date"
  | "time"
  | "datetime-local"
  | "number";

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: InputType;
  register?: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  disabled?: boolean;
  errors?: FieldErrors<T>;
  step?: string;
  min?: string | number;
  max?: string | number;
  required?: boolean;
};

function FormInput<T extends FieldValues>({
  label,
  placeholder,
  type = "text",
  name,
  register,
  registerOptions,
  disabled = false,
  errors,
  step,
  min,
  max,
  required = false,
}: Readonly<FormInputProps<T>>) {
  const error = errors?.[name];
  const hasError = !!error;

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label */}
      <label
        htmlFor={String(name)}
        className="block text-sm font-medium text-dark-text"
      >
        {label}
        {required && <span className="text-danger ml-1">*</span>}
      </label>

      {/* Input */}
      <input
        id={String(name)}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        step={step}
        min={min}
        max={max}
        className={`
          w-full px-3 py-2.5 rounded-md text-sm
          bg-dark-bg border transition-all
          text-dark-text placeholder-dark-text/40
          focus:outline-none focus:ring-2 focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          ${
            hasError
              ? "border-danger focus:ring-danger"
              : "border-dark-surface focus:ring-accent"
          }
        `}
        {...(register ? register(name, registerOptions) : {})}
      />

      {/* Error Message */}
      {errors && (
        <ErrorMessage
          errors={errors}
          name={name as any}
          render={({ message }) => (
            <p
              id={`${String(name)}-error`}
              className="text-xs font-medium text-danger"
            >
              {message}
            </p>
          )}
        />
      )}
    </div>
  );
}

export default FormInput;
