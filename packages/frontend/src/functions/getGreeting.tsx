const getGreeting = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/greet`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getGreeting;
