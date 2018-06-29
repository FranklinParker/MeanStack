const express = require("express");
const multerUpload = require('../middleware/file').multerUpload;
const checkAuth = require('../middleware/check-auth');
const postController = require('../controllers/postController');

const router = express.Router();

router.post(
  "",
  checkAuth,
  multerUpload,
  postController.savePost
);

router.put(
  "/:id",
  checkAuth,
  multerUpload,
  postController.updatePost
);

router.get("", postController.getPosts);

router.get("/:id", postController.getPost);

router.delete("/:id", checkAuth, postController.deletePost);



module.exports = router;