export interface User {
  email: string
  password: string
  fullstackleStats: {
    guesses: number
    playedGames: number
    wins: number
  }
}
