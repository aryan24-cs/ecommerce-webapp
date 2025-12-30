const Order = require('../models/Order');
const Product = require('../models/Product');
const Invoice = require('../models/Invoice');
const { generateInvoicePDF } = require('../utils/pdfGenerator');
const path = require('path');
const fs = require('fs');

// Create a new order   =>   /api/v1/order/new
exports.newOrder = async (req, res, next) => {
    try {
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body;

        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id
        });

        // Generate Invoice
        const invoiceNumber = `INV-${Date.now()}`;
        const invoicePath = path.join(__dirname, '..', 'uploads', `invoice-${invoiceNumber}.pdf`);

        await generateInvoicePDF(order, { invoiceNumber }, invoicePath);

        await Invoice.create({
            order: order._id,
            user: req.user._id,
            invoiceNumber,
            filePath: `uploads/invoice-${invoiceNumber}.pdf`,
            totalAmount: totalPrice
        });

        res.status(201).json({
            success: true,
            order,
            invoiceNumber
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get single order   =>   /api/v1/order/:id
exports.getSingleOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        return res.status(404).json({ message: 'No Order found with this ID' });
    }

    res.status(200).json({
        success: true,
        order
    });
};

// Get logged in user orders   =>   /api/v1/orders/me
exports.myOrders = async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        orders
    });
};

// Get all orders - ADMIN   =>   /api/v1/admin/orders
exports.allOrders = async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
};

// Update / Process order - ADMIN   =>   /api/v1/admin/order/:id
exports.updateOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (order.orderStatus === 'Delivered') {
        return res.status(400).json({ message: 'You have already delivered this order' });
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity);
    });

    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({
        success: true
    });
};

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false });
}

// Download Invoice   =>   /api/v1/order/invoice/:id
exports.downloadInvoice = async (req, res, next) => {
    const invoice = await Invoice.findOne({ order: req.params.id });

    if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
    }

    const filePath = path.join(__dirname, '..', invoice.filePath);
    res.download(filePath);
};
