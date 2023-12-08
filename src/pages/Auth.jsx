import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { SIGN_IN } from "../query/mutation";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [password, setPassword] = useState();
  const [signIn, { loading, data, error }] = useMutation(SIGN_IN);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signIn({ variables: { secret: password } });
      const { access_token, refresh_token } = data.signIn.tokens;
      sessionStorage.setItem("access_token", access_token);
      sessionStorage.setItem("refresh_token", refresh_token);
      navigate("dashboard");
    } catch (error) {}
    setPassword("");
  };
  return (
    <>
      {error && (
        <div className="text-center py-2 bg-orange-500"> {error.message} </div>
      )}
      <div className="w-full h-screen z-40 backdrop-blur-md bg-[#0d0a26] pt-12">
        <div className="z-50 rounded-md w-[80%] lg:w-1/3 p-6 shadow m-auto bg-[#272953] border-t border-gray-600">
          <form onSubmit={handleLogin}>
            <div className="my-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-1.5 py-1 border rounded-md outline-none foucs:ring ring-gray-400 bg-gray-200"
                placeholder="Enter Secret"
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-gray-600 text-gray-50 px-4 py-2 text-sm border-t border-gray-600"
            >
              {loading ? "Logging in ..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
