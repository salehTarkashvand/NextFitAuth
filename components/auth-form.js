"use client"

import Link from 'next/link';
import { useFormState } from 'react-dom';
import { auth } from '@/actions/auth-action';

export default function AuthForm({mode}) {

  const[state , formAction]=useFormState(auth.bind(null, mode),{})
  
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      <p>
        <button type="submit">
          {mode === "login" ? "Login" : "create account"}
        </button>
      </p>
      {state.errors && (
        <ul id="form-errors">
          {Object.keys(state.errors).map((error) => (
            <li key={error}>{state.errors[error]}</li>
          ))}
        </ul>
      )}
      <p>
        {mode === "login" && (
          <Link href="/?mode=signup">create an account</Link>
        )}
        {mode === "signup" && (
          <Link href="/?mode=login">Login with existing account.</Link>
        )}
      </p>
    </form>
  );
}
