// Keyboard shortcut combinations
export const SHORTCUTS = {
  TOGGLE_THEME: 'ctrl+d', // Toggle between light/dark theme
  INCREASE_FONT: 'ctrl+plus', // Increase font size
  DECREASE_FONT: 'ctrl+minus', // Decrease font size
  RESET_FONT: 'ctrl+0', // Reset font size to default
  TOGGLE_DYSLEXIC: 'ctrl+y', // Toggle dyslexic-friendly font
  TOGGLE_CONTRAST: 'ctrl+h', // Toggle high contrast
  TOGGLE_ANIMATIONS: 'alt+n', // Toggle animations
}

// Font size limits
const MIN_FONT_SIZE = 12
const MAX_FONT_SIZE = 24
const DEFAULT_FONT_SIZE = 16

// Initialize state in localStorage if not present
const initializeState = () => {
  if (!localStorage.getItem('userPreferences')) {
    localStorage.setItem('userPreferences', JSON.stringify({
      isDarkMode: false,
      fontSize: DEFAULT_FONT_SIZE,
      isDyslexicFont: false,
      isHighContrast: false,
      enableAnimations: true,
    }))
  }
}

// Get current preferences
export const getPreferences = () => {
  initializeState()
  return JSON.parse(localStorage.getItem('userPreferences'))
}

// Update preferences
export const updatePreferences = (updates) => {
  const current = getPreferences()
  const updated = { ...current, ...updates }
  localStorage.setItem('userPreferences', JSON.stringify(updated))
  applyPreferences(updated)
}

// Toggle functions
export const toggleDarkMode = () => {
  const preferences = getPreferences()
  updatePreferences({ isDarkMode: !preferences.isDarkMode })
}

export const toggleDyslexicFont = () => {
  const preferences = getPreferences()
  updatePreferences({ isDyslexicFont: !preferences.isDyslexicFont })
}

export const toggleHighContrast = () => {
  const preferences = getPreferences()
  updatePreferences({ isHighContrast: !preferences.isHighContrast })
}

export const toggleAnimations = () => {
  const preferences = getPreferences()
  updatePreferences({ enableAnimations: !preferences.enableAnimations })
}

export const adjustFontSize = (delta) => {
  const preferences = getPreferences()
  const newSize = preferences.fontSize + (delta * 2)
  if (newSize >= MIN_FONT_SIZE && newSize <= MAX_FONT_SIZE) {
    updatePreferences({ fontSize: newSize })
  }
}

export const resetFontSize = () => {
  updatePreferences({ fontSize: DEFAULT_FONT_SIZE })
}

// Apply preferences to the document
export const applyPreferences = (preferences) => {
  const root = document.documentElement
  
  // Apply dark mode
  if (preferences.isDarkMode) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }

  // Apply font size
  root.style.fontSize = `${preferences.fontSize}px`

  // Apply dyslexic font
  if (preferences.isDyslexicFont) {
    root.style.fontFamily = 'OpenDyslexic, sans-serif'
  } else {
    root.style.fontFamily = ''
  }

  // Apply high contrast
  if (preferences.isHighContrast) {
    root.classList.add('high-contrast')
  } else {
    root.classList.remove('high-contrast')
  }

  // Apply animations
  if (!preferences.enableAnimations) {
    root.classList.add('disable-animations')
  } else {
    root.classList.remove('disable-animations')
  }
}

// Handle keyboard shortcuts
export const handleKeyboardShortcut = (event) => {
  // Check for Ctrl/Cmd key combinations
  if (event.ctrlKey || event.metaKey) {
    switch (event.key.toLowerCase()) {
      case 'd': // Ctrl + D for dark mode
        event.preventDefault()
        toggleDarkMode()
        break
      case 'y': // Ctrl + Y for dyslexic font
        event.preventDefault()
        toggleDyslexicFont()
        break
      case 'h': // Ctrl + H for high contrast
        event.preventDefault()
        toggleHighContrast()
        break
      case '=': // Ctrl + = to increase font size
      case '+':
        event.preventDefault()
        adjustFontSize(1)
        break
      case '-': // Ctrl + - to decrease font size
      case '_':
        event.preventDefault()
        adjustFontSize(-1)
        break
      case '0': // Ctrl + 0 to reset font size
        event.preventDefault()
        resetFontSize()
        break
    }
  }
  
  // Check for Alt key combinations
  if (event.altKey) {
    switch (event.key.toLowerCase()) {
      case 'n': // Alt + N for animations
        event.preventDefault()
        toggleAnimations()
        break
    }
  }
} 