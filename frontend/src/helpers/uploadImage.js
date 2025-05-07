const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`;
const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset','riyaasat_product');
    const dataresponse = await fetch(url,{
        method: 'POST',
        body: formData,
    })
    return dataresponse.json()
}
export default uploadImage;