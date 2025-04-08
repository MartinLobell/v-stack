import { render } from '@testing-library/vue'
import DropDown from '../components/dropdown/DropDown.vue'
import { test, expect } from 'vitest'
import '@testing-library/jest-dom'

test('renders kloppo, slot, stevie and mo as options', () => {
  const { getByText } = render(DropDown, {
    props: {
      options: [
        {
          name: 'Jürgen Klopp',
          gender: 'Male',
          birthYear: 1967,
          hometown: 'Stuttgart',
          hairColour: 'Blonde',
          height: 194,
        },
        {
          name: 'Steven Gerrard',
          gender: 'Male',
          birthYear: 1980,
          hometown: 'Whiston',
          hairColour: 'Light brown',
          height: 185,
        },
        {
          name: 'Arne Slot',
          gender: 'Male',
          birthYear: 1978,
          hometown: 'Bergentheim',
          hairColour: 'Bald',
          height: 185,
        },
        {
          name: 'Mohamed Salah',
          gender: 'Male',
          birthYear: 1992,
          hometown: 'Nagrig',
          hairColour: 'Black',
          height: 175,
        },
      ],
      onSelect: (option: string) => {
        console.log('Selected:', option)
      },
    },
  })
  expect(getByText('Mohamed Salah')).toBeInTheDocument()
  expect(getByText('Jürgen Klopp')).toBeInTheDocument()
  expect(getByText('Arne Slot')).toBeInTheDocument()
  expect(getByText('Steven Gerrard')).toBeInTheDocument()
  expect(() => getByText('Erling BRAUT Haaland')).toThrow()
})
