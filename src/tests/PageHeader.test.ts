import { render } from '@testing-library/vue'
import PageHeader from '@/components/header/PageHeader.vue'
import { test, expect, vi } from 'vitest'
import '@testing-library/jest-dom'

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
  getApps: vi.fn(() => []),
  getApp: vi.fn(() => ({})),
}))
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
}))
vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
}))

test('renders header component', () => {
  const {} = render(PageHeader, {
    global: {
      stubs: {
        NavLink: true,
        HeaderNav: true,
      },
    },
  })
  const headerElement = document.querySelector('.fs-header')
  const titleElement = document.querySelector('.fs-site-title')
  expect(headerElement).toBeInTheDocument()
  expect(titleElement).toBeInTheDocument()
})
