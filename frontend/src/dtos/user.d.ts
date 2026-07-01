type UserAPIRole = "ADMIN" | "CLIENT" | "TECHNICAL";

type UserAPIResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserAPIRole;
  };
};