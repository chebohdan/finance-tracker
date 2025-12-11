import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import type { TransactionCategoryRequest } from "../../types/types";
import FormInput from "../Inputs/FormInput";

type NewTransactionFormProps = {
  register: UseFormRegister<TransactionCategoryRequest>;
  errors: FieldErrors<TransactionCategoryRequest>;
  handleSubmit: UseFormHandleSubmit<
    TransactionCategoryRequest,
    TransactionCategoryRequest
  >;
  onSubmit: (transactionRequest: TransactionCategoryRequest) => void;
};

function NewTransactionCategoryForm({
  register,
  errors,
  handleSubmit,
  onSubmit,
}: Readonly<NewTransactionFormProps>) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex gap-2 items-end"
    >
      <FormInput<TransactionCategoryRequest>
        name="name"
        label="New Category"
        placeholder="Enter new category"
        type="text"
        register={register}
        registerOptions={{ required: "Category name is required" }}
        errors={errors}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </form>
  );
}

export default NewTransactionCategoryForm;
