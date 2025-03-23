import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  connectAuthEmulator,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { logEvent } from "firebase/analytics";
import { FirebaseError } from "firebase/app";
import { analytics } from "../hooks/firebase";
import useAuthStore from "../hooks/useAuthStore";

const Signup: React.FC = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(true); // State for showing popup
  const [mode, setMode] = useState<"signup" | "login">("signup"); // State to toggle between signup/login

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    connectAuthEmulator(auth, `http://localhost:9099`, { disableWarnings: true });
  }

  useEffect(() => {
    if (authStore.user) {
      navigate("/");
      logEvent(analytics, "login", {
        method: "google",
      });
    }
  }, [authStore.user, navigate]);

  useEffect(() => {
    const test = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          const user = result.user;
          authStore.setUser(user);
          authStore.setToken(token || "");
        }
      } catch (error) {
        console.error("Error fetching redirect result:", error);
      }
    };

    if (!authStore.user) {
      test();
    }
  }, [auth, authStore]);

  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("Firebase Error:", error.code, error.message);
      } else {
        console.error("Error signing in with Google:", error);
      }
    }
  };

  // Placeholder functions for additional sign-in options.
  const signInWithMicrosoft = () => {
    console.log("Sign in with Microsoft clicked");
  };

  const signInWithX = () => {
    console.log("Sign in with X clicked");
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isPopupOpen && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-center mb-6">
  <button
    className={`py-2 px-4 font-bold border border-gray-300 ${
      mode === "signup" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
    } rounded-l-md`}
    onClick={() => setMode("signup")}
  >
    Sign Up
  </button>
  <button
    className={`py-2 px-4 font-bold border border-gray-300 border-l-0 ${
      mode === "login" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
    } rounded-r-md`}
    onClick={() => setMode("login")}
  >
    Login
  </button>
</div>

          {mode === "signup" ? (
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                />
              </div>
              <p className="text-blue-500 text-sm text-right cursor-pointer">Need Help?</p>
            </form>
          ) : (
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login-username">
                  Username/Email
                </label>
                <input
                  type="text"
                  id="login-username"
                  placeholder="Enter your username or email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login-password">
                  Password
                </label>
                <input
                  type="password"
                  id="login-password"
                  placeholder="Enter your password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                />
              </div>
              <p className="text-blue-500 text-sm text-right cursor-pointer">Forgot Password?</p>
            </form>
          )}

           {/* Sign in options with multiple providers */}
           <div className="mt-6 space-y-4">
            {/* Sign in with Google */}
            <button
              onClick={signInWithGoogle}
              className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Sign in with Google
            </button>
 {/* Sign in with Microsoft */}
 <button
              onClick={signInWithMicrosoft}
              className="flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded w-full"
            >
              Sign in with Microsoft
            </button>
{/* Sign in with X */}
<button
              onClick={signInWithX}
              className="flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded w-full"
            >
              Sign in with X
            </button>
          </div>
        </div>
      )}

        </div>

  );
};

export default Signup;
