import { useForm, type SubmitHandler } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import type { LoginCredentials } from "../../../types/auth";

function LoginPage() {
  const { register, handleSubmit } = useForm<LoginCredentials>();
  const { login } = useAuth();
  const onSubmit: SubmitHandler<LoginCredentials> = (data) => {
    console.log(data);
    login(data);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[var(--color-dark-bg)]">
      <form
        className="max-w-sm text-[var(--color-dark-text)]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-semibold mb-6">Login</h1>

        <div className="mt-5">
          <label className="block">
            <span className="text-sm">Your email</span>
            <input
              className="mt-3 bg-[var(--color-dark-surface)] rounded-lg block w-full p-2.5 text-[var(--color-dark-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              placeholder="name@example.com"
              {...register("username")}
            />
          </label>
        </div>

        <div className="mt-5">
          <label className="block">
            <span className="text-sm">Password</span>
            <input
              type="password"
              className="mt-3 bg-[var(--color-dark-surface)] rounded-lg block w-full p-2.5 text-[var(--color-dark-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              placeholder="Enter your password"
              {...register("password")}
            />
          </label>
        </div>

        <input
          type="submit"
          className="mt-6 px-5 py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-dark-text)] rounded-lg w-full font-medium transition"
        />
      </form>
    </div>
  );
}

export default LoginPage;
