import { axiosInstance } from "./instance";


export interface User {
  id: number;
  user_name: string;
  nic_number: string;
  index_number: string;
  faculty: string;
  updated_at: string;
}

export async function getUsers() {
  const { data } = await axiosInstance.get<User[]>("/users");
  return data;
}

export async function getUserByNic(nic: string) {
  const res = await axiosInstance.get<User>("/users/nic/" + nic);

  return res.data;
}

export async function addUser(Data: Partial<User>) {
  const { data } = await axiosInstance.post<User>("/users", Data);
  return data;
}

export async function addOptions(nic: string, services: number[]) {
  const { data } = await axiosInstance.patch(`/users/options/${nic}`, {
    services,
  });
  return data;
}

export async function bulkUploadUsers(users: User[]) {
  const res = await axiosInstance.post("/users/bulk", { users })

  if (res.data.status == 201) {
    return res.data.users as User[]
  }
  else {
    return res.data.error as string
  }
}