const express = require("express")
const { 
       getAllUsers, 
       addUsers, 
       getSingleUser, 
       deleteSingleUser, 
       deleteAllUser,
       userIsAdmin, 
       updateSingleUser,
       userDeactivate } = require("../controllers/userController")



const router = express.Router()

// http://localhost:5000/api/user
router
      .route("/")
      .get(getAllUsers)
      .post(addUsers)


    //   http://localhost:5000/api/user/[e2333a222]
router 
       .route("/:id")
       .get(getSingleUser)
       .put(updateSingleUser)
       .delete(deleteSingleUser)

    //    http://localhost:5000/api/user/delete-all
router 
       .route("/delete/all") 
       .delete(deleteAllUser)

    //    http://localhost:5000/api/user/isadmin/[id]
router  
       .route("/isadmin/:id")
       .put(userIsAdmin)

       // http://localhost:5000/api/user/deactivate/[id]
router  
       .route("/deactivate/:id")
       .put(userDeactivate)


module.exports= router