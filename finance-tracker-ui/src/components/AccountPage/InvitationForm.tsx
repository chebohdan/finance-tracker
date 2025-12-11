import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import type { AccountInvitationRequest } from "../../types/types";
import FormInput from "../Inputs/FormInput";

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
    <form>
      {/* Invite User Form */}
      <div className="">
        <h2 className="text-lg font-semibold text-[var(--color-dark-text)] ">
          Invite user
        </h2>
        {
          <form
            className="flex flex-col  gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              register={register}
              errors={errors}
              label="Username"
              placeholder="Enter username"
              name="inviteeUsername"
              type="text"
            />

            <button
              type="submit"
              className="mt-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Invite
            </button>
          </form>
        }
      </div>
    </form>
  );
}
