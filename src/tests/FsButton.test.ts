import { render, fireEvent } from '@testing-library/vue'
import FsButton from '../components/button/FsButton.vue'
import { test, expect, vi } from 'vitest'
import '@testing-library/jest-dom'

test('renders slot content', () => {
  const { getByText } = render(FsButton, {
    slots: {
      default: 'Test Button Text',
    },
    props: {
      type: 'button',
      btnClass: 'primary',
    },
  })
  expect(getByText('Test Button Text')).toBeInTheDocument()
})

test('calls onClick when clicked', async () => {
  const onClick = vi.fn()
  const { getByRole } = render(FsButton, {
    props: {
      type: 'button',
      btnClass: 'primary',
      onClick,
      disabled: false,
    },
    slots: {
      default: 'Click',
    },
  })

  await fireEvent.click(getByRole('button'))
  expect(onClick).toHaveBeenCalledOnce()
})

test('does not call onClick when disabled', async () => {
  const onClick = vi.fn()
  const { getByRole } = render(FsButton, {
    props: {
      type: 'button',
      btnClass: 'primary',
      onClick,
      disabled: true,
    },
    slots: {
      default: 'Disabled',
    },
  })

  const button = getByRole('button')
  expect(button).toBeDisabled()

  await fireEvent.click(button)
  expect(onClick).not.toHaveBeenCalled()
})

test('applies correct classes', () => {
  const { getByRole } = render(FsButton, {
    props: {
      type: 'button',
      btnClass: 'secondary',
      small: true,
    },
    slots: {
      default: 'Styled',
    },
  })

  const button = getByRole('button')
  expect(button.classList).toContain('fs-button')
  expect(button.classList).toContain('secondary')
  expect(button.classList).toContain('small')
})
