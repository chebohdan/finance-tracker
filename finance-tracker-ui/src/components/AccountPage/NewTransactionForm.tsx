import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import FormInput from "../Inputs/FormInput";
import ToggleCheckbox from "../Inputs/Checkbox";
import FormSelectInput, {
  type FormSelectInputOption,
} from "../Inputs/FormSelectInput";
import type { TransactionRequest } from "../../types/types";
import Button from "../Button/Button";
import { GrTransaction } from "react-icons/gr";

type NewTransactionFormProps = {
  register: UseFormRegister<TransactionRequest>;
  errors: FieldErrors<TransactionRequest>;
  toggleAutoCat: () => void;
  handleSubmit: UseFormHandleSubmit<TransactionRequest, TransactionRequest>;
  onSubmit: (transactionRequest: TransactionRequest) => void;
  categoryOptions: FormSelectInputOption[];
  autoCategorizationEnabled: boolean;
};

function NewTransactionForm({
  register,
  errors,
  toggleAutoCat,
  autoCategorizationEnabled,
  handleSubmit,
  onSubmit,
  categoryOptions,
}: Readonly<NewTransactionFormProps>) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Form Header */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-dark-text">
            <GrTransaction className="text-accent" aria-hidden="true" />
            <span>Add Transaction</span>
          </h2>
          <p className="text-xs text-dark-text/60 mt-1">
            Record a new transaction to your account
          </p>
        </div>

        {/* Auto Categorization Toggle */}
        <ToggleCheckbox
          name="autoCategorization"
          label="Auto"
          checked={autoCategorizationEnabled}
          handleToggle={toggleAutoCat}
        />
      </div>

      {/* Main Fields Grid */}
      <fieldset className="space-y-4">
        <legend className="sr-only">Transaction Details</legend>

        {/* Top row: Name, Amount, Date */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormInput<TransactionRequest>
            name="name"
            label="Name"
            placeholder="Groceries"
            type="text"
            register={register}
            registerOptions={{ required: "Name is required" }}
            errors={errors}
          />
          <FormInput<TransactionRequest>
            name="amount"
            label="Amount"
            placeholder="0.00"
            type="number"
            register={register}
            registerOptions={{ required: "Amount is required" }}
            errors={errors}
          />
          <FormInput<TransactionRequest>
            name="transactionDate"
            label="Date"
            placeholder="0.00"
            type="date"
            register={register}
            registerOptions={{ required: "Date is required" }}
            errors={errors}
          />
        </div>

        {/* Description */}
        <div>
          <FormInput<TransactionRequest>
            name="description"
            label="Description"
            placeholder="Add a note... (optional)"
            type="text"
            register={register}
          />
        </div>

        {/* Category Select */}
        <div>
          <FormSelectInput
            options={categoryOptions}
            label="Category"
            register={register}
            name="categoryId"
            disabled={autoCategorizationEnabled}
            registerOptions={{
              validate: (value) => {
                if (autoCategorizationEnabled || value) return true;
                return "Category is required";
              },
            }}
            errors={errors}
          />
          {autoCategorizationEnabled && (
            <p className="text-xs text-dark-text/60 mt-2">
              Category will be auto-assigned
            </p>
          )}
        </div>
      </fieldset>

      {/* Submit Button */}
      <Button type="submit" fullWidth>
        <span className="flex items-center justify-center gap-2">
          <GrTransaction />
          <span>Add Transaction</span>
        </span>
      </Button>
    </form>
  );
}

export default NewTransactionForm;
