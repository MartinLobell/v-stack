import { render } from '@testing-library/vue'
import GuessRow from '../components/guesslist/GuessRow.vue'
import { test, expect } from 'vitest'
import '@testing-library/jest-dom'

test('renders klopp content', () => {
  const { getByText } = render(GuessRow, {
    props: {
      character: {
        name: 'Jürgen Klopp',
        gender: 'Male',
        birthYear: 1967,
        hometown: 'Stuttgart',
        hairColour: 'Blonde',
        height: 194,
      },
      charOfTheDay: {
        name: 'Arne Slot',
        gender: 'Male',
        birthYear: 1978,
        hometown: 'Bergentheim',
        hairColour: 'Bald',
        height: 185,
      },
    },
  })
  expect(getByText('Jürgen Klopp')).toBeInTheDocument()
  expect(getByText('Stuttgart')).toBeInTheDocument()
  expect(getByText('Blonde')).toBeInTheDocument()
  expect(getByText('Male')).toBeInTheDocument()
  expect(() => getByText('Arne Slot')).toThrow()
})

test('renders slot content', () => {
  const { getByText } = render(GuessRow, {
    props: {
      character: {
        name: 'Arne Slot',
        gender: 'Male',
        birthYear: 1978,
        hometown: 'Bergentheim',
        hairColour: 'Bald',
        height: 185,
      },
      charOfTheDay: {
        name: 'Jürgen Klopp',
        gender: 'Male',
        birthYear: 1967,
        hometown: 'Stuttgart',
        hairColour: 'Blonde',
        height: 194,
      },
    },
  })
  expect(getByText('Arne Slot')).toBeInTheDocument()
  expect(getByText('Bergentheim')).toBeInTheDocument()
  expect(getByText('Bald')).toBeInTheDocument()
  expect(getByText('Male')).toBeInTheDocument()
  expect(() => getByText('Jürgen Klopp')).toThrow()
})
