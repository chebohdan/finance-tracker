import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import type { AccountInvitationRequest } from "../../types/types";
import FormInput from "../Inputs/FormInput";
import FormSelectInput from "../Inputs/FormSelectInput";

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
  const selectRoles = [
    { value: "OWNER", label: "Owner" },
    { value: "EDITOR", label: "Editor" },
    { value: "VIEWER", label: "Viewer" },
  ];

  return (
    <div className=" rounded-lg p-6 border-2 border-[var(--color-dark-surface)] space-y-6">
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
            <FormSelectInput
              options={selectRoles}
              register={register}
              errors={errors}
              name={"role"}
              label="Select role"
              disabled={false}
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
    </div>
  );
}
