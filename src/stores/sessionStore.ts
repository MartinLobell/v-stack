import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '../types/User'
import { fetchUser, registerUser, getAllUsers } from '../api/getData'

export const useSessionStore = defineStore('userSession', () => {
  const isLoggedIn = ref(false)
  const user = ref({} as User)

  const login = async (email: string, password: string) => {
    try {
      const fetchedUser: User | null = await fetchUser(email, false, password)
      if (fetchedUser !== null) {
        isLoggedIn.value = true
        user.value = fetchedUser
      } else {
        alert('Invalid credentials')
      }
    } catch (error) {
      console.error('Error logging in:', error)
    }
  }

  const logout = () => {
    // TODO: Perhaps instead of using a boolean like this, check if there is a logged in user?
    isLoggedIn.value = false
    user.value = {} as User
  }

  const register = async (email: string, password: string, userName: string) => {
    try {
      registerUser(email, password, userName)
      isLoggedIn.value = true
      user.value = {
        email,
        password,
        userName,
        fullstackleStats: { wins: 0, guesses: 0, playedGames: 0 },
      }
    } catch (error) {
      console.error('Error registering user:', error)
    }
  }

  const updateUser = async (email: string) => {
    const updatedUser = await fetchUser(email, true)
    if (updatedUser !== null) {
      user.value = updatedUser
    } else {
      console.error('User not found')
    }
  }

  const getAllStats = async () => {
    const users = await getAllUsers(isLoggedIn.value)
    if (users) {
      return users as {
        userName: string
        stats: { guesses: number; playedGames: number; wins: number }
      }[]
    } else {
      return []
    }
  }

  return { isLoggedIn, user, login, logout, register, updateUser, getAllStats }
})
