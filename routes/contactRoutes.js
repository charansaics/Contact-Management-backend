import express from "express";
import { createContact, deleteContact, getAllContacts, getContact, updateContact } from "../controllers/contactController.js";
import { validateToken } from "../middlewares/validateTokenHandler.js";

export const router = express.Router();
router.use(validateToken);
router.route("/").get(getAllContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

