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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--color-dark-text)]">
          <GrTransaction />
          <span>Add Transaction</span>
        </h2>
        <ToggleCheckbox
          name="autoCategorization"
          label="Auto Categorization"
          checked={autoCategorizationEnabled}
          handleToggle={toggleAutoCat}
        />
      </div>

      <div className="space-y-4">
        {/* Top row: Name, Amount, Date */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormInput<TransactionRequest>
            name="name"
            label="Name"
            placeholder="Enter name"
            type="text"
            register={register}
            registerOptions={{ required: "Name is required" }}
            errors={errors}
          />
          <FormInput<TransactionRequest>
            name="amount"
            label="Amount"
            placeholder="Enter amount"
            type="number"
            register={register}
            registerOptions={{ required: "Amount is required" }}
            errors={errors}
          />
          <FormInput<TransactionRequest>
            name="transactionDate"
            label="Date"
            placeholder="Enter transaction date"
            type="date"
            register={register}
            registerOptions={{ required: "Transaction Date is required" }}
            errors={errors}
          />
        </div>

        {/* Description */}
        <FormInput<TransactionRequest>
          name="description"
          label="Description"
          placeholder="Enter description (optional)"
          type="text"
          register={register}
        />

        {/* Category select */}
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

        {/* Submit button */}
        <Button type="submit" fullWidth>
          Add
        </Button>
      </div>
    </form>
  );
}

export default NewTransactionForm;
