import * as functions from 'firebase-functions/v1'
import * as admin from 'firebase-admin'

admin.initializeApp()
const db = admin.firestore()

// Scheduled job to update "Character of the Day" at midnight UTC
export const updateCharacterDaily = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('UTC')
  .onRun(async () => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const dailyCharacterRef = db.collection('dailyCharacter').doc('current')

      const charactersRef = db.collection('characters')
      const snapshot = await charactersRef.get()

      if (snapshot.empty) {
        console.error('No characters found in Firestore!')
        return
      }

      const characters = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      const randomCharacter = characters[Math.floor(Math.random() * characters.length)]

      await dailyCharacterRef.set({
        date: today,
        character: randomCharacter,
      })

      console.log('Character of the Day updated:', randomCharacter)
    } catch (error) {
      console.error('Failed to update Character of the Day:', error)
      throw new Error('Failed to update Character of the Day')
    }
  })
