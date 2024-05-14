import { axiosInstance } from "./instance";

const API_URL = "/services";

export interface Service {
  id: number;
  name: string;
}

export async function getServices() {
  const { data } = await axiosInstance.get<Service[]>(API_URL);
  return data;
}

export async function getServiceById(id: string) {
  const { data } = await axiosInstance.get<Service>(`${API_URL}/${id}`);
  return data;
}

export async function updateService({ name, id }: { name: string, id: number }) {
  const { data } = await axiosInstance.patch<Service>(`${API_URL}/${id}`, { name })
  return data
}

export async function createService(name: string) {
  const { data } = await axiosInstance.post<Service>(API_URL, { name })
  return data
}

export async function deleteService(id: number) {
  console.log(id);

  const res = await axiosInstance.delete(`${API_URL}/${id}`)

  if (res.status === 200) {
    return true
  }
  return false
}