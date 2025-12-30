const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateInvoicePDF = (order, invoiceData, filePath) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });

        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Header
        doc.fillColor('#444444')
            .fontSize(20)
            .text('E-COMMERCE INVOICE', 110, 57)
            .fontSize(10)
            .text('123 Main St, Tech City', 200, 65, { align: 'right' })
            .text('City, State, 12345', 200, 80, { align: 'right' })
            .moveDown();

        // Invoice Info
        doc.fillColor('#000000')
            .fontSize(15)
            .text(`Invoice Number: ${invoiceData.invoiceNumber}`, 50, 160)
            .fontSize(10)
            .text(`Order ID: ${order._id}`, 50, 180)
            .text(`Invoice Date: ${new Date().toLocaleDateString()}`, 50, 195)
            .text(`Customer: ${order.shippingInfo.phoneNo}`, 50, 210)
            .moveDown();

        // Table Header
        const tableTop = 250;
        doc.fontSize(10).text('Product', 50, tableTop);
        doc.text('Quantity', 250, tableTop);
        doc.text('Price', 350, tableTop);
        doc.text('Total', 450, tableTop);
        doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

        let verticalPosition = tableTop + 30;

        // Table Content
        order.orderItems.forEach(item => {
            doc.text(item.name, 50, verticalPosition);
            doc.text(item.quantity.toString(), 250, verticalPosition);
            doc.text(`$${item.price.toFixed(2)}`, 350, verticalPosition);
            doc.text(`$${(item.quantity * item.price).toFixed(2)}`, 450, verticalPosition);
            verticalPosition += 20;
        });

        // Totals
        doc.moveTo(50, verticalPosition + 5).lineTo(550, verticalPosition + 5).stroke();
        doc.fontSize(12).text(`Total Amount: $${order.totalPrice.toFixed(2)}`, 350, verticalPosition + 20, { bold: true });

        // Footer
        doc.fontSize(10).text('Thank you for your business!', 50, 700, { align: 'center', width: 500 });

        doc.end();

        stream.on('finish', () => {
            resolve(filePath);
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
};

module.exports = { generateInvoicePDF };
