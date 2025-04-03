import { db, auth } from '../lib/firebase'
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import type { Character } from '../types/Character'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const fetchChars = async (): Promise<Character[]> => {
  const characters: Character[] = []
  try {
    const querySnapshot = await getDocs(collection(db, 'characters'))
    querySnapshot.forEach((doc) => {
      characters.push(doc.data() as Character)
    })
  } catch (error: unknown) {
    console.error('Error fetching characters: ', error)
    toast.error('Failed to fetch characters')
  }
  return characters
}

export const getCharOfTheDay = async (): Promise<Character> => {
  try {
    const docRef = doc(db, 'dailyCharacter', 'current')
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const char = docSnap.data()
      return char.character as Character
    }
  } catch (error) {
    console.error('Error fetching character of the day:', error)
    toast.error('Failed to fetch character of the day')
  }
  return {} as Character
}

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)
  const userDoc = doc(db, 'users', result.user.uid)
  const userSnap = await getDoc(userDoc)

  if (!userSnap.exists()) {
    await setDoc(userDoc, {
      uid: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
      gameStats: {
        fullstackleStats: {
          wins: Number(0),
          guesses: Number(0),
          playedGames: Number(0),
        },
        findErminStats: {
          playedGames: Number(0),
          wins: Number(0),
          avgTime: Number(0),
        },
      },
    })
  }
}

export const signOutWithGoogle = async () => {
  await signOut(auth)
}
