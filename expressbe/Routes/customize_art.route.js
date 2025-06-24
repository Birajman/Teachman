const router = require("express").Router();
const CustomizeArtController = require("../Api/controller/customize_art.controller");
const AuthCheck = require("../Api/middleware/auth_middleware");
let customize_art_ctrl = new CustomizeArtController();


router.get("/trash-list", AuthCheck, customize_art_ctrl.getTrashList);
router
  .route("/bulk-delete")
  .post(AuthCheck, customize_art_ctrl.deleteCustomizeArt);

router
  .route("/move-to-trash")
  .post(AuthCheck, customize_art_ctrl.trashCustomizeArt);
router
  .route("/restore")
  .post(AuthCheck, customize_art_ctrl.reStoreCustomizeArt);


router
  .route("/")
  .post(AuthCheck, customize_art_ctrl.createCustomizeArt)
  .get(customize_art_ctrl.getUserCustomizeArt);

router
  .route("/:id")
  .get(customize_art_ctrl.getCustomizeByID)
  .put(AuthCheck, customize_art_ctrl.updateCustomizeArt);





module.exports = router;
