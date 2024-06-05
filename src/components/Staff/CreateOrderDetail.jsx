import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCatalog } from '../../store/slices/dishSlice';
import { createOrderDetail } from '../../store/slices/orderSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegCheckCircle } from 'react-icons/fa';

const CreateOrderDetail = ({ onDetailCreated }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const catalog = useSelector((state) => state.dishes.catalog);
  const { handleSubmit } = useForm();
  const [selectedProducts, setSelectedProducts] = useState({});

  useEffect(() => {
    dispatch(fetchCatalog());
  }, [dispatch]);

  const handleProductSelect = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts[product.id]) {
        const updatedProducts = { ...prevSelectedProducts };
        delete updatedProducts[product.id];
        return updatedProducts;
      } else {
        return { ...prevSelectedProducts, [product.id]: { ...product, quantity: 1 } };
      }
    });
  };

  const handleQuantityChange = (productID, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 99) {
      setSelectedProducts((prevSelectedProducts) => {
        const updatedProducts = { ...prevSelectedProducts };
        delete updatedProducts[productID];
        return updatedProducts;
      });
    } else {
      setSelectedProducts((prevSelectedProducts) => ({
        ...prevSelectedProducts,
        [productID]: { ...prevSelectedProducts[productID], quantity: newQuantity }
      }));
    }
  };

  const onSubmit = async () => {
    const selectedEntries = Object.entries(selectedProducts);

    if (selectedEntries.length === 0) {
      toast.error('Bạn phải chọn ít nhất một sản phẩm');
      return;
    }

    try {
      const promises = selectedEntries.map(([productID, { quantity }]) => {
        return dispatch(createOrderDetail({ orderID: id, productID: parseInt(productID, 10), quantity }));
      });

      await Promise.all(promises);
      toast.success('Chi tiết đơn hàng đã được tạo thành công');
      setSelectedProducts({});
      onDetailCreated();
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi tạo chi tiết đơn hàng');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto bg-amber-200 items-center px-4 mt-5 py-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-2xl font-beVn italic font-bold mb-2">
            Chọn Sản Phẩm:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {catalog.map((product) => (
              <div
                key={product.id}
                className={`relative cursor-pointer p-2 ${selectedProducts[product.id] ? 'border-red-500 border-4' : 'border-gray-300'} rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out`}
                onClick={() => handleProductSelect(product)}
              >
                <div className="flex flex-col items-center ms:flex-row">
                  <img src={product.image} alt={product.name} className="w-40 h-28 object-cover rounded-lg ms:mr-4" />

                  <div className="ms:w-1/2">
                    <p className="lg:hidden ms:block text-center mt-1 text-sm text-gray-600">{product.description}</p>

                    <p className="text-center mt-2 font-beVn font-semibold text-gray-700">{product.name}</p>
                    <p className="text-center mt-2 font-beVn font-semibold text-gray-700">{product.price.toLocaleString()}đ</p>


                  </div>

                </div>



                {selectedProducts[product.id] && (
                  <div className="absolute top-0 right-0 p-1 bg-green-500 text-white rounded-full">
                    <FaRegCheckCircle />
                  </div>
                )}
                {selectedProducts[product.id] && selectedProducts[product.id].quantity > 0 && (
                  <div className="flex items-center justify-center mt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(product.id, selectedProducts[product.id].quantity - 1);
                      }}
                      className="px-2 py-1 bg-red-500 text-white rounded-lg"
                    >
                      -
                    </button>
                    <span className="mx-2">{selectedProducts[product.id].quantity}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(product.id, selectedProducts[product.id].quantity + 1);
                      }}
                      className="px-2 py-1 bg-red-500 text-white rounded-lg"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Tạo món
          </button>
        </div>
      </form>


      <ToastContainer />
    </div>
  );
};

export default CreateOrderDetail;
