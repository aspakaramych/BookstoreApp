import { useState } from "react";
import Modal from "./Modal.jsx";
import "../styles/bookcard.css";
import "../styles/modal.css";

function BookCard({ book, onDelete, onUpdate }) {
    const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        pages: String(book.pages),
        price: String(book.price),
        amount: String(book.amount),
    });

    const handleDelete = () => {
        setIsDeletedModalOpen(true);
    };

    const handleUpdate = () => {
        setIsUpdateModalOpen(true);
    };

    const confirmDelete = async () => {
        await onDelete(book.id);
        setIsDeletedModalOpen(false);
    };

    const confirmUpdate = async () => {
        await onUpdate(book.id, updatedData);
        setIsUpdateModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="book-card">
            <h2>{book.title}</h2>
            <p><strong>Автор:</strong> {book.author}</p>
            <p><strong>Издатель:</strong> {book.publisher}</p>
            <p><strong>Страницы:</strong> {book.pages}</p>
            <p><strong>Цена:</strong> {book.price}</p>
            <p><strong>Количество:</strong> {book.amount}</p>
            <div className="card-actions">
                <button className="delete-btn" onClick={handleDelete}>Удалить</button>
                <button className="update-btn" onClick={handleUpdate}>Изменить</button>
            </div>
            <Modal
                isOpen={isDeletedModalOpen}
                onClose={() => setIsDeletedModalOpen(false)}
                onConfirm={confirmDelete}
                message="Вы точно хотите удалить книгу?"
            />
            <Modal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                onConfirm={confirmUpdate}
                message={
                    <form>
                        <label>
                            Название
                            <input
                                type="text"
                                name="title"
                                value={updatedData.title}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Автор
                            <input
                                type="text"
                                name="author"
                                value={updatedData.author}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Издатель
                            <input
                                type="text"
                                name="publisher"
                                value={updatedData.publisher}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Страницы
                            <input
                                type="number"
                                name="page"
                                value={updatedData.pages}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Цена
                            <input
                                type="number"
                                name="price"
                                value={updatedData.price}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Количество
                            <input
                                type="number"
                                name="amount"
                                value={updatedData.amount}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </form>
                }
            />
        </div>
    );
}

export default BookCard;