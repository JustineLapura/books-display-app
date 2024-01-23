import { useContext, useState } from "react";
import { authContext } from "../context/authContext";
import { useSnackbar } from "notistack";


const useSignup = () => {
  const { dispatch } = useContext(authContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const signup = async (email, password) => {
    setIsLoading(false);
    setError(null);

    const response = await fetch("http://localhost:4000/api/user/signup", {
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
      enqueueSnackbar("You signed up successfuly", { variant: "success" });
    }
  };

  return { signup, error, isLoading };
};

export default useSignup;
