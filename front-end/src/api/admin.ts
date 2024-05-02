import { User } from "./users";
import { axiosInstance } from "./instance";

const SERVICE_URL = "/services/count";
const AUTH = "/auth/login";

export interface LoginCount {
  id: number;
  date: string;
  count: number;
}

export async function getAttendance() {
  const { data } = await axiosInstance.get<User[]>(`/users/attendance`);
  return data;
}

export async function getFaculties() {
  const { data } = await axiosInstance.get<{
    animal_science: number;
    management: number;
    applied_science: number;
    medicine: number;
    techno_studies: number;
  }>(`/users/faculty`);
  return data;
}

export async function getServicesCount() {
  const { data } = await axiosInstance.get<
    Array<{
      service: string;
      count: number;
    }>
  >(SERVICE_URL);
  return data;
}

export async function loginCount() {
  const { data } = await axiosInstance.get<LoginCount[]>(
    `/admin/login-count`
  );
  return data;
}

export async function login(username: string, password: string) {
  const { data } = await axiosInstance.post<{ access_token: string }>(`${AUTH}`, {
    username,
    password,
  });

  return data;
}
