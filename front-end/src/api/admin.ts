import axios from "axios";
import { User } from "./users";

const API_URL = import.meta.env.VITE_API_URL + "/users";
const SERVICE_URL = import.meta.env.VITE_API_URL + "/services/count";
const AUTH = import.meta.env.VITE_API_URL + "/auth/login";

interface LoginCount {
  id: number;
  date: string;
  count: number;
}

export async function getAttendance() {
  const { data } = await axios.get<User[]>(`${API_URL}/attendance`);
  return data;
}

export async function getFaculties() {
  const { data } = await axios.get<{
    animal_science: number;
    management: number;
    applied_science: number;
    medicine: number;
    techno_studies: number;
  }>(`${API_URL}/faculty`);
  return data;
}

export async function getServicesCount() {
  const { data } = await axios.get<
    Array<{
      service: string;
      count: number;
    }>
  >(SERVICE_URL);
  return data;
}

export async function loginCount() {
  const { data } = await axios.get<LoginCount[]>(
    `${import.meta.env.VITE_API_URL}/admin/login-count`
  );
  return data;
}

export async function login(username: string, password: string) {
  const { data } = await axios.post<{ access_token: string }>(`${AUTH}`, {
    username,
    password,
  });
  return data;
}
