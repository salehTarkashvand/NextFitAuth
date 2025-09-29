"use server";

import { createUser } from "@/lib/user";

export default async function signup(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  let errors = {};

  if (!email.includes("@")) {
    errors.email = "please enter a valid email address";
  }

  if (password.trim().length < 8) {
    errors.password = "password must be at least 8 characters long";
  }
  if (Object.keys(errors).length > 0) {
    return {errors};
  }
  
  createUser(email , password)
}
