import axios from "axios";

export async function fetchUsers({ queryKey }) {
  const filter = queryKey[1];
  const { data } = await axios.get(
    `http://localhost:3000/api/v1/user/bulk?filter=${filter}`
  );
  return data;
}

export async function fetchBalance({ queryKey }) {
  const token = queryKey[1];
  const { data } = await axios.get(
    `http://localhost:3000/api/v1/account/balance`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return data;
}
