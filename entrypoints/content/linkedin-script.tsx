
import { useCallback, useEffect, useState } from 'react'

export default function LinkedInScript() {
    const [showModal, setShowModal] = useState(false)
    const [showIcon, setShowIcon] = useState(false)
    const [iconPosition, setIconPosition] = useState({ top: 0, left: 0 })

    const updateIconPosition = useCallback((target: HTMLElement) => {
      const rect = target.getBoundingClientRect()
      setIconPosition({
        top: rect.bottom - 40,
        left: rect.right - 40,
      })
    }, [])

    const handleFocus = useCallback((event: FocusEvent) => {
      const target = event.target as HTMLElement
      if (target.classList.contains('msg-form__contenteditable')) {
        console.log('Focus event triggered')
        setShowIcon(true)
        updateIconPosition(target)
      }
    }, [updateIconPosition])

    const handleBlur = useCallback((event: FocusEvent) => {
      const target = event.target as HTMLElement
      if (target.classList.contains('msg-form__contenteditable')) {
        setShowIcon(false)
      }
    }, [])

    useEffect(() => {
      document.addEventListener('focus', handleFocus, true)
      document.addEventListener('blur', handleBlur, true)

      return () => {
        document.removeEventListener('focus', handleFocus, true)
        document.removeEventListener('blur', handleBlur, true)
      }
    }, [handleFocus, handleBlur])

    const handleInsert = (text: string) => {
      const messageInput = document.querySelector('.msg-form__contenteditable') as HTMLElement
      if (messageInput) {
        messageInput.innerHTML = text
        messageInput.dispatchEvent(new InputEvent('input', { bubbles: true }))
      }
      setShowModal(false)
    }

    console.log('Render: showIcon =', showIcon, 'iconPosition =', iconPosition)

    return (
      <>
        {showIcon && (
          <div
            className="fixed bg-black z-50"
            style={{
              top: `${iconPosition.top}px`,
              left: `${iconPosition.left}px`,
            }}
          >
            <button
              onClick={() => setShowModal(true)}
              className="w-8 h-8 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-xs"
            >
              AI
            </button>
          </div>
        )}
      </>
  )
}
