import { render } from '@testing-library/vue'
import NavLink from '@/components/nav-link/NavLink.vue'
import { test, expect, vi } from 'vitest'

// Mock useRouter
vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    push: vi.fn(),
    path: '/pelle-svanslos',
  })),
}))

test('renders navlink component with logo', () => {
  const { getByText } = render(NavLink, {
    slots: {
      default: 'Click this link!',
    },
    props: {
      href: 'https://www.google.com',
      logo: true,
      notActive: false,
    },
  })
  const linkElement = getByText('Click this link!')
  expect(linkElement).toBeInTheDocument()
  expect(linkElement).not.toHaveClass('active')
  expect(linkElement).toHaveClass('logo')
})

test('renders navlink component as inactive', () => {
  const { getByText } = render(NavLink, {
    slots: {
      default: 'Inactive link',
    },
    props: {
      href: 'https://www.google.com',
      logo: false,
      notActive: true,
    },
  })
  const linkElement = getByText('Inactive link')
  expect(linkElement).toBeInTheDocument()
  expect(linkElement).not.toHaveClass('active')
  expect(linkElement).not.toHaveClass('logo')
})
