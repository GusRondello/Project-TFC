import ILogin from "../../interfaces/login.interface";
import IMatches from "../../interfaces/matches.interface";

export const validUser: ILogin = {
    email: "user@user.com",
    password: "secret_user"
}

export const validToken = 'eyJhbGciOiJIUzI1NiJ9.dXNlckB1c2VyLmNvbQ.8yAUgfpLRsTuqgg-Yj3YeO66h8PxSQdx1y641jX4JpM'

export const validMatch: IMatches = {
  homeTeam: 16,
  awayTeam: 14,
	homeTeamGoals: 2,
	awayTeamGoals: 1
}

export const mockedMatch = {
  id: '1',
  homeTeam: '16',
  homeTeamGoals: '1',
  awayTeam: '8',
  awayTeamGoals: '1',
  inProgress: false,
  teamHome: {
    teamName: "São Paulo"
  },
  teamAway: {
    "teamName": "Grêmio"
  }
}