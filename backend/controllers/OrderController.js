import asyncHandler from "express-async-handler";
import Order from "../models/OrderModel.js";
import mongoose from "mongoose";

/**
 * @description    Create new order
 * @route          POST /api/orders
 * @access         Private
 *
 * */
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user,
  } = req.body;

  if (!orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user,
    });
    const createdOrder = await order.save();
    res.status(200).json(createdOrder);
  }
});

/**
 * @description    GET order by ID
 * @route         GET /api/orders/id
 * @access         Private
 *
 * */
export const getOrderById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new Error("Order not Found");
  }

  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

/**
 * @description    Update order to paid
 * @route         PUT /api/orders/:id/pay
 * @access         Private
 *
 * */
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new Error("Order not Found");
  }

  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

/**
 * @description    Get logged in user orders
 * @route         GET /api/orders/myorders
 * @access         Private
 *
 * */
export const getMyOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (err) {
    throw new Error("Ooops Error finding Orders");
  }
});

/**
 * @description    Get all orders
 * @route         GET /api/orders
 * @access         Private/ADMIN
 *
 * */
export const getOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
  } catch (err) {
    throw new Error("Ooops Error finding Orders");
  }
});

/**
 * @description    Update order to delivered
 * @route         PUT /api/orders/:id/delivered
 * @access         Private/admin
 *
 * */
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new Error("Order not Found");
  }

  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});
