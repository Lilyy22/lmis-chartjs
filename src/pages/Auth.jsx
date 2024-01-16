import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { SIGN_IN } from "../query/mutation";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, { loading, error }] = useMutation(SIGN_IN);
  // handle signin
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signIn({
        variables: { secret: password, phone_no: `+251${phone}` },
      });
      const { access_token, refresh_token } = data.signIn.tokens;
      sessionStorage.setItem("access_token", access_token);
      sessionStorage.setItem("refresh_token", refresh_token);
      sessionStorage.setItem("refresh", false);

      navigate("dashboard");
    } catch (error) {}
    setPhone("");
    setPassword("");
  };
  return (
    <>
      {error && (
        <div className="text-center py-2 bg-orange-500"> {error.message} </div>
      )}
      <div className="w-full h-screen z-40 backdrop-blur-md bg-[#0d0a26] pt-12">
        <div className="z-50 rounded-md w-[80%] md:w-1/3 xl:w-1/4 p-6 shadow m-auto bg-[#272953] border-t border-gray-600">
          <form onSubmit={handleLogin}>
            <h5 className="font-bold text-xl text-gray-100 text-center">
              Sign In
            </h5>
            <div className="my-4">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-1.5 py-1 border rounded-lg outline-none foucs:ring ring-gray-400 bg-gray-300"
                placeholder="eg. 937675519"
              />
            </div>

            <div className="my-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-1.5 py-1 border rounded-lg outline-none foucs:ring ring-gray-400 bg-gray-300"
                placeholder="••••••••"
              />
            </div>
            <button
              type={loading ? "button" : "submit"}
              className="rounded-lg w-full bg-emerald-700 text-gray-50 px-4 py-2 text-sm border-t border-gray-600"
            >
              {loading ? "Logging in ..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
