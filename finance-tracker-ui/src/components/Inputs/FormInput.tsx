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
  placeholder: string;
  type: InputType;
  register?: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  disabled?: boolean;
  errors?: FieldErrors<T>; // ✅ add errors
};

function FormInput<T extends FieldValues>({
  label,
  placeholder,
  type,
  name,
  register,
  registerOptions,
  disabled,
  errors,
}: Readonly<FormInputProps<T>>) {
  return (
    <div className="mt-3">
      <label className="flex flex-col items-start gap-1 text-[var(--color-dark-text)]">
        <span>{label}</span>
        <input
          className={`mt-3 block w-full p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]
            bg-[var(--color-dark-bg)] text-[var(--color-dark-text)]
            ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          {...(register ? register(name, registerOptions) : {})}
        />
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

export default FormInput;
