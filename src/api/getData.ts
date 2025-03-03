import { db } from '../lib/firebase'
import { updateDoc, collection, getDocs, addDoc } from 'firebase/firestore'
import type { Character } from '../types/Character'
import type { User } from '../types/User'

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

export const fetchUser = async (email: string, password?: string): Promise<User> => {
  let user: User = {} as User
  try {
    const querySnapshot = await getDocs(collection(db, 'users'))
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      console.log('Här! -> ' + JSON.stringify(doc))
      if (data.email === email && data.password === password) {
        user = data as User
      }
    })
  } catch (error) {
    console.error('Error fetching characters:', error)
    // TODO: send errors
    throw new Error('Failed to fetch characters')
  }
  return user
}

export const registerUser = async (email: string, password: string): Promise<void> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'))
    let emailExists = false
    querySnapshot.forEach((doc) => {
      const data = doc.data() as User
      if (data.email === email) {
        emailExists = true
      }
    })

    if (emailExists) {
      throw new Error('Email already exists')
    }

    await addDoc(collection(db, 'users'), {
      email,
      password,
      fullstackleStats: {
        wins: 0,
        guesses: 0,
        playedGames: 0,
      },
    })
    console.log('User registered successfully')
  } catch (error) {
    console.error('Error registering user:', error)
    // TODO: send errors
    throw new Error('Failed to register user')
  }
}

export const updateFullstackleStats = async (user: User, newGuesses: number): Promise<void> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'))
    let userRef = null
    querySnapshot.forEach((doc) => {
      const data = doc.data() as User
      if (data.email === user.email) {
        userRef = doc.ref
      }
    })

    if (!userRef) {
      throw new Error('User not found')
    }
    await updateDoc(userRef, {
      'fullstackleStats.playedGames': user.fullstackleStats.playedGames + 1,
      'fullstackleStats.guesses': user.fullstackleStats.guesses + newGuesses,
      'fullstackleStats.wins': user.fullstackleStats.wins + 1,
      // TODO: Only append to wins if won
    })
    console.log('User stats updated successfully')
  } catch (error) {
    console.error('Error updating user stats:', error)
    // TODO: send errors
    throw new Error('Failed to update user stats')
  }
}
