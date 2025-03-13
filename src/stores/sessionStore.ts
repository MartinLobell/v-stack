import { defineStore } from 'pinia'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { ref } from 'vue'
import { loginWithGoogle, signOutWithGoogle } from '@/api/getData'

export const useSessionStore = defineStore('userSession', () => {
  const user = ref<User | null>(null)

  const signInWithGoogle = async () => {
    try {
      loginWithGoogle()
    } catch (error) {
      console.error('Google Sign-In Error:', error)
    }
  }

  const logout = async () => {
    alert('Hate the player, not the game.')
    signOutWithGoogle()
    user.value = null
  }

  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser
  })

  const updateUser = () => {}

  return { user, signInWithGoogle, logout, updateUser }
})
