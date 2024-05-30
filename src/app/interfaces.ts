/*
Interface for the Login Response
*/
export interface LoginResponse {
  username: string;
  type: string;
}

export interface User {
  username: string
  password: string
  isAdmin: boolean
}

/*
Interface for the Register Request
*/
export interface RegisterRequest {
  user: User;
  license: number;
}

/*
Interface for the Register Response
*/
export interface RegisterResponse {
  status: number;
  message: string;
}

export interface Game {
  id: number
  homeTeamName: string
  awayTeamName: string
  homeTeamId: number
  awayTeamId: number
  homeScore: number
  awayScore: number
  champId: number
  date: Date
}

export interface Championship {
  id: number
  name: string
  selected: boolean
}

export interface Team {
  id: number
  teamName: string
  championshipName: string
  selected: boolean
}

export interface GameId {
  gameId: number
  homeTeamName: string
  awayTeamName: string
}

export interface GameScore {
  id: number,
  homeScore: number,
  awayScore: number
}

export interface Scorer {
  id: number
  firstName: string
  lastName: string
}

export interface NewScorer {
  gameId: number
  homeScorerId: number
  awayScorerId: number
  homeScore: number
  awayScore: number
}

export interface Profile {
  id: number
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
}
