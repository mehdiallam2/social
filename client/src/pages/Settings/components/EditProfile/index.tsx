import styles from "./index.module.css";
import { FieldValues, useForm } from "react-hook-form";

import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { ChangeEvent } from "react";
import useUserQuery from "@/hooks/useUserQuery";

function EditProfile() {
  const editShema = z.object({
    firstName: z
      .string()
      .min(2, "must be at least 2 carachters")
      .max(14, "must not be greater than 14 carachters")
      .regex(
        RegExp(/^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z]+(?<![_.])$/),
        "Please enter a valid name"
      ),
    lastName: z
      .string()
      .min(2, "must be at least 2 carachters")
      .max(14, "must not be greater than 14 carachters")
      .regex(
        RegExp(/^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z]+(?<![_.])$/),
        "Please enter a valid name"
      ),
    username: z
      .string()
      .min(2, "must be at least 2 carachters")
      .max(20, "must not be greater than 20 carachters")
      .regex(
        RegExp(/^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/),
        "Please enter a valid username"
      ),
    bio: z.string().max(150, "must not be greater than 150 carachters"),
  });

  type TSEditProfileSchema = z.infer<typeof editShema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TSEditProfileSchema>({
    resolver: zodResolver(editShema),
  });

  type ErrorResponse = {
    message: string;
    error: string;
    name: "firstName" | "lastName" | "username";
    statusCode: number;
  };

  async function onSubmit(data: FieldValues) {
    mutation.mutate(data);
  }

  const { data: user } = useUserQuery();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: FieldValues) => {
      try {
        return await axios.patch("http://localhost:3000/api/users/" + user._id, data);
      } catch (error: any) {
        if (error.isAxiosError && error.response) {
          setError(error.response?.data.name, {
            type: "server",
            message: error.response?.data.message,
          });
        } else {
          console.log(error.message);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const avatarMutation = useMutation({
    mutationFn: async (data: FormData) => {
      try {
        return await axios.patch(`http://localhost:3000/api/users/${user._id}/avatar`, data);
      } catch (error: any) {
        console.log(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    console.log(formData);
    formData.append("image", e.target.files![0]);
    console.log(e.target.files![0]);
    console.log(formData);
    avatarMutation.mutate(formData);
  };

  return (
    <main className={styles.profile}>
      <div className={styles.container + " container"}>
        <h2 className={styles.profileHeading}>Edit Profile</h2>
        <header className={styles.profileHeader}>
          <label htmlFor="image">
            <Avatar src={user?.avatarURL} />
            {avatarMutation.isPending && "Loading"}
          </label>
          <input type="file" name="image" id="image" hidden onChange={handleUpload} />
          <div className={styles.names}>
            <span className={styles.username}>{user?.username}</span>
            <small className={styles.name}>{user?.firstName + " " + user?.lastName}</small>
          </div>
          <div className={styles.changeButton}>
            <Button variant="primary" size="small">
              <label htmlFor="image">Change photo</label>
            </Button>
          </div>
        </header>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formInputWrapper}>
            <label className={styles.inputLabel} htmlFor="firstName">
              First Name
            </label>
            <input
              className={styles.formInput}
              defaultValue={user?.firstName}
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
            <input
              className={styles.formInput}
              defaultValue={user?.lastName}
              {...register("lastName")}
              type="text"
              name="lastName"
              id="lastName"
            />
            {errors.lastName && (
              <small className={styles.errorMessage}>{errors.lastName.message}</small>
            )}
          </div>
          <div className={styles.formInputWrapper}>
            <label className={styles.inputLabel} htmlFor="username">
              Username
            </label>
            <input
              className={styles.formInput}
              defaultValue={user?.username}
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
            <label className={styles.inputLabel} htmlFor="username">
              Bio
            </label>
            <textarea
              className={styles.formInput}
              defaultValue={user?.bio}
              {...register("bio")}
              rows={4}
              name="bio"
              id="bio"
            />
          </div>
          <Button variant="primary" type="submit">
            {!isSubmitting ? "Submit" : <div className="loading"></div>}
          </Button>
        </form>
      </div>
    </main>
  );
}

export default EditProfile;
