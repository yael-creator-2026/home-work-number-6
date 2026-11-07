// Middleware 1: מוסיף את התאריך הנוכחי לאובייקט הבקשה (req) עבור כל הבקשות
const addCurrentDate = (req, res, next) => {
    req.currentDate = new Date(); // או פורמט תאריך אחר שתרצי
    next(); // ממשיכים הלאה בשרשרת
};

// Middleware 2: מודפס רק עבור בקשות מסוג GET
const logGetRequestDate = (req, res, next) => {
    if (req.method === 'GET') {
        console.log(`[GET Request] התאריך והשעה של הבקשה: ${req.currentDate}`);
    }
    next(); // ממשיכים הלאה לבקשה עצמה
};

module.exports = {
    addCurrentDate,
    logGetRequestDate
};