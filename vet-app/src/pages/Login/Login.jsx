import React from "react";
import Header from "../../components/Header/Header";

const Login = () => {
  const users = [{ username: "admin", password: "test" }];

  return (
    <div className="bg-customGreen h-screen overflow-hidden">
      <div className="shadow-md bg-white h-20 flex">
        <Header className="ml-4" />
      </div>
      <div className="h-full flex flex-col items-center space-y-10 mt-36">
        <input
          className="rounded h-12 w-96 border-none"
          type="text"
          placeholder="Nazwa użytkownika"
        />
        <input
          className="rounded h-12 w-96 border-none"
          type="password"
          placeholder="Hasło"
        />
        <span className="flex flex-between w-96 items-center">
          <span className=" flex justify-start whitespace-nowrap text-sm text-emerald-950">
            <h5>Nie masz konta?</h5>
            <a href="http://localhost:3000/sign-in" className="ml-1 font-semibold">Zarejestruj się.</a>
          </span>
          <footer className="flex justify-end w-96">
            <button
              type="submit"
              className="bg-emerald-800 hover:bg-blue-600 px-10 py-2 rounded  text-white hover:shadow-md"
            >
              Zaloguj się
            </button>
          </footer>
        </span>
      </div>
    </div>
  );
};

export default Login;
