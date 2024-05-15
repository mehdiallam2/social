import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import GoogleOAuth from "@/components/GoogleOAuth";
import { useAuthStore } from "@/app/store";
import { TSignupSchema, signUpSchema } from "@/schemas/signUpSchema";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import ShinyButton from "@/components/ShinyButton";

function SignUp() {
  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
    getValues,
  } = useForm<TSignupSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  interface ErrorResponse {
    message: string;
    error: string;
    name: "firstName" | "lastName" | "username" | "email" | "password";
    statusCode: number;
  }

  async function onSubmit(data: FieldValues) {
    await axios
      .post("http://localhost:3000/api/auth/signup", data)
      .then((response) => setUser(response.data))
      .then(() => navigate("/"))
      .catch((error: AxiosError<ErrorResponse>) => {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response?.data.name, {
            type: "server",
            message: error.response?.data.message,
          });
        }
      });
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <main>
      <section className={styles.login}>
        <div className={styles.container}>
          <div className={styles.formWrapper}>
            <div className={styles.formContent}>
              <header className={styles.formHeader}>
                <svg
                  className={styles.logo}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 47 40"
                  fill="none"
                >
                  <path
                    fill="var(--primary)"
                    d="M23.5 6.5C17.5 6.5 13.75 9.5 12.25 15.5C14.5 12.5 17.125 11.375 20.125 12.125C21.8367 12.5529 23.0601 13.7947 24.4142 15.1692C26.6202 17.4084 29.1734 20 34.75 20C40.75 20 44.5 17 46 11C43.75 14 41.125 15.125 38.125 14.375C36.4133 13.9471 35.1899 12.7053 33.8357 11.3308C31.6297 9.09158 29.0766 6.5 23.5 6.5ZM12.25 20C6.25 20 2.5 23 1 29C3.25 26 5.875 24.875 8.875 25.625C10.5867 26.0529 11.8101 27.2947 13.1642 28.6693C15.3702 30.9084 17.9234 33.5 23.5 33.5C29.5 33.5 33.25 30.5 34.75 24.5C32.5 27.5 29.875 28.625 26.875 27.875C25.1633 27.4471 23.9399 26.2053 22.5858 24.8307C20.3798 22.5916 17.8266 20 12.25 20Z"
                  />
                </svg>
                <h4 className={styles.formTitle}>Welcome To Recova</h4>
              </header>
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formInputGroup}>
                  <div className={styles.formInputWrapper}>
                    <label className={styles.inputLabel} htmlFor="firstName">
                      First Name
                    </label>
                    <Input
                      className={styles.formInput}
                      {...register("firstName")}
                      type="text"
                      name="firstName"
                      id="firstName"
                    />
                    {errors.firstName && (
                      <small className={styles.errorMessage}>{errors.firstName.message}</small>
                    )}
                  </div>
                  <div className={styles.formInputWrapper}>
                    <label className={styles.inputLabel} htmlFor="lastName">
                      Last Name
                    </label>
                    <Input
                      className={styles.formInput}
                      {...register("lastName")}
                      type="text"
                      name="lastName"
                      id="lastName"
                    />
                    {errors.lastName && (
                      <small className={styles.errorMessage}>{errors.lastName.message}</small>
                    )}
                  </div>
                </div>
                <div className={styles.formInputWrapper}>
                  <label className={styles.inputLabel} htmlFor="username">
                    Username
                  </label>
                  <Input
                    className={styles.formInput}
                    {...register("username")}
                    type="text"
                    name="username"
                    id="username"
                  />
                  {errors.username && (
                    <small className={styles.errorMessage}>{errors.username.message}</small>
                  )}
                </div>
                <div className={styles.formInputWrapper}>
                  <label className={styles.inputLabel} htmlFor="email">
                    Email address
                  </label>
                  <Input
                    className={styles.formInput}
                    {...register("email")}
                    type="text"
                    name="email"
                    id="email"
                  />
                  {errors.email && (
                    <small className={styles.errorMessage}>{errors.email.message}</small>
                  )}
                </div>
                <div className={styles.formInputWrapper}>
                  <label className={styles.inputLabel} htmlFor="password">
                    Password
                  </label>
                  <div className={styles.passwordWrapper}>
                    <Input
                      className={styles.formInput + " " + styles.passwordInput}
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
                  {errors.password && (
                    <small className={styles.errorMessage}>{errors.password.message}</small>
                  )}
                </div>

                <div className={styles.checkboxWrapper}>
                  <Checkbox
                    id="checkbox"
                    onClick={() => setValue("privacyPolicy", !getValues("privacyPolicy"))}
                  />

                  <label className={styles.checkboxLabel} htmlFor="checkbox">
                    I agree with the website's Privacy Policy.
                  </label>
                </div>

                {/* <Button display="block" type="submit" disabled={isSubmitting}>
                  {!isSubmitting ? "Create Account" : <div className="loading"></div>}
                </Button> */}
                <ShinyButton className={styles.submit}>
                  {!isSubmitting ? "Create Account" : <div className="loading"></div>}
                </ShinyButton>
              </form>
              <hr className={styles.formHr} />
              <div className={styles.formButtons}>
                <GoogleOAuth />
              </div>
              <small className={styles.formSignup}>
                Already have an account?{" "}
                <Link className={styles.signupLink} to={"/signin"}>
                  Sign In
                </Link>
              </small>
            </div>
          </div>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              src="https://images.unsplash.com/photo-1560759226-14da22a643ef?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default SignUp;
