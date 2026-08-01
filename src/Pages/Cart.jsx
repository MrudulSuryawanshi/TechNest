import React from "react";
import { useCart } from "../Context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">

      <div className="w-[1080px] mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Shopping Cart
        </h1>

        <p className="text-gray-500 mt-1">
          {totalQuantity} item{totalQuantity !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="w-full bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mt-2">
            Add some products to your cart.
          </p>
        </div>
      ) : (
        <div className="w-[1080px] mx-auto flex gap-[30px]">

          <div className="w-[600px] space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-100 p-4"
              >
                <div className="flex items-center gap-4">

                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-gray-900 truncate">
                      {item.name}
                    </h2>

                    <p className="text-xs text-gray-400 uppercase tracking-wide mt-0.5">
                      {item.category}
                    </p>

                    <p className="text-blue-600 font-bold mt-2">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-7 h-7 hover:bg-gray-100 text-gray-700 font-semibold"
                    >
                      −
                    </button>

                    <span className="w-8 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-7 h-7 hover:bg-gray-100 text-gray-700 font-semibold"
                    >
                      +
                    </button>
                  </div>

                  <div className="hidden sm:block w-24 text-right">
                    <p className="font-bold text-gray-900">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-500 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>

                <div className="sm:hidden text-right mt-3 border-t pt-3">
                  <span className="text-sm text-gray-500">
                    Item Total:{" "}
                  </span>

                  <span className="font-bold text-gray-900">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="w-[450px] bg-white rounded-xl border border-gray-100 p-6 h-fit sticky top-24">

            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between text-gray-600">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Total Quantity</span>
                <span>{totalQuantity}</span>
              </div>

              <div className="border-t pt-4 flex justify-between">
                <span className="font-semibold text-gray-900">
                  Total
                </span>

                <span className="text-xl font-bold text-blue-600">
                  ₹{totalPrice}
                </span>
              </div>

            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 mt-6 font-semibold transition">
              Proceed to Checkout
            </button>

          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;