import "./init";
import { Route, Routes } from "react-router";
import "./App.css";
import LoginPage from "./components/Auth/LoginPage/LoginPage";
import UserLayout from "./components/Layout/UserLayout";
import RequireAuth from "./components/Auth/RequireAuth/RequireAuth";
import AccountPage from "./components/AccountPage/AccountPage";
import AccountsPage from "./components/AccountsPage/AccountsPage";
import AccountInvitationsPage from "./components/AccountInvitationsPage/AccountInvitationsPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<UserLayout />}>
          <Route element={<RequireAuth allowedRoles={["USER"]} />}>
            <Route path="dashboard" element={<></>} />
            <Route path="accounts" element={<AccountsPage />} />
            <Route path="invitations" element={<AccountInvitationsPage />} />
            <Route path="accounts/:id" element={<AccountPage />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
