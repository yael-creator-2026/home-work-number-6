  const getAll =(req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedBooks = books.slice(startIndex, endIndex);
  res.json({
    totalBooks: books.length,      
    totalPages: Math.ceil(books.length / limit), 
    books: paginatedBooks          
  });
};
//קבלת ספר לפי מזהה
const getBookByID = (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ error: 'לא  במערכת' });
  }
  res.json(book);
};
//     הוספת ספר חדש למערכת
const addBook= (req, res) => {
  const newId = books.length > 0 ? books[books.length - 1].id + 1 : 1;
  const newBook = {
    id: newId,
    title: req.body.title,
    category: req.body.category,
    price: req.body.price,
    isBorrowed: false,
    borrowHistory: []     
  };
  books.push(newBook);
  res.status(201).json(newBook);
};

//השאלת ספר
 const takeBook = (req, res) => {
  const bookId = parseInt(req.params.id);
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error:' חובה לתת קוד משתמש לצורך ביצוע השאלה' });
  }

  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ error: 'הספר המבוקש לא נמצא במערכת' });
  }
  if (book.isBorrowed) {
    return res.status(400).json({ error: 'הספר כבר מושאל לאחר ואינו פנוי כרגע' });
  }
  const userExists = users.some(u => u.id === userId);
  if (!userExists) {
    return res.status(404).json({ error: 'המשתמש  לא קיים ' });
}
  book.isBorrowed = true;

  const borrowRecord = {
    userId: userId,
    borrowDate: new Date().toISOString().split('T')[0] // לוקח את התאריך הנוכחי בפורמט YYYY-MM-DD
  };
  book.borrowHistory.push(borrowRecord);
  res.json({
    message: 'הספר הושאל ',
    book: book
  });
};
//החזרת ספר
const returnBook =(req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ error: 'הספר לא במערכת' });
  }
  if (!book.isBorrowed) {
    return res.status(400).json({ error: 'הספר לא מושאל כרגע' });
  }
  book.isBorrowed = false;

  res.json({
    message: 'ההחזרה בוצעה בהצלחה',
    book: book
  });
};
//מחיקת ספר

const deleteTheBook =(req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'הספר המבוקש לא נמצא במערכת, ולכן לא ניתן למחוק אותו' });
  }
  const deletedBook = books.splice(bookIndex, 1)[0];
  res.json({
    message: 'המחיקה בוצעה בהצלחה',
    deletedBook: deletedBook
  });
};
//חיפוש ספר לפי שם
const searckBookByName =  (req, res) => {
  const searchTitle = req.query.title;
  if (!searchTitle) {
    return res.status(400).json({ error: 'לא ידוע מיהו הספר המבוקש' });
  }
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTitle.toLowerCase())
  );
  if (filteredBooks.length === 0) {
    return res.status(404).json({ message: 'לא נמצאו ספרים התואמים לחיפוש שלך' });
  }
  res.json(filteredBooks);
};

module.exports = {
  getAll,
  getBookByID,
  addBook,
  takeBook,
  returnBook,
  deleteTheBook,
  searckBookByName
};