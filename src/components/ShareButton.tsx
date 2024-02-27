
const ShareButton: React.FC = () => {
  const shareOnWhatsApp = () => {
    const text = "Check out this amazing page!";
    const url = typeof window !== 'undefined' ? window.location.href : ''; // Gets the current page URL safely
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;

    window.open(whatsappUrl, '_blank');
  };

  const sharePage = async () => {
    const shareData = {
      title: 'Amazing Page',
      text: 'Check out this amazing page!',
      url: typeof window !== 'undefined' ? window.location.href : '', // Current page URL
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        shareOnWhatsApp(); // Fallback to WhatsApp if Web Share API is not supported
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <button
      onClick={shareOnWhatsApp}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
    >
      مشاركة
    </button>
  );
};

export default ShareButton;
