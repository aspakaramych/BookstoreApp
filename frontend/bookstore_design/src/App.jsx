import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./styles/modal.css";
import "./styles/bookcard.css";
import Modal from "./components/Modal.jsx";
import BookCard from "./components/BookCard.jsx";

const API_URL = "http://localhost:14000/api";

function App() {
    const [books, setBooks] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newBookData, setNewBookData] = useState({
        title: "",
        author: "",
        publisher: "",
        pages: "0",
        price: "0",
        amount: "0",
    });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${API_URL}/books`);
            setBooks(response.data);
        } catch (error) {
            toast.error("Ошибка загрузки книг");
        }
    };

    const createBook = async () => {
        try {
            const pagesAsNumber = Number(newBookData.pages);
            const priceAsNumber = Number(newBookData.price);
            const amountAsNumber = Number(newBookData.amount);

            if (isNaN(pagesAsNumber) || isNaN(priceAsNumber) || isNaN(amountAsNumber)) {
                toast.error("Количество страниц, цена или количество книг должны быть числами.");
                return;
            }

            const bookToCreate = {
                title: newBookData.title,
                author: newBookData.author,
                publisher: newBookData.publisher,
                pages: pagesAsNumber,
                price: priceAsNumber,
                amount: amountAsNumber,
            };

            await axios.post(`${API_URL}/books`, bookToCreate);
            fetchBooks();
            setIsCreateModalOpen(false);
            setNewBookData({
                title: "",
                author: "",
                publisher: "",
                pages: "",
                price: "",
                amount: "",
            });
            toast.success("Книга успешно создана");
        } catch (error) {
            console.error("Ошибка создания книги:", error);
            toast.error("Ошибка создания книги");
        }
    };

    const deleteBook = async (id) => {
        try {
            await axios.delete(`${API_URL}/books/${id}`);
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
            toast.success("Книга успешно удалена");
        } catch (error) {
            toast.error("Ошибка удаления");
        }
    };

    const updateBook = async (id, updatedData) => {
        try {
            const pagesAsNumber = Number(updatedData.page);
            const priceAsNumber = Number(updatedData.price);
            const amountAsNumber = Number(updatedData.amount);

            if (isNaN(pagesAsNumber) || isNaN(priceAsNumber) || isNaN(amountAsNumber)) {
                toast.error("Количество страниц, цена или количество книг должны быть числами.");
                return;
            }

            const updatedDataToSend = {
                ...updatedData,
                page: pagesAsNumber,
                price: priceAsNumber,
                amount: amountAsNumber,
            };

            await axios.put(`${API_URL}/books/${id}`, updatedDataToSend);
            fetchBooks();
            toast.success("Книга успешно обновлена");
        } catch (error) {
            toast.error("Ошибка обновления книги");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBookData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="app">
            <h1>Книги</h1>
            <button className="create-book-btn" onClick={() => setIsCreateModalOpen(true)}>
                Создать книгу
            </button>
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onConfirm={createBook}
                message={
                    <>
                        <label>
                            Название
                            <input
                                type="text"
                                name="title"
                                value={newBookData.title}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Автор
                            <input
                                type="text"
                                name="author"
                                value={newBookData.author}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Издатель
                            <input
                                type="text"
                                name="publisher"
                                value={newBookData.publisher}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Страницы
                            <input
                                type="number"
                                name="pages"
                                value={newBookData.pages}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Цена
                            <input
                                type="number"
                                name="price"
                                value={newBookData.price}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Количество
                            <input
                                type="number"
                                name="amount"
                                value={newBookData.amount}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </>
                }
            />
            <div className="book-list">
                {books.map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                        onDelete={deleteBook}
                        onUpdate={updateBook}
                    />
                ))}
            </div>
            <ToastContainer />
        </div>
    );
}

export default App;