export const userService = {
  authenticate,
};

// function authenticate(username: string, password: string) {
//   if (username !== "admin" && password !== "admin") {
//     //(1)
//     return null; //(2)
//   }

//   const user = {
//     id: "9001",
//     name: "Web Admin",
//     email: "admin@example.com",
//   }; //(3)

//   return user; //(4)
// }

async function authenticate(username: string, password: string) {
  try {
    const response = await fetch(
      "https://659e7c7347ae28b0bd35f52e.mockapi.io/login/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    if (!response.ok) {
      // Handle non-successful response (e.g., incorrect credentials)
      return null;
    }

    const user = await response.json();
    return user; // User information retrieved from the API
  } catch (error) {
    console.error("Error during authentication:", error);
    return null;
  }
}
