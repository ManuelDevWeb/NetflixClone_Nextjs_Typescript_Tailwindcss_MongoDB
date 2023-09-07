import axios from "axios";
import { useCallback, useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

// Icons
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

// Components
import { Input } from "@/components/Input";

const Auth = () => {
  const router = useRouter();

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

  // Login user
  const login = useCallback(async () => {
    try {
      // credentials is the id defined in the [...nextauth].ts file
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      router.push("/");
    } catch (error: any) {
      console.log(error?.response?.data);
    }
  }, [email, password, router]);

  // Register user
  const register = useCallback(async () => {
    try {
      const { data } = await axios.post("/api/register", {
        email,
        name,
        password,
      });

      login();
    } catch (error: any) {
      console.log(error?.response?.data);
    }
  }, [email, name, password, login]);

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
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <div className="flex items-center gap-4 mt-8 justify-center">
              <div
                // Permit login with google
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="bg-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-80 cursor-pointer transition"
              >
                <FcGoogle size={25} />
              </div>
              <div
                // Permit login with github
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="bg-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-80 cursor-pointer transition"
              >
                <FaGithub size={25} />
              </div>
            </div>
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
