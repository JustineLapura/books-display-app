import { useContext } from "react";
import { authContext } from "../context/authContext";
import { useSnackbar } from "notistack";


const useLogout = () => {
  const { dispatch } = useContext(authContext);
  const { enqueueSnackbar } = useSnackbar();

  const logout = () => {
    // remove user from localStorage
    localStorage.removeItem("user");

    // update auth context
    dispatch({ type: "LOGOUT" });

    // logout alert
    enqueueSnackbar("You logged out successfuly", { variant: "success" });
  };

  return {logout};
};

export default useLogout;
