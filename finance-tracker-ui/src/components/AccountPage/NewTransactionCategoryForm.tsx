import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import type { TransactionCategoryRequest } from "../../types/types";
import FormInput from "../Inputs/FormInput";
import Button from "../Button/Button";

type NewTransactionCategoryFormProps = {
  register: UseFormRegister<TransactionCategoryRequest>;
  errors: FieldErrors<TransactionCategoryRequest>;
  handleSubmit: UseFormHandleSubmit<
    TransactionCategoryRequest,
    TransactionCategoryRequest
  >;
  onSubmit: (category: TransactionCategoryRequest) => void;
};

function NewTransactionCategoryForm({
  register,
  errors,
  handleSubmit,
  onSubmit,
}: Readonly<NewTransactionCategoryFormProps>) {
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row gap-3 items-end"
      >
        <FormInput<TransactionCategoryRequest>
          name="name"
          label="Category Name"
          placeholder="Enter new category"
          type="text"
          register={register}
          registerOptions={{ required: "Category name is required" }}
          errors={errors}
        />

        <Button type="submit">Add</Button>
      </form>
    </div>
  );
}

export default NewTransactionCategoryForm;
