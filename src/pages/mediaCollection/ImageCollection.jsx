import React, { useEffect, useState } from "react";
import { deleteMedia, getImageCollection } from "../../services/mediaServices";
import { RiDeleteBinFill } from "react-icons/ri";
import toast from "react-hot-toast";
import Modal from "../../components/modal/Modal"; 


const ImageCollection = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedImageId, setSelectedImageId] = useState(null); 
  const itemsPerPage = 8;

  // ----------------- Fetch images on component mount -------------------
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await getImageCollection();
        setImages(response.data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch images");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const totalPages = Math.ceil(images.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentImages = images.slice(indexOfFirstItem, indexOfLastItem);

  // ---------------- Handle next page --------------------
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // ------------------- Handle previous page -------------------
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // ----------------- Handle delete media --------------------
  const handleDeleteMedia = async (mediaId) => {
    try {
      await deleteMedia(mediaId);
      setImages(images.filter((image) => image._id !== mediaId)); 
      toast.success("Image deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete image");
    }
  };

  // ---------------- Open modal and set selected image ID --------------------
  const handleDeleteClick = (imageId) => {
    setSelectedImageId(imageId); 
    setIsModalOpen(true); 
  };

  // --------------- Confirm deletion --------------------
  const handleConfirmDelete = () => {
    if (selectedImageId) {
      handleDeleteMedia(selectedImageId); 
    }
    setIsModalOpen(false); 
    setSelectedImageId(null);
  };

  // ----------------- Cancel deletion -------------------
  const handleCancelDelete = () => {
    setIsModalOpen(false); 
    setSelectedImageId(null);
  };


  return (
    <div className="bg-white w-full p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-6 underline underline-offset-8 capitalize">
        Image Collection
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentImages.map((image) => (
          <div
            key={image._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={image.url}
              alt="Media"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Uploaded on: {new Date(image.createdAt).toLocaleDateString()}
              </p>
              <RiDeleteBinFill
                className="text-red-700 cursor-pointer hover:text-red-800"
                onClick={() => handleDeleteClick(image._id)} 
              />
            </div>
          </div>
        ))}
      </div>

      {/* ------------------ Pagination Controls -------------------- */}
      <div className="flex justify-center items-center space-x-4 mt-16">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
        >
          Next
        </button>
      </div>

      {/* --------------- Delete Confirmation Modal ------------------ */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ImageCollection;