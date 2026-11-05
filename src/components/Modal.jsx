import { useCallback, useEffect, useRef, useState } from "react";

function Modal({ labelledBy, onClose, children, className = "" }) {
  const [closeState, setCloseState] = useState({
    isClosing: false,
    action: null,
  });
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);

  const { isClosing } = closeState;

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const requestClose = useCallback((closeAction) => {
    setCloseState((state) =>
      state.isClosing
        ? state
        : { isClosing: true, action: closeAction || null }
    );
  }, []);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        requestClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, [requestClose]);

  function handleAnimationEnd(event) {
    if (
      event.target !== event.currentTarget ||
      event.animationName !== "modal-dialog-out"
    ) {
      return;
    }

    closeState.action?.();
    onCloseRef.current();
  }

  function handleDialogKeyDown(event) {
    if (event.key !== "Tab") return;

    const focusableElements = dialogRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableElements?.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  return (
    <div
      className={`modal-backdrop${isClosing ? " is-closing" : ""}`}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <section
        className={`modal-dialog ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        ref={dialogRef}
        onKeyDown={handleDialogKeyDown}
        onAnimationEnd={handleAnimationEnd}
      >
        {typeof children === "function" ? children(requestClose) : children}
      </section>
    </div>
  );
}

export default Modal;
