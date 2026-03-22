import { useEffect, useRef, useCallback } from 'react';

export const useKeyboardShortcuts = (shortcuts = {}) => {
  const shortcutsRef = useRef(shortcuts);
  const pendingKeyRef = useRef(null);
  const pendingTimeoutRef = useRef(null);

  useEffect(() => {
    shortcutsRef.current = shortcuts;
  }, [shortcuts]);

  const handleKeyDown = useCallback((event) => {
    // Ignore if typing in input/textarea
    if (
      event.target.tagName === 'INPUT' ||
      event.target.tagName === 'TEXTAREA' ||
      event.target.isContentEditable
    ) {
      // Exception: allow Escape in inputs
      if (event.key !== 'Escape') return;
    }

    const { key, ctrlKey, metaKey, shiftKey, altKey } = event;
    const modifier = ctrlKey || metaKey;

    // Check for two-key sequences (like G+O)
    if (pendingKeyRef.current) {
      const sequence = `${pendingKeyRef.current}+${key.toLowerCase()}`;
      const handler = shortcutsRef.current[sequence];
      
      if (handler) {
        event.preventDefault();
        handler();
      }
      
      pendingKeyRef.current = null;
      if (pendingTimeoutRef.current) {
        clearTimeout(pendingTimeoutRef.current);
        pendingTimeoutRef.current = null;
      }
      return;
    }

    // Build shortcut string
    let shortcutStr = '';
    if (modifier) shortcutStr += 'ctrl+';
    if (shiftKey) shortcutStr += 'shift+';
    if (altKey) shortcutStr += 'alt+';
    shortcutStr += key.toLowerCase();

    // Check for single-key shortcuts
    const handler = shortcutsRef.current[shortcutStr];
    if (handler) {
      event.preventDefault();
      handler();
      return;
    }

    // Check for two-key sequence starters (like just 'g')
    const sequenceStarter = `${key.toLowerCase()}`;
    if (shortcutsRef.current[sequenceStarter] && !modifier) {
      pendingKeyRef.current = sequenceStarter;
      pendingTimeoutRef.current = setTimeout(() => {
        pendingKeyRef.current = null;
        pendingTimeoutRef.current = null;
      }, 1000); // 1 second to complete sequence
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (pendingTimeoutRef.current) {
        clearTimeout(pendingTimeoutRef.current);
      }
    };
  }, [handleKeyDown]);
};

export default useKeyboardShortcuts;
