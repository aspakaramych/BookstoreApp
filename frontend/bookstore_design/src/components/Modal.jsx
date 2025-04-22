import React from 'react';
import '../styles/modal.css';

function Modal({ isOpen, onClose, onConfirm, message }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {typeof message === 'string' ? (
                    <p>{message}</p>
                ) : (
                    <form className="modal-form">{message}</form>
                )}
                <div className="modal-button">
                    <button onClick={onClose}>Отмена</button>
                    <button onClick={onConfirm}>Подтвердить</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;