import { useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useModal({ isOpen, onBaseClose, dialogRef, queryKey }) {
    const location = useLocation();
    const navigate = useNavigate();
    const goBackRef = useRef(location.state?.from || "/");
    const previouslyFocused = useRef(null);

    const onClose = useCallback(() => {
        onBaseClose?.();
        if (!queryKey) return;
        const params = new URLSearchParams(location.search);
        if (params.has(queryKey) || params.get(queryKey)) {
            params.delete(queryKey);
            navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
        } else {
            navigate(goBackRef.current, { replace: true });
        }
    }, [onBaseClose, location.pathname, location.search, navigate, queryKey]);

    useEffect(() => {
        if (!isOpen) return;
        
        previouslyFocused.current = document.activeElement;
        document.body.style.overflow = 'hidden';
        setTimeout(() => dialogRef.current?.querySelector('input').focus(), 0);

        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
            if (e.key === 'Tab') {
                const focusedEl = dialogRef.current.querySelectorAll(
                    'button, input'
                );
                const first = focusedEl[0];
                const last = focusedEl[focusedEl.length - 1];
                if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                } else if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            }
        };
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = '';
            previouslyFocused.current.focus();
        };
    }, [onClose, isOpen, dialogRef])

    const onBackdrop = useCallback((e) => {
        if (e.target === e.currentTarget) onClose();
    }, [onClose]);

    return {onClose, onBackdrop}
}