export interface FsUser {
  userName: string
  email: string
  password: string
  fullstackleStats: {
    guesses: number
    playedGames: number
    wins: number
  }
}
