import Order from '../../models/orderFormModel.js';

export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    console.log("Received order data:", orderData); // Log order data for debugging

    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();
    
    console.log("Saved order:", savedOrder); // Log the saved order

    res.status(201).json({ message: 'Confirm Your Order...', order: savedOrder });
  } catch (error) {
    console.error("Error while saving order:", error); // Log error
    res.status(500).json({ message: 'Order Not Save...', error });
  }
};

export default createOrder;