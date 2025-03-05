import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '../types/User'
import { fetchUser, registerUser } from '../api/getData'

export const useSessionStore = defineStore('userSession', () => {
  const isLoggedIn = ref(false)
  const isChosenBoy = ref(false)
  const user = ref({} as User)

  const login = async (email: string, password: string) => {
    try {
      const fetchedUser: User | null = await fetchUser(email, false, password)
      if (fetchedUser !== null) {
        isLoggedIn.value = true
        user.value = fetchedUser
        if (fetchedUser.email === 'ermin.bejtula@capgemini.com') {
          isChosenBoy.value = true
        }
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
    isChosenBoy.value = false
    user.value = {} as User
  }

  const register = async (email: string, password: string) => {
    try {
      registerUser(email, password)
      isLoggedIn.value = true
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

  return { isLoggedIn, isChosenBoy, user, login, logout, register, updateUser }
})
