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
