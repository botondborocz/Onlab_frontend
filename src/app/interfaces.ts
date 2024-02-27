
/*
Interface for the Refresh Token (can look different, based on your backend api)
*/
export interface RefreshToken {
  id: number;
  userId: number;
  token: string;
  refreshCount: number;
  expiryDate: Date;
}

/*
Interface for the Login Response (can look different, based on your backend api)
*/
// export interface LoginResponse {
//   accessToken: string;
//   refreshToken: RefreshToken;
//   tokenType: string;
// }
export interface LoginResponse {
  username: string;
  type: string;
}

/*
Interface for the Login Request (can look different, based on your backend api)
*/
export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  username: string
  password: string
  isProf:boolean
}

/*
Interface for the Register Request (can look different, based on your backend api)
*/
export interface RegisterRequest {
  user: User;
  license: number;
}

/*
Interface for the Register Response (can look different, based on your backend api)
*/
export interface RegisterResponse {
  status: number;
  message: string;
}