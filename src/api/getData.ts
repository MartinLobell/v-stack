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

export const fetchUser = async (
  email: string,
  isLoggedIn: boolean,
  password?: string,
): Promise<User | null> => {
  let user: User | null = null
  try {
    const querySnapshot = await getDocs(collection(db, 'users'))
    querySnapshot.forEach((doc) => {
      const data = doc.data() as User
      if (data.email === email) {
        if (isLoggedIn || (password && data.password === password)) {
          user = data
        }
      }
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    // TODO: send errors
    throw new Error('Failed to fetch user')
  }
  return user
}

export const registerUser = async (
  email: string,
  password: string,
  userName: string,
): Promise<void> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'))
    let emailExists = false
    let nameExists = false
    querySnapshot.forEach((doc) => {
      const data = doc.data() as User
      if (data.email === email) {
        emailExists = true
      }
      if (data.userName === userName) {
        nameExists = true
      }
    })

    if (emailExists) {
      throw new Error('Email already exists')
    }
    if (nameExists) {
      throw new Error(userName + ' is taken')
    }

    await addDoc(collection(db, 'users'), {
      email,
      password,
      userName,
      fullstackleStats: {
        wins: 0,
        guesses: 0,
        playedGames: 0,
      },
    })
  } catch (error) {
    console.error('Error registering user:', error)
    // TODO: send errors
    throw new Error('Failed to register user')
  }
}

export const updateFullstackleStats = async (
  user: User,
  newGuesses: number,
  won: boolean,
): Promise<void> => {
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
      'fullstackleStats.wins': user.fullstackleStats.wins + (won ? 1 : 0),
    })
  } catch (error) {
    console.error('Error updating user stats:', error)
    // TODO: send errors
    throw new Error('Failed to update user stats')
  }
}

export const getAllUsers = async (isLoggedIn: boolean) => {
  const users: { userName: string; stats: object }[] = []
  if (isLoggedIn) {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'))
      querySnapshot.forEach((doc) => {
        const data = doc.data() as User
        users.push({ userName: data.userName, stats: data.fullstackleStats })
      })
    } catch (error) {
      console.error('Error fetching user:', error)
      throw new Error('Failed to fetch user')
    }
    return users
  }
  return
}
