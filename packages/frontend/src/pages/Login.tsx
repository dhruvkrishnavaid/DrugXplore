import { logEvent } from "firebase/analytics";
import { FirebaseError } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { analytics } from "../hooks/firebase";
import useAuthStore from "../hooks/useAuthStore";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const authStore = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (authStore.user) {
      navigate("/");
      logEvent(analytics, "login", {
        method: "google",
      });
    }
  }, [authStore.user, navigate]);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      authStore.setUser(user);
      authStore.setToken(token);
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={signInWithGoogle}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
