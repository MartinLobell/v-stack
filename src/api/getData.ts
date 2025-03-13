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
      fullstackleStats: {
        wins: 0,
        guesses: 0,
        playedGames: 0,
      },
    })
  }
}

export const signOutWithGoogle = async () => {
  await signOut(auth)
}
