import { render } from '@testing-library/vue'
import PageFooter from '@/components/footer/PageFooter.vue'
import { test, expect } from 'vitest'
import '@testing-library/jest-dom'

test('renders footer component', () => {
  const {} = render(PageFooter)
  const footerElement = document.querySelector('.fs-footer')
  const footerContentElement = document.getElementsByTagName('p')[0]
  expect(footerElement).toBeInTheDocument()
  expect(footerContentElement).toBeInTheDocument()
})
