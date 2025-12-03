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
    <div className="h-full rounded-lg p-6 mb-8 border-2 border-[var(--color-dark-surface)]">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-[var(--color-dark-text)]">
          Add Transaction
        </h2>
        <ToggleCheckbox
          name="autoCategorization"
          label={"Auto Categorization"}
          checked={autoCategorizationEnabled}
          handleToggle={toggleAutoCat}
        />
      </div>

      <div className="space-y-4">
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

        <FormInput<TransactionRequest>
          name="description"
          label="Description"
          placeholder="Enter description (optional)"
          type="text"
          register={register}
        />

        <FormSelectInput
          options={categoryOptions}
          label="Categories"
          register={register}
          name="categoryId"
          disabled={autoCategorizationEnabled}
          registerOptions={{
            validate: (value) => {
              if (autoCategorizationEnabled || value) {
                return true;
              }
              return "Category is required";
            },
          }}
          errors={errors}
        />

        <button
          onClick={handleSubmit(onSubmit)}
          className="mt-3 w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-medium py-2 rounded-lg transition-colors"
        >
          Add Transaction
        </button>
      </div>
    </div>
  );
}

export default NewTransactionForm;
