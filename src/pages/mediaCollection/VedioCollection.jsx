import React, { useEffect, useState } from "react";
import { deleteMedia, getVideoCollection } from "../../services/mediaServices";
import { RiDeleteBinFill } from "react-icons/ri";
import toast from "react-hot-toast";
import Modal from "../../components/modal/Modal";

const VedioCollection = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null); 
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await getVideoCollection();
        setVideos(response.data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch videos");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const totalPages = Math.ceil(videos.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVideos = videos.slice(indexOfFirstItem, indexOfLastItem);

  //  ------------------ Handle Next Page -----------------------
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // ------------------- Handle Previous Page --------------------
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // ------------------ Handle Delete Media ---------------------
  const handleDeleteMedia = async (mediaId) => {
    try {
      await deleteMedia(mediaId);
      setVideos(videos.filter((video) => video._id !== mediaId)); 
      toast.success("Video deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete video");
    }
  };

  // ------------------ Open the modal and set the selected video ID --------------------
  const handleDeleteClick = (videoId) => {
    setSelectedVideoId(videoId); 
    setIsModalOpen(true); 
  };

  // ---------------- Confirm deletion and delete the video ----------------------
  const handleConfirmDelete = () => {
    if (selectedVideoId) {
      handleDeleteMedia(selectedVideoId); 
    }
    setIsModalOpen(false); 
    setSelectedVideoId(null);
  };

  // ------------------ Cancel deletion and close the modal ----------------------
  const handleCancelDelete = () => {
    setIsModalOpen(false); 
    setSelectedVideoId(null);
  };

  return (
    <div className="bg-white w-full p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4 underline underline-offset-8 capitalize">
        Video Collection
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentVideos.map((video) => (
              <div
                key={video._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <video
                  src={video.url}
                  controls
                  className="w-full h-60 object-cover"
                />
                <div className="p-4 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Uploaded on: {new Date(video.createdAt).toLocaleDateString()}
                  </p>
                  <RiDeleteBinFill
                    className="text-red-700 cursor-pointer hover:text-red-800"
                    onClick={() => handleDeleteClick(video._id)} 
                  />
                </div>
              </div>
            ))}
          </div>

          {/*----------------- Pagination Controls ---------------- */}
          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-black hover:bg-gray-700"
              }`}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-black hover:bg-gray-700"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default VedioCollection;