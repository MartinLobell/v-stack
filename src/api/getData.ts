import { db, auth } from '../lib/firebase'
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import type { Character } from '../types/Character'

export const fetchChars = async (): Promise<Character[]> => {
  const characters: Character[] = []
  try {
    const querySnapshot = await getDocs(collection(db, 'characters'))
    querySnapshot.forEach((doc) => {
      characters.push(doc.data() as Character)
    })
    return characters
  } catch (error) {
    console.error('Error fetching characters:', error)
    // TODO: send errors
    throw new Error('Failed to fetch characters')
  }
}

export const getCharOfTheDay = async (): Promise<Character> => {
  try {
    const docRef = doc(db, 'dailyCharacter', 'current')
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const char = docSnap.data()
      return char.character as Character
    }
    throw new Error('Character of the day not found')
  } catch (error) {
    console.error('Error fetching character of the day:', error)
    throw new Error('Failed to fetch character of the day')
  }
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
