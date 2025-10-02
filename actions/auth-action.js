"use server";

import { createAuthSession, verifyAuth } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";
import { redirect } from "next/navigation";

export async function signup(prevState, formData) {
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
    return { errors };
  }

  const hashedPassword = hashUserPassword(password);

  try {
    const id = createUser(email, hashedPassword);
    await createAuthSession(id);
    redirect("/training");
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        errors: {
          email: "It seems like an account for the chosen email already exists",
        },
      };
    }
    throw error;
  }
}

export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const exisitingUser = getUserByEmail(email);

  if (!exisitingUser) {
    return {
      errors: {
        email: "could not authenticate user , please check your credentials",
      },
    };
  }

  const isValidPassword = verifyPassword(exisitingUser.password, password);

  if (!isValidPassword) {
    return {
      errors: {
        password: "could not authenticate user , please check your credentials",
      },
    };
  }
  await createAuthSession(exisitingUser.id);
  redirect("/training");
}
