import axios from "axios";
import { useCallback, useState } from "react";
import Image from "next/image";

// Components
import { Input } from "@/components/Input";

const Auth = () => {
  // State para email
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  // UseCallback almacena la función en memoria, para que no se vuelva a crear cada vez que se renderiza el componente
  const toggleVariant = useCallback(() => {
    setVariant((prevVariant) =>
      prevVariant === "login" ? "register" : "login"
    );
  }, []);

  // Register user
  const register = useCallback(async () => {
    try {
      const { data } = await axios.post("/api/register", {
        email,
        name,
        password,
      });
      console.log(data);
    } catch (error: any) {
      console.log(error?.response?.data);
    }
  }, [email, name, password]);

  return (
    <div className="relative h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full bg-opacity-50">
        <nav className="px-12 py-5 max-md:flex max-md:justify-center">
          <Image src="/images/logo.png" alt="Logo" width={150} height={50} />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 md:w-2/5 md:max-w-md rounded-md w-full max-md:w-3/4">
            <h2 className="text-white text-4xl mb-8 font-bold">
              {variant === "login" ? "Sign in" : "Create an account"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="name"
                  value={name}
                  label="Username"
                  type="text"
                  onChange={(e: any) => setName(e.target.value)}
                />
              )}
              <Input
                id="email"
                value={email}
                label="Email"
                type="email"
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <Input
                id="password"
                value={password}
                label="Password"
                type="password"
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}

              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Sign in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
