const express=require('express')
const router = express.Router();
const eventController=require('../controllers/eventController')
router.post('/create_event',eventController.createEvent)
router.get('/get-data',eventController.getEvent)
module.exports = router