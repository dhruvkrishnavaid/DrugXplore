import { logEvent } from "firebase/analytics";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import app, { analytics, db } from "../hooks/firebase";
import useAuthStore from "../hooks/useAuthStore";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const navigate = useNavigate();
  const authStore = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (authStore.user) {
      if (location.state && location.state?.from) {
        navigate(`/app${location.state.from}`);
      } else {
        navigate("/app");
        logEvent(analytics, "login", {
          method: "google",
        });
      }
    }
  }, [authStore.user, location.state, navigate]);

  useEffect(() => {
    const handleRedirectResult = async () => {
      const result = await getRedirectResult(auth);
      if (result) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        await setDoc(
          doc(db, "users", user.uid),
          JSON.parse(JSON.stringify(user)),
        );
        authStore.setUser(user);
        authStore.setToken(token || "");
      }
    };

    if (
      !authStore.user &&
      window.location.hostname.split(".").splice(2, 2).join(".") ===
        "cloudworkstations.dev"
    ) {
      handleRedirectResult();
    }
  }, [auth, authStore]);

  const signInWithGoogle = async () => {
    try {
      let result;
      if (
        window.location.hostname.split(".").splice(2, 2).join(".") ===
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
        await setDoc(
          doc(db, "users", user.uid),
          JSON.parse(JSON.stringify(user)),
        );
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

  const signUp = async () => {
    if (email && password.length > 7) {
      console.log(email, password);
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        if (result) {
          const user = result.user;
          await setDoc(
            doc(db, "users", user.uid),
            JSON.parse(JSON.stringify(user)),
          );
          authStore.setUser(user);
        }
      } catch (error) {
        if (error instanceof FirebaseError) {
          console.error("Firebase Error:", error.code, error.message);
        } else {
          console.error("Error signing in with Email and Password:", error);
          alert("Error signing in with Email and password! Please try again.");
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex flex-col w-full px-16 pt-24 gap-4">
        <div className="w-full">
          <h1 className="signature">DrugXplore</h1>
        </div>
        <div className="my-auto">
          <div>
            <h1 className="mb-4 text-6xl font-black">
              Let's Get
              <br /> You Onboard!
            </h1>
            <p className="mb-4 text-neutral-600">
              Hey there, welcome to DrugXplore
            </p>
          </div>
          <form className="flex flex-col py-16 space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-lg p-2 border rounded-lg outline-none border-neutral-300 text-neutral-900 ring-primary focus:ring-2"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="max-w-lg p-2 border rounded-lg outline-none border-neutral-300 text-neutral-900 ring-primary focus:ring-2"
            />
            <ul className="text-sm list-disc list-inside space-y-1">
              <li
                className={
                  email.length > 0
                    ? email.match(
                        /^[\w.]+@(gmail\.com|yahoo\.com|outlook\.com|icloud\.com)$/,
                      )
                      ? "text-green-500"
                      : "text-red-500"
                    : "text-neutral-600"
                }
              >
                Enter a valid email address (gmail.com, yahoo.com, outlook.com,
                icloud.com)
              </li>
              <li
                className={
                  password.length > 0
                    ? password.length > 7
                      ? "text-green-500"
                      : "text-red-500"
                    : "text-neutral-600"
                }
              >
                Enter a password of atleast 8 characters
              </li>
            </ul>
            <button
              type="button"
              onClick={signUp}
              disabled={!email || !(password.length > 7)}
              className="px-4 py-2 font-bold text-white rounded cursor-pointer bg-secondary hover:bg-primary w-min transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-secondary/40"
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
            <p className="text-neutral-600">Already have an account?</p>
            <Link
              to="/login"
              className="ml-2 font-semibold text-primary/80 hover:text-primary transition-colors duration-300"
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
