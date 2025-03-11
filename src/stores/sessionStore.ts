import { defineStore } from 'pinia'
import { auth, db } from '@/lib/firebase'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { ref } from 'vue'

export const useSessionStore = defineStore('userSession', () => {
  const user = ref<User | null>(null)

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const userDoc = doc(db, 'users', result.user.uid)
      const userSnap = await getDoc(userDoc)

      if (!userSnap.exists()) {
        await setDoc(userDoc, {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          fullstackleStats: {
            wins: 0,
            guesses: 0,
            playedGames: 0,
          },
        })
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error)
    }
  }

  const logout = async () => {
    alert('Hate the player, not the game.')
    await signOut(auth)
    user.value = null
  }

  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser
  })

  const updateUser = () => {}

  return { user, signInWithGoogle, logout, updateUser }
})
