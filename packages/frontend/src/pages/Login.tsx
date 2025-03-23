import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { logEvent } from "firebase/analytics";
import { FirebaseError } from "firebase/app";
import { analytics } from "../hooks/firebase";
import useAuthStore from "../hooks/useAuthStore";

const Login: React.FC = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const navigate = useNavigate();
  const authStore = useAuthStore();

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

  // ===== User Feedback Carousel State and Logic =====
  const [currentFeedback, setCurrentFeedback] = useState<number>(0);
  const feedbackItems = [
    {
      rating: "★★★★☆",
      text: "Great service! Really satisfied with the installation.",
    },
    {
      rating: "★★★★★",
      text: "Prompt support and excellent work. Highly recommended!",
    },
    {
      rating: "★★★☆☆",
      text: "The response time was good, but there is some room for improvement.",
    },
    {
      rating: "★★★★☆",
      text: "Very professional and efficient. Loved the follow-up after service.",
    },
  ];



 // Auto-slide every 3 seconds
 useEffect(() => {
  const interval = setInterval(() => {
    setCurrentFeedback((prev) => (prev + 1) % feedbackItems.length);
  }, 3000);

  return () => clearInterval(interval);
}, [feedbackItems.length]);

 
  // ===== End User Feedback Carousel Code =====


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
      <nav className="bg-blue-500 text-white py-4 px-8 flex justify-between items-center">
      <div className="flex items-center space-x-2">
    {/* Placeholder for logo */}
    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
    <h1 className="text-2xl font-bold">XYZ</h1>
  </div>

        <button
          className="bg-white text-blue-500 hover:bg-gray-100 font-bold py-2 px-4 rounded"
          onClick={() => navigate("/signup")}
        >
          SignIn / Login
        </button>
      </nav>

    {/* Image Placeholder */}
    <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-600 border-2 border-dashed border-gray-400">
      Image will go here
    </div>

{/* Quote Section */}
<div className="text-center mt-4 px-4">
      <p className="text-lg font-semibold text-gray-700">
        "The only way to do great work is to love what you do." – Steve Jobs
      </p>
    </div>

 {/* Technicians Section */}
 <div className="my-8">
      <h2 className="text-2xl font-bold text-center mb-6">Technicians Working With Us</h2>
      <div className="max-h-96 overflow-y-auto px-4 space-y-4">
        {/* Technician Card 1 */}
        <div className="bg-white rounded-lg shadow p-4 max-w-md mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-32 h-32 bg-gray-300 flex items-center justify-center rounded">
              <span className="text-gray-500">Tech Image</span>
            </div>
            <div>
              <h3 className="text-lg font-medium">John Doe</h3>
              <p className="text-gray-600 text-sm">
                Expert in electrical installations.
              </p>
            </div>
          </div>
        </div>


{/* Technician Card 2 */}
<div className="bg-white rounded-lg shadow p-4 max-w-md mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-32 h-32 bg-gray-300 flex items-center justify-center rounded">
              <span className="text-gray-500">Tech Image</span>
            </div>
            <div>
              <h3 className="text-lg font-medium">Jane Smith</h3>
              <p className="text-gray-600 text-sm">
                Specialist in HVAC systems.
              </p>
            </div>
          </div>
        </div>



{/* Technician Card 3 */}
<div className="bg-white rounded-lg shadow p-4 max-w-md mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-32 h-32 bg-gray-300 flex items-center justify-center rounded">
              <span className="text-gray-500">Tech Image</span>
            </div>
            <div>
              <h3 className="text-lg font-medium">Carlos Rodriguez</h3>
              <p className="text-gray-600 text-sm">
                Innovator in home automation.
              </p>
            </div>
          </div>
        </div>



{/* Technician Card 4 */}
<div className="bg-white rounded-lg shadow p-4 max-w-md mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-32 h-32 bg-gray-300 flex items-center justify-center rounded">
              <span className="text-gray-500">Tech Image</span>
            </div>
            <div>
              <h3 className="text-lg font-medium">Sara Lee</h3>
              <p className="text-gray-600 text-sm">
                Professional in security systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* ===== User Feedback Carousel Section ===== */}
    <div className="my-8">
        <h2 className="text-2xl font-bold text-center mb-6">User Feedback</h2>
        <div className="relative w-full max-w-lg mx-auto overflow-hidden">
          {/* The inner flex container holds all feedback cards.
              We slide it left/right with a transform based on currentFeedback */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentFeedback * 100}%)` }}
          >
            {feedbackItems.map((feedback, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="w-full h-32 bg-gray-300 flex items-center justify-center rounded mb-4">
                    <span className="text-gray-500">User Image</span>
                  </div>
                  <div className="mb-2">
                    <span className="block text-center text-yellow-500">
                      {feedback.rating}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm text-center">
                    {feedback.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
{/* Manual navigation buttons */}
<button
            onClick={() =>
              setCurrentFeedback(
                (prev) => (prev - 1 + feedbackItems.length) % feedbackItems.length
              )
            }
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-400 text-white rounded-full p-2 hover:bg-gray-600"
          >
            &#8592;
          </button>
          <button
            onClick={() =>
              setCurrentFeedback((prev) => (prev + 1) % feedbackItems.length)
            }
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-400 text-white rounded-full p-2 hover:bg-gray-600"
          >
&#8594;
          </button>
        </div>
      </div>
      {/* ===== End User Feedback Carousel Section ===== */}


      
      <div className="flex flex-col items-center justify-center flex-grow">
        <button
          onClick={signInWithGoogle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign in with Google
        </button>
      </div>

      
      <footer className="bg-gray-800 text-white py-4 text-center">
      <div className="flex justify-evenly">
    <button
      className="text-blue-300 hover:underline"
      onClick={() => navigate("/about")}
    >
      About Us
    </button>
    <button
      className="text-blue-300 hover:underline"
      onClick={() => navigate("/quicklinks")}
    >
      Quicklinks
    </button>
  </div>

      </footer>
    </div>
  );
};

export default Login;
