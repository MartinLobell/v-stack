//TODO: THIS DOES NOT DO WHAT IT SHOULD YET

export const restrainFocus = (tabId: string) => {
  const tabElement = document.getElementById(tabId)
  if (tabElement) {
    const firstFocusableElement = tabElement.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ) as HTMLElement
    if (firstFocusableElement) {
      if (
        firstFocusableElement ===
        tabElement.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )[
          tabElement.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          ).length - 1
        ]
      ) {
        firstFocusableElement.focus()
      }
    }
  }
}
