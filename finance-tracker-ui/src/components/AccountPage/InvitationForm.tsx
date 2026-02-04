import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import type { AccountInvitationRequest } from "../../types/types";
import FormInput from "../Inputs/FormInput";
import Button from "../Button/Button";

type InvitationFormProps = {
  register: UseFormRegister<AccountInvitationRequest>;
  errors: FieldErrors<AccountInvitationRequest>;
  handleSubmit: UseFormHandleSubmit<
    AccountInvitationRequest,
    AccountInvitationRequest
  >;
  onSubmit: (transactionRequest: AccountInvitationRequest) => void;
};

export default function InvitationForm({
  register,
  errors,
  handleSubmit,
  onSubmit,
}: Readonly<InvitationFormProps>) {
  return (
    <form className="flex flex-col  gap-3" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        register={register}
        errors={errors}
        label="Username"
        placeholder="Enter username"
        name="inviteeUsername"
        type="text"
      />

      <Button type="submit" fullWidth>
        Add
      </Button>
    </form>
  );
}
