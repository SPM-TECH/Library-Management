import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/services";

interface Service {
  id: number;
  name: string;
}

export async function getServices() {
  const { data } = await axios.get<Service[]>(API_URL);
  return data;
}

export async function getServiceById(id: string) {
  const { data } = await axios.get<Service>(`${API_URL}/${id}`);
  return data;
}
