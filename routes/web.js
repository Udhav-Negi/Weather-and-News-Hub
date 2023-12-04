import express from 'express';
const router = express.Router();
import Controller from '../controllers/userController.js';
import NewsController from '../controllers/newsController.js';
import auth from '../authorization/auth.js';





//This is actual
router.get('/', Controller.defaultGet)
router.get('/login', auth, Controller.logIn)
router.post('/login', Controller.logInPost)
router.get('/signup', Controller.signUp)
router.post('/signup', Controller.signUpPost);
router.get('/weather', auth, Controller.weatherGet);
router.get('/back', auth,  Controller.back);
router.get('/contact', Controller.contact)
router.post('/query', Controller.query)



router.get('/business', auth, NewsController.business);
router.get('/entertainment', auth, NewsController.entertainment);
router.get('/general', auth, NewsController.general);
router.get('/health', auth, NewsController.health);
router.get('/science',auth,  NewsController.science);
router.get('/sports', auth, NewsController.sports);
router.get('/technology',auth, NewsController.technology);
router.get('/logout', NewsController.logout);




export default router;