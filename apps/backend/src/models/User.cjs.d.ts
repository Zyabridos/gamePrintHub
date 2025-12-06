declare class User {
  id: number;
  email: string;
  verifyPassword(password: string): boolean;
}

export default User;
