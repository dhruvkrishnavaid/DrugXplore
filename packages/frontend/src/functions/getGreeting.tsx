import { Auth } from "firebase/auth";

const getGreeting = async (auth: Auth) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/greet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: auth.currentUser?.displayName?.split(" ")[0],
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getGreeting;
