import { useContext, useState } from "react";
import { authContext } from "../context/authContext";
import { useSnackbar } from "notistack";

const useLogin = () => {
  const { dispatch } = useContext(authContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const login = async (email, password) => {
    setIsLoading(false);
    setError(null);

    const response = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save user to localStroage
      localStorage.setItem("user", JSON.stringify(json));
      //   update auth context
      dispatch({ type: "LOGIN", payload: json });
      enqueueSnackbar("You logged in successfuly", { variant: "success" });
    }
  };

  return { login, error, isLoading };
};

export default useLogin;
