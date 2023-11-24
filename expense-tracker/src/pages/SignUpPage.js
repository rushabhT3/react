import React, { useState } from "react";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3D8fP7LX24FGdE7S1ivZZcvu98Ikt2pQ`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();
      console.log("Signup Response:", data);

      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <section className="mt-10">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* Left column container with background */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://media.istockphoto.com/id/1322123064/photo/portrait-of-an-adorable-white-cat-in-sunglasses-and-an-shirt-lies-on-a-fabric-hammock.jpg?s=612x612&w=0&k=20&c=-G6l2c4jNI0y4cenh-t3qxvIQzVCOqOYZNvrRA7ZU5o="
              className="w-full"
              alt="Phone image"
            />
          </div>
          {/* Right column container with form */}
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <form onSubmit={handleSignUp}>
              <div className="mb-6">
                <input
                  type="email"
                  id="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-1 p-3 w-full border rounded-md"
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-1 p-3 w-full border rounded-md"
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="mt-1 p-3 w-full border rounded-md"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-md"
              >
                Sign up
              </button>
            </form>

            <div className="flex items-center justify-between pb-6">
              <p className="mb-0 mr-2">Have an account?</p>
              <button
                type="button"
                className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpPage;
