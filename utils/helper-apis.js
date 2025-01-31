import apiClient from '../utils/axios-services';

const createCheckoutSession = async (items) => {
  const response = await apiClient.post('/stripe/checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items,
      success_url: 'yourapp://success',
      cancel_url: 'yourapp://cancel',
    }),
  });

  const { sessionId } = await response.json();
  return sessionId;
};

const blobToBase64 = async (imgUri) => {
  const res = await fetch(imgUri);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64data = reader.result;
      resolve({img:base64data.split(',')[1],name:blob._data.name, type:blob._data.type }); // Remove the `data:*/*;base64,` prefix
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(blob); // Converts the Blob to Base64
  });
};

export { blobToBase64 };

export default createCheckoutSession;
