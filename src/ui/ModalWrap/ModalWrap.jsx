import { IoMdClose } from "react-icons/io";
import { useRef } from "react";
import { useModal } from "../../hooks/useModal";
import s from "./ModalWrap.module.css"; 

export function ModalWrap({
    isOpen, 
    onBaseClose,
    title,
    description,
    queryKey,
    children
}) {
    const dialogRef = useRef(null);
    const { onClose, onBackdrop } = useModal({
        isOpen,
        onBaseClose,
        dialogRef,
        queryKey
    })

    if (!isOpen) return null;

    return (
    <div className={s.backdrop} onClick={onBackdrop} role="presentation">
      <div
        className={s.modal}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button type="button" className={s.closeBtn} onClick={onClose} aria-label="Close">
          <IoMdClose />
        </button>

        {title && <h2 id="modal-title" className={s.modal_title}>{title}</h2>}
        {description && <p className={s.modal_text}>{description}</p>}

        <div className={s.body}>
          {children}
        </div>
      </div>
    </div>
  );
}