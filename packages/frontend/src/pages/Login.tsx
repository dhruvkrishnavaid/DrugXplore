import { logEvent } from "firebase/analytics";
import { FirebaseError } from "firebase/app";
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
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
    if (
      !authStore.user &&
      window.location.hostname.split(".").toSpliced(0, 2).join(".") ===
        "cloudworkstations.dev"
    ) {
      test();
    }
  });

  const signInWithGoogle = async () => {
    try {
      let result;
      if (
        window.location.hostname.split(".").toSpliced(0, 2).join(".") ===
        "cloudworkstations.dev"
      ) {
        signInWithRedirect(auth, provider);
      } else {
        result = await signInWithPopup(auth, provider);
      }
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
