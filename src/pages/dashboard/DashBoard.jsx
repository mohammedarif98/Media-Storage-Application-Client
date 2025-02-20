import React, { useState, useRef, useEffect } from 'react';
import { IoVideocamSharp } from "react-icons/io5";
import { IoMdImages } from "react-icons/io";
import { uploadMedia } from '../../services/mediaServices';
import { getUserProfile } from '../../services/authServices';
import toast from 'react-hot-toast';

const DashBoard = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef();
  const [user, setUser] = useState(null); 
  const [mediaData, setMediaData] = useState({
    totalMedia: 0,
    totalImages: 0,
    totalVideos: 0,
  });

  const maxSize = 100 * 1024 * 1024; // 100MB

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.size > maxSize) {
      setError('File size exceeds 100MB limit.');
      e.target.value = ''; 
      return;
    }

    setError(null);
    setFile(selectedFile);
  };

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.user);
        setMediaData({
          totalMedia: response.totalMedia,
          totalImages: response.totalImages,
          totalVideos: response.totalVideos,
        });
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle media upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await uploadMedia(formData);
      toast.success(response?.message || "Upload successful!");
      setFile(null);
      fileInputRef.current.value = ''; 

      // Refresh media data after upload
      const profileResponse = await getUserProfile();
      setUser(profileResponse.user);
      setMediaData({
        totalMedia: profileResponse.totalMedia,
        totalImages: profileResponse.totalImages,
        totalVideos: profileResponse.totalVideos,
      });
    } catch (error) {
      toast.error(error.message);
      setError(error.message || 'Failed to upload media. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white w-full p-6 space-y-6 mx-auto'>
      {/* User Information */}
      {user && (
        <div className="bg-gray-800 py-8 px-4 rounded-md shadow">
          <h2 className="text-lg font-bold text-white capitalize">Welcome, {user.username}</h2>
        </div>
      )}

      {/* Media Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="py-2 px-4 flex justify-between items-center rounded-sm shadow-sm h-20 bg-emerald-700">
          <div className='flex flex-col items-center'>
            <h2 className="text-white font-bold">Total Media</h2>
          </div>
          <p className="text-xl text-white font-bold">{mediaData.totalMedia}</p>
        </div>

        <div className="py-2 px-4 flex justify-between items-center rounded-sm shadow-sm h-20 bg-cyan-800">
          <div className='flex flex-col items-center'>
            <span className='text-white text-2xl'><IoMdImages /></span>
            <h2 className="text-white font-bold">Images</h2>
          </div>
          <p className="text-xl text-white font-bold">{mediaData.totalImages}</p>
        </div>

        <div className="py-2 px-4 flex justify-between items-center rounded-sm shadow-sm h-20 bg-fuchsia-900">
          <div className='flex flex-col items-center'>
            <span className='text-white text-2xl'><IoVideocamSharp /></span>
            <h2 className="text-white font-bold">Videos</h2>
          </div>
          <p className="text-xl text-white font-bold">{mediaData.totalVideos}</p>
        </div>
      </div>

      {/* Media Upload Form */}
      <div className="upload-media-container bg-gray-200 p-6 rounded-lg shadow-sm">
        <h2 className='text-2xl mb-4 font-semibold text-gray-700'>Upload Media Here</h2>

        <form onSubmit={handleSubmit}>
          <fieldset disabled={loading} className='space-y-4'>
            <div className="form-group">
              <label
                htmlFor="file"
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Choose a file (JPEG, PNG, WEBP, MP4)
              </label>
              <input
                type="file"
                id="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
              />
            </div>

            {file && (
              <p className='text-sm text-gray-600 mt-2'>
                Selected file: <span className='font-medium'>{file.name}</span>
                ({Math.round(file.size / 1024)} KB)
              </p>
            )}

            <button
              type="submit"
              className={`w-full px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-black hover:bg-gray-700'
              }`}
            >
              {loading ? 'Uploading...' : 'Upload Media'}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default DashBoard;
