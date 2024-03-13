import asyncHandler from "express-async-handler";
import Product from "../models/ProductModel.js";
import mongoose from "mongoose";

/**
 * @description    Fetch all products
 * @route          GET /api/products
 * @access         Public
 *
 * */
export const getProducts = asyncHandler(async (req, res) => {
  const allproducts = await Product.find();
  console.log(req.params);
  //Number of products per page
  const pageSize = 9;
  const page = Number(req.query.pageNumber) || 1;

  //query by keyword
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const productCount = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.status(200).json({
    products,
    page,
    pages: Math.ceil(productCount / pageSize),
    allproducts,
  });
});

/**
 * @description    Fetch single product
 * @route          GET /api/products/:id
 * @access         Public
 *
 * */
export const getProductsBydId = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new Error("Product not Found");
  }

  const product = await Product.findById(req.params.id);

  if (product) {
    return res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

/**
 * @description    DELETE single product
 * @route          DELETE /api/products/:id
 * @access         PRIVATE/ADMIN
 *
 * */
export const deleteProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new Error("Product not Found");
  }

  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product Delete Succesful" });
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

/**
 * @description    CREATE single product
 * @route          POST /api/products
 * @access         PRIVATE/ADMIN
 *
 * */
export const createProduct = asyncHandler(async (req, res) => {
  const product = await new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.png",
    brand: "Sample Brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  }).save();

  res.status(201).json(product);
});

/**
 * @description    Update single product
 * @route          PUT /api/products/:id
 * @access         PRIVATE/ADMIN
 *
 * */
export const updateProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new Error("Product not Found");
  }

  const product = await Product.findById(req.params.id);
  if (product) {
    const {
      name,
      price,
      image,
      brand,
      category,
      countInStock,

      description,
    } = req.body;
    (product.name = name || product.name),
      (product.price = price || product.price),
      (product.image = image || product.image),
      (product.brand = brand || product.brand),
      (product.category = category || product.category),
      (product.countInStock = countInStock || product.countInStock),
      (product.description = description || product.description);

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

/**
 * @description    new  single product review
 * @route          POST /api/products/:id/reviews
 * @access         PRIVATE/
 *
 * */
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review Added" });
  }
});

/**
 * @description    get top rated products
 * @route          GET /api/products/top
 * @access         PUBLIC/
 *
 * */
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});
