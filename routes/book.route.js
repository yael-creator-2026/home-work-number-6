  const bookController = require('../controllers/book.controller');
  const express = require('express');
  const router = express.Router();


router.get('/', bookController.getAll);
router.get('/:id/search', bookController.searckBookByName);
router.get('/:id', bookController.getBookByID);
router.post('/', bookController.addBook);
router.post('/:id/borrow', bookController.takeBook);
router.post('/:id/return', bookController.returnBook);
router.delete('/:id', bookController.deleteTheBook);


module.exports = router;

