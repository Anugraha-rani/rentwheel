export const API_BASE_URL = 'https://carrentalbackend-49fi.onrender.com'

export const getCarImageUrl = (filename) =>
  filename ? `${API_BASE_URL}/uploads/${filename}` : null

export const getCarImageUrls = (images = []) =>
  images.map((img) => `${API_BASE_URL}/uploads/${img}`);

export const userImageURL=(filename)=>{
  filename?`${API_BASE_URL}/uploads/${filename}`:null
}