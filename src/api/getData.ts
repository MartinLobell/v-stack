import { db } from '../lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import type { Character } from '../types/Character'

const fetchChars = async (): Promise<Character[]> => {
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

export default fetchChars
