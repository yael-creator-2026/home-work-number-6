// 1. הצגת כל המשתמשים
const getAllUsers = (req, res) => {
  res.json(users);
};

//הרשמה
const signUp = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'חובה לספק שם משתמש וסיסמה' });
  }

  //בדיקה האם המשתמש כבר קיים במערכת
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ error: 'שם המשתמש כבר קיים במערכת' });
  }
  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    username,
    password,
    borrowedBooks: []
  };

  users.push(newUser);
  res.status(201).json({ message: 'המשתמש נרשם בהצלחה! 👤', user: newUser });
};

//התחברות לאתר
const signIn =  (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'חובה לספק שם משתמש וסיסמה' });
  }

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'שם משתמש או סיסמה שגויים' });
  }

  res.json({ message: 'התחברת בהצלחה! 🎉', user });
};

module.exports = {
  getAllUsers,
  signUp,
  signIn
};