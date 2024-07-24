import { useEffect } from 'react'

interface UseKeyboardShortcutArgs {
  key: string
  onKeyPressed: () => void
}

export function useKeyboardShortcut({
  key,
  onKeyPressed,
}: UseKeyboardShortcutArgs) {
  useEffect(() => {
    function keyDownHandler(e: KeyboardEvent) {
      if (e.key === key) {
        e.preventDefault()
        onKeyPressed()
      }
    }

    document.addEventListener('keydown', keyDownHandler)

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [])
}

export function useKeyboardShortcuts(shortcuts: UseKeyboardShortcutArgs[]) {
  return shortcuts.map(shortcut => useKeyboardShortcut(shortcut))
}