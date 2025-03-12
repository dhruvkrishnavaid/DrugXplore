import { logEvent } from "firebase/analytics";
import { FirebaseError } from "firebase/app";
import {
  connectAuthEmulator,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { analytics } from "../hooks/firebase";
import useAuthStore from "../hooks/useAuthStore";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    connectAuthEmulator(
      auth,
      `https://9099-idx-drugxplore-1740297668908.${window.location.hostname
        .split(".")
        .toSpliced(0, 1)
        .join(".")}`,
      { disableWarnings: true }
    );
  }
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

  useEffect(() => {
    async function test() {
      const result = await getRedirectResult(auth);
      if (result) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        authStore.setUser(user);
        authStore.setToken(token);
      }
    }
    if (!authStore.user) {
      test();
    }
  });

  const signInWithGoogle = async () => {
    try {
      signInWithRedirect(auth, provider);
      const result = await getRedirectResult(auth);
      if (result) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        authStore.setUser(user);
        authStore.setToken(token);
      }
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
