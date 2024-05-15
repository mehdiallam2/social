import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import GoogleOAuth from "@/components/GoogleOAuth";
import styles from "./index.module.css";
import { useAuthStore } from "@/app/store";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { TSignInSchema, signInSchema } from "@/schemas/signInSchema";
import Checkbox from "@/components/ui/Checkbox";
import Logo from "@/components/icons/Logo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ShinyButton from "@/components/ShinyButton";

function SignIn() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
    getValues,
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  interface ErrorResponse {
    message: string;
    error: string;
    name: "username" | "password";
    statusCode: number;
  }

  function onSubmit(data: FieldValues) {
    mutate(data);
  }

  const { mutate } = useMutation({
    mutationFn: async (data: FieldValues) => {
      return (await axios.post("http://localhost:3000/api/auth/signin", data)).data;
    },
    onSuccess(data, variables, context) {
      console.log(data);
      setUser(data);
      navigate("/");
    },
    onError(error, variables, context) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response?.data.name, {
          type: "server",
          message: error.response?.data.message,
        });
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className={styles.login}>
      <div className={styles.formWrapper}>
        <header className={styles.header}>
          <Logo className={styles.logo} />
          <h2 className={styles.headin}>Welcome Back!</h2>
        </header>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="username">
              Username
            </label>
            <Input
              className={styles.input}
              {...register("username")}
              type="text"
              name="username"
              id="username"
            />
            {errors.username && <small className={styles.error}>{errors.username.message}</small>}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <div className={styles.password}>
              <Input
                className={styles.input + " " + styles.passwordInput}
                {...register("password")}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
              />
              <button
                className={styles.passwordButton}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <small className={styles.error}>{errors.password.message}</small>}
          </div>
          <div className={styles.remember}>
            <div className={styles.checkboxWrapper}>
              <Checkbox
                id="rememberMe"
                onClick={() => setValue("rememberMe", !getValues("rememberMe"))}
              />
              <label className={styles.label} htmlFor="rememberMe">
                Remember me
              </label>
            </div>

            <Link className={styles.forgotPassword} to={"/"}>
              Forgot password?
            </Link>
          </div>
          <ShinyButton className={styles.submit}>
            {!isSubmitting ? "Sign In" : <div className="loading"></div>}
          </ShinyButton>
        </form>
        <hr className={styles.Hr} />
        <div className={styles.formButtons}>
          <GoogleOAuth />
        </div>
        <small className={styles.signup}>
          Don't have an account?{" "}
          <Link className={styles.signupLink} to={"/signup"}>
            Sign Up
          </Link>
        </small>
      </div>
    </main>
  );
}

export default SignIn;
