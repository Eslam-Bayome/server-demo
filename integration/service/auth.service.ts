import { MOCK_CREDENTIALS, MOCK_USER } from "../mock_data/auth.mock";
import {
  AuthUser,
  LoginResponse,
  SignupResponse,
} from "../types/response/auth.response";
import { LoginPayload, SignupPayload } from "../types/payload/auth.payload";

const simulateDelay = (ms = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const generateToken = () =>
  `mock_token_${Math.random().toString(36).slice(2)}_${Date.now()}`;

const normalizeEmail = (email: string) => email.trim().toLowerCase();

/** In-memory accounts created via signup (mock API — resets on full page reload in dev). */
const registeredByEmail = new Map<
  string,
  { password: string; user: AuthUser }
>();

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  await simulateDelay();

  const email = normalizeEmail(payload.email);
  const expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const tokenPayload = { access_token: generateToken(), expires_at };

  if (
    email === normalizeEmail(MOCK_CREDENTIALS.email) &&
    payload.password === MOCK_CREDENTIALS.password
  ) {
    return { user: MOCK_USER, ...tokenPayload };
  }

  const registered = registeredByEmail.get(email);
  if (registered && registered.password === payload.password) {
    return { user: registered.user, ...tokenPayload };
  }

  throw new Error("Invalid email or password.");
};

export const signup = async (payload: SignupPayload): Promise<SignupResponse> => {
  await simulateDelay();

  if (payload.password !== payload.confirm_password) {
    throw new Error("Passwords do not match.");
  }

  const email = normalizeEmail(payload.email);

  if (email === normalizeEmail(MOCK_CREDENTIALS.email)) {
    throw new Error("An account with this email already exists.");
  }

  if (registeredByEmail.has(email)) {
    throw new Error("An account with this email already exists.");
  }

  const newUser: AuthUser = {
    ...MOCK_USER,
    id: `usr-${Date.now()}`,
    email: payload.email.trim(),
    name: payload.name.trim(),
    created_at: new Date().toISOString(),
  };

  registeredByEmail.set(email, {
    password: payload.password,
    user: newUser,
  });

  return {
    user: newUser,
    access_token: generateToken(),
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };
};
