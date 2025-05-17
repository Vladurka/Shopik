import { useOrdersStore } from "@/stores/useOrdersStore";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { format } from "date-fns";
import { Navbar } from "@/components/Navbar";
import { CartItem, Order } from "@/types";

export const OrdersHistoryPage = () => {
  const { getMyOrders, orders } = useOrdersStore();
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    getMyOrders(user.id);
  }, [getMyOrders, user]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 py-10 mt-20 flex justify-center bg-black">
        <div className="w-full max-w-3xl">
          <h1 className="text-4xl font-bold text-center mb-10 text-white">
            Order History
          </h1>

          {orders.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <p className="text-gray-400 text-lg text-center">
                You don't have any orders yet.
                <br />
                Start shopping and place your first order!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order: Order, index: number) => (
                <div
                  key={order.stripeSessionId || index}
                  className="p-6 rounded-2xl shadow-xl bg-zinc-900 text-white border border-zinc-700 transition hover:shadow-2xl"
                >
                  <div className="text-center mb-5">
                    <p className="text-sm text-gray-400 mb-4">
                      Placed on &nbsp;
                      <span className="text-gray-300 font-medium">
                        {format(
                          new Date(order.createdAt),
                          "MMMM dd, yyyy HH:mm"
                        )}
                      </span>
                    </p>
                    <p className="text-2xl font-bold text-emerald-400">
                      ${order.price}
                    </p>
                  </div>

                  <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
                    <h3 className="text-md font-semibold text-center text-gray-200 mb-4 uppercase tracking-wide">
                      Products
                    </h3>
                    <div className="divide-y divide-zinc-700">
                      {(Array.isArray(order.products)
                        ? order.products
                        : [order.products]
                      ).map((item: CartItem, i: number) => (
                        <div
                          key={i}
                          className="py-2 grid grid-cols-3 text-sm text-gray-100 text-center"
                        >
                          <span className="truncate">
                            {item.product?.name ?? "Unnamed Product"}
                          </span>
                          <span className="text-gray-400">
                            {item.quantity} pcs
                          </span>
                          <span className="text-emerald-400">
                            $
                            {item.product?.price
                              ? (item.product.price * item.quantity).toFixed(2)
                              : "—"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-center text-gray-500 break-all">
                    Order ID: <span className="text-gray-400">{order._id}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
