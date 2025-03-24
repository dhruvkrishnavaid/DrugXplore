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
import { Link, useNavigate } from "react-router";
import { analytics } from "../hooks/firebase";
import useAuthStore from "../hooks/useAuthStore";

const Signup = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const navigate = useNavigate();
  const authStore = useAuthStore();

  useEffect(() => {
    if (authStore.user) {
      navigate("/");
      logEvent(analytics, "signup", {
        method: "google",
      });
    }
  }, [authStore.user, navigate]);

  useEffect(() => {
    const test = async () => {
      const result = await getRedirectResult(auth);
      if (result) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        authStore.setUser(user);
        authStore.setToken(token || "");
      }
    };

    if (
      !authStore.user &&
      window.location.hostname.split(".").toSpliced(0, 2).join(".") ===
        "cloudworkstations.dev"
    ) {
      test();
    }
  }, [auth, authStore]);

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
        console.error("Firebase Error:", error.code, error.message);
      } else {
        console.error("Error signing in with Google:", error);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col w-full px-16 pt-24 gap-4">
        <div className="w-full">
          <h1 className="text-3xl signature">DrugXplore</h1>
        </div>
        <div className="my-auto">
          <div>
            <h1 className="mb-4 text-6xl font-black">
              Let's Get
              <br /> You Onboard!
            </h1>
            <p className="mb-4 text-gray-600">
              Hey there, welcome to DrugXplore
            </p>
          </div>
          <form action="" className="flex flex-col py-16 space-y-4">
            <input
              className="max-w-lg p-2 border rounded-lg border-neutral-300 text-neutral-900"
              type="email"
              name=""
              id=""
              placeholder="Email"
            />
            <input
              className="max-w-lg p-2 border rounded-lg border-neutral-300 text-neutral-900"
              type="password"
              name=""
              id=""
              placeholder="Password"
            />
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white rounded cursor-pointer bg-primary/80 hover:bg-primary w-min transition-colors duration-300"
            >
              Signup
            </button>
            <div className="my-2">
              <button
                type="button"
                onClick={signInWithGoogle}
                className="p-4 border rounded-full cursor-pointer w-min hover:bg-primary hover:text-white transition-colors duration-300"
              >
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="icon icon-tabler icons-tabler-filled icon-tabler-brand-google"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" />
                </svg>
              </button>
            </div>
          </form>
          <div className="flex">
            <p className="text-gray-600">Already have an account?</p>
            <Link
              to="/login"
              className="ml-2 text-primary/80 hover:text-primary transition-colors duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden w-full max-w-3xl p-2 md:flex">
        <img
          src="/9491763.jpg"
          alt=""
          className="object-cover object-center h-full rounded-2xl"
        />
      </div>
    </div>
  );
};

export default Signup;
