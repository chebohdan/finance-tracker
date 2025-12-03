import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../Button/Button";
import FormInput from "../Inputs/FormInput";
import type { AccountRequest } from "../../types/types";
import accountService from "../../api/accountService";
import { useNavigate } from "react-router";

function CreateAccountForm() {
  const { register, handleSubmit } = useForm<AccountRequest>();
  const { createAccount } = accountService();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<AccountRequest> = (data) => {
    createAccount(data)
      .then((newAccount) => {
        navigate(`/accounts/${newAccount.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-[var(--color-dark-text)] rounded-lg bg-[var(--color-dark-bg)] p-4"
    >
      <FormInput<AccountRequest>
        label="Account Name"
        placeholder="Enter account name"
        type="text"
        register={register}
        name="name"
      />
      <FormInput<AccountRequest>
        label="Initial Balance"
        placeholder="Enter initial balance"
        type="number"
        register={register}
        name="balance"
      />
      <div className="mt-5 flex gap-3">
        <Button type="primary" label="Create" buttonType="submit" />
      </div>
    </form>
  );
}

export default CreateAccountForm;
