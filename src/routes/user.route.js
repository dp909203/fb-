const express = require("express")
const router = express.Router()

const user_controller = require('../controller/user.controller');
const post_controller = require('../controller/post.controller')
const upload = require('../middelware/upload')
const auth = require('../middelware/authantication')
const register_uploadImage = require('../middelware/register_uploadImage')


router.post('/register', register_uploadImage, user_controller.register);
router.post('/login', user_controller.login);
router.post('/logout', user_controller.logout);
router.put('/reset', user_controller.reset_password);
router.delete('/delete_user', auth, user_controller.delete_user);

router.post('/post', auth, upload, post_controller.createPost);

/**
 * @swagger
 * /api/get:
 *   get:
 *     summary: This API is used to check
 *     description: Get something
 *     responses:
 *       200:
 *         description: Success
 */


router.get('/get', (req, res) => {
    res.send("hello bhsbh ");
});
router.get('/get_all_post', post_controller.get_all_Post);
router.get('/get_post', post_controller.get_Post);
router.get('/get_user_post', post_controller.get_user_post);
router.put('/update_post', auth, post_controller.update_post);
router.delete('/delete_post', auth, post_controller.delete_post);



module.exports = router;