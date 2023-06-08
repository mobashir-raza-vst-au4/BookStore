// routes/books.js

const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const User = require("../models/user");
const Order = require("../models/order");

// Create a book order for a user
router.post("/order", async (req, res) => {
  try {
    const { userId, items } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate the total price of all items
    const totalPrice = items.reduce((total, curr) => {
      // const item = items.find((item) => item._id === curr._id);
      return total + curr.price;
    }, 0);

    // Check if the user has enough points to cover the total price
    if (user.points < totalPrice) {
      return res.status(400).json({ message: "Insufficient points" });
    }

    // Deduct the points from the user's account
    user.points -= totalPrice;

    // Create an array of order objects
    const orders = items.map((item) => ({
      user: userId,
      book: item._id,
    }));

    console.log("orders", orders)
    // Insert the orders into the database using insertMany
    const createdOrders = await Order.insertMany(orders);

    // Save the updated user with deducted points
    const updatedUser = await user.save();

    res
      .status(200)
      .json({ message: "Orders created successfully", orders: createdOrders, user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Cancel a book order for a user
router.post("/cancel-order", async (req, res) => {
  try {
    const { orderId } = req.body;

    // Find the order by orderId
    const order = await Order.findById(orderId)
      .populate("user")
      .populate("book");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the order is already cancelled
    if (order.status === "cancelled") {
      return res.status(400).json({ message: "Order is already cancelled" });
    }

    // Update the order status to 'cancelled'
    order.status = "cancelled";

    // Calculate the points to be returned to the user
    const pointsToReturn = order.book.price;

    // Return the points to the user
    order.user.points += pointsToReturn;

    // Save the updated order and user
    await Promise.all([order.save(), order.user.save()]);

    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get the list of buy history for a user
router.get("/user/:id/buy-history", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by id
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the buy history for the user
    const buyHistory = await Order.find({ user: id, status: "completed" })
      .populate("book", "title writer coverImage price")
      .sort({ orderDate: -1 });

    res.status(200).json({ buyHistory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update the status of an order
router.put("/order/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    //check order should be pending, completed, cancelled
    // Find the order by orderId
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the status of the order
    order.status = status;

    // Save the updated order
    await order.save();

    res.status(200).json({ message: "Order status updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
