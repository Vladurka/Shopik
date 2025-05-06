import { useEffect, useState } from "react";
import { useAnalyticsStore } from "@/stores/useAnalyticsStore";
import { useProductStore } from "@/stores/useProductStore";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Loader, Trash2 } from "lucide-react";

export const DashboardPage = () => {
  const {
    getAnalytics,
    users,
    products,
    sales,
    revenue,
    dailySales,
    isLoading,
  } = useAnalyticsStore();

  const [file, setFile] = useState<File | null>(null);
  const { addProduct } = useProductStore();

  useEffect(() => {
    getAnalytics();
  }, [getAnalytics]);

  const handleAddProduct = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await addProduct(formData);
    setFile(null);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-white-500 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <div className="min-h-screen px-4 lg:px-16 py-8 text-white bg-gradient-to-b from-zinc-900 to-black mt-32">
          <h1 className="text-3xl font-bold text-center mb-10">
            📊 Admin Analytics
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            <Card label="Users" value={users} />
            <Card label="Products" value={products} />
            <Card label="Total Sales" value={sales} />
            <Card label="Revenue" value={`$${revenue.toFixed(2)}`} />
          </div>

          <div className="bg-zinc-800 rounded-xl p-6 shadow-lg max-w-6xl mx-auto mb-12">
            <h2 className="text-xl font-semibold mb-6 text-center">
              Sales (Last 7 Days)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="date" tick={{ fill: "#ccc", fontSize: 12 }} />
                <YAxis tick={{ fill: "#ccc" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#222", border: "none" }}
                  labelStyle={{ color: "#fff" }}
                  formatter={(value: any) =>
                    typeof value === "number" ? `$${value.toFixed(2)}` : value
                  }
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#38bdf8"
                  strokeWidth={3}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-zinc-800 rounded-xl p-6 shadow-lg max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-6 text-center">
              📥 Upload Product File
            </h2>

            <div className="flex flex-col items-center gap-5">
              <label
                htmlFor="productFile"
                className="w-full cursor-pointer flex items-center justify-center p-6 border-2 border-dashed border-zinc-600 rounded-lg bg-zinc-700 hover:border-blue-400 transition "
              >
                <span className="text-gray-300">
                  Click or drag a file to upload
                </span>
              </label>
              <input
                type="file"
                id="productFile"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
              {file && (
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <span>
                    Selected file:{" "}
                    <span className="font-semibold">{file.name}</span>
                  </span>
                  <button
                    onClick={() => setFile(null)}
                    className="text-red-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={handleAddProduct}
                disabled={!file}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const Card = ({ label, value }: { label: string; value: number | string }) => (
  <div className="bg-zinc-800 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition">
    <p className="text-sm text-zinc-400 mb-1">{label}</p>
    <p className="text-2xl font-semibold text-white">{value}</p>
  </div>
);
