import { defineStore } from 'pinia'
import { ref } from 'vue'
import users from '../api/localUsers.json'

export const useSessionStore = defineStore('userSession', () => {
  const isLoggedIn = ref(false)
  const isChosenBoy = ref(false)

  const login = (email: string, password: string) => {
    const user = users.find((user) => user.email === email && user.password === password)
    if (user) {
      isLoggedIn.value = true
      if (user.email === 'ermin.bejtula@capgemini.com') {
        isChosenBoy.value = true
      }
    } else {
      alert('Invalid credentials')
    }
  }

  const logout = () => {
    isLoggedIn.value = false
    isChosenBoy.value = false
  }

  const register = async (email: string, password: string) => {
    console.log('Haha, ' + email + ' thought they registered.')
    isLoggedIn.value = true
    return password
  }

  return { isLoggedIn, isChosenBoy, login, logout, register }
})
