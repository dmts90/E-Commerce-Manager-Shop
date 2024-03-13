import express from "express";
import { protect, admin } from "../middleware/authMiddleWare.js";

import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProducts,
  getProductsBydId,
  getTopProducts,
  updateProduct,
} from "../controllers/productController.js";
const router = express.Router();

/**
 * @description    Fetch all products
 * @route          GET /api/products
 * @access         Public
 *
 * */
router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/top").get(getTopProducts);

/**
 * @description    Fetch single product
 * @route          GET /api/products/:id
 * @access         Public
 *
 * */
router
  .route("/:id")
  .get(getProductsBydId)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

/**
 * @description    Fetch single product
 * @route          POST /api/products/:id/reviews
 * @access         PRIVATE
 *
 * */
router.route("/:id/reviews").post(protect, createProductReview);

export default router;
