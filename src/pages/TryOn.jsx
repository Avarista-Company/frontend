import { useState, useRef, useEffect } from 'react';
import { products } from '../data/products';
import { AR_VR_MODELS } from '../utils/constants';
import { useCart } from '../contexts/CartContext';

// Luxury color palette
const BG_GRADIENT = 'bg-gradient-to-br from-[#f8fafc] via-[#e0e7ff] to-[#fdf6e3]';
const CHARCOAL = 'bg-[#23272a]';
const GOLD = 'bg-[#ffd700]';
const NAVY = 'bg-[#1e293b]';
const CARD_SHADOW = 'shadow-[0_8px_32px_0_rgba(30,41,59,0.10)]';

const TryOn = () => {
  const [selectedModel, setSelectedModel] = useState(AR_VR_MODELS.find(m => m.type === '3d') || AR_VR_MODELS[0]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [overlay, setOverlay] = useState({ scale: 1, x: 0, y: 0, rotation: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [fitFeedback, setFitFeedback] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const fileInputRef = useRef();
  const videoRef = useRef();
  const { addToCart } = useCart();

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Overlay controls
  const handleOverlayDrag = (e) => {
    if (!selectedProduct) return;
    const startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    const startOverlay = { ...overlay };
    const move = (moveEvent) => {
      let clientX = moveEvent.type.startsWith('touch') ? moveEvent.touches[0].clientX : moveEvent.clientX;
      let clientY = moveEvent.type.startsWith('touch') ? moveEvent.touches[0].clientY : moveEvent.clientY;
      setOverlay((prev) => ({ ...prev, x: startOverlay.x + (clientX - startX), y: startOverlay.y + (clientY - startY) }));
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', move);
    window.addEventListener('touchend', up);
  };
  const handleZoom = (delta) => setOverlay((prev) => ({ ...prev, scale: Math.max(0.5, Math.min(2, prev.scale + delta)) }));
  const handleRotate = (delta) => setOverlay((prev) => ({ ...prev, rotation: prev.rotation + delta }));
  const handleReset = () => setOverlay({ scale: 1, x: 0, y: 0, rotation: 0 });

  // Simulate fit feedback (dummy logic)
  const getFitFeedback = () => {
    if (!selectedProduct || !selectedModel) return '';
    if (selectedProduct.sizes && selectedProduct.sizes.includes('L')) return 'Fits true to size';
    if (selectedProduct.sizes && selectedProduct.sizes.includes('S')) return 'Runs a bit snug';
    return 'Fit info unavailable';
  };

  // Loader for try-on
  const handleTryOn = (product) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedProduct(product);
      setIsLoading(false);
      setFitFeedback(getFitFeedback());
    }, 800);
  };

  // Camera logic
  useEffect(() => {
    let stream;
    if (isCameraActive && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(s => {
          stream = s;
          videoRef.current.srcObject = stream;
        })
        .catch(err => {
          setCameraError('Unable to access camera. Please check permissions or try a different device.');
          setIsCameraActive(false);
        });
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraActive]);

  // Layout: full-width, immersive, broad
  return (
    <div className={`min-h-screen w-full ${BG_GRADIENT} flex flex-col items-center justify-center py-0 px-0`}>
      <div className="w-full max-w-[1800px] mx-auto flex flex-col gap-16 items-center justify-center min-h-screen">
        {/* Immersive Try-On Display */}
        <div className="w-full flex flex-col lg:flex-row gap-16 items-center justify-center py-16">
          {/* Model/Avatar + Overlay */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className={`relative w-[420px] h-[650px] rounded-[3rem] ${CARD_SHADOW} bg-white/95 flex items-center justify-center border-8 border-[#64748b]/30 overflow-hidden`} style={{backdropFilter:'blur(10px)'}}>
              {/* Camera Try-On */}
              {isCameraActive ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover rounded-[3rem] fade-in"
                    style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:1}}
                  />
                  {selectedProduct && (
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="absolute left-1/2 top-1/2 object-contain drop-shadow-2xl transition-all duration-500 pointer-cursor fade-in"
                      style={{
                        zIndex: 2,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        width: `${overlay.scale * 80}%`,
                        boxShadow: '0 8px 32px 0 rgba(30,41,59,0.18)',
                        filter: 'drop-shadow(0 8px 32px #ffd70088)',
                        transform: `translate(-50%, -50%) scale(${overlay.scale}) rotate(${overlay.rotation}deg) translate(${overlay.x}px, ${overlay.y}px)`
                      }}
                      draggable={false}
                      onMouseDown={handleOverlayDrag}
                      onTouchStart={handleOverlayDrag}
                    />
                  )}
                  <button
                    className="absolute top-4 right-4 z-10 btn-outline px-4 py-2 rounded-full"
                    onClick={() => setIsCameraActive(false)}
                  >
                    Stop Camera
                  </button>
                </>
              ) : (
                <>
                  {uploadedImage ? (
                    <img src={uploadedImage} alt="User" className="w-full h-full object-cover rounded-[3rem] fade-in" />
                  ) : (
                    <img src={selectedModel.image} alt={selectedModel.name} className="w-full h-full object-cover rounded-[3rem] fade-in" />
                  )}
                  {/* Clothing Overlay with fade-in and shadow */}
                  {selectedProduct && (
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="absolute left-1/2 top-1/2 object-contain drop-shadow-2xl transition-all duration-500 pointer-cursor fade-in"
                      style={{
                        width: `${overlay.scale * 80}%`,
                        boxShadow: '0 8px 32px 0 rgba(30,41,59,0.18)',
                        filter: 'drop-shadow(0 8px 32px #ffd70088)',
                        transform: `translate(-50%, -50%) scale(${overlay.scale}) rotate(${overlay.rotation}deg) translate(${overlay.x}px, ${overlay.y}px)`
                      }}
                      draggable={false}
                      onMouseDown={handleOverlayDrag}
                      onTouchStart={handleOverlayDrag}
                    />
                  )}
                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 pointer-events-none rounded-[3rem] bg-gradient-to-t from-white/30 via-transparent to-white/10 opacity-60" />
                </>
              )}
              {/* Camera error fallback */}
              {cameraError && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20 rounded-[3rem]">
                  <span className="text-red-500 font-semibold text-lg">{cameraError}</span>
                </div>
              )}
            </div>
            {/* Camera controls */}
            <div className="flex gap-4 mt-6">
              <button
                className="btn-primary px-6 py-2 rounded-full"
                onClick={() => setIsCameraActive(true)}
                disabled={isCameraActive}
              >
                {isCameraActive ? 'Camera Active' : 'Start Camera Try-On'}
              </button>
              <button
                className="btn-outline px-6 py-2 rounded-full"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                disabled={isCameraActive}
              >
                Upload Photo
              </button>
            </div>
            {/* Fit Feedback */}
            {fitFeedback && (
              <div className="mt-6 px-8 py-4 rounded-full bg-[#ffd700]/20 text-[#b68900] font-semibold text-lg shadow fade-in">{fitFeedback}</div>
            )}
            {/* Model/controls */}
            <div className="flex gap-4 mt-8 flex-wrap justify-center">
              <select className="btn-outline text-base px-6 py-2 rounded-full" value={selectedModel.id} onChange={e => setSelectedModel(AR_VR_MODELS.find(m => m.id === Number(e.target.value)))}>
                {AR_VR_MODELS.filter(m => m.type === '3d' || !m.type).map(model => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </select>
              <button className="btn-outline px-6 py-2 text-base rounded-full" onClick={() => handleZoom(0.1)}>Zoom In</button>
              <button className="btn-outline px-6 py-2 text-base rounded-full" onClick={() => handleZoom(-0.1)}>Zoom Out</button>
              <button className="btn-outline px-6 py-2 text-base rounded-full" onClick={() => handleRotate(10)}>Rotate Right</button>
              <button className="btn-outline px-6 py-2 text-base rounded-full" onClick={() => handleRotate(-10)}>Rotate Left</button>
              <button className="btn-outline px-6 py-2 text-base rounded-full" onClick={handleReset}>Reset</button>
            </div>
          </div>
          {/* Product Details */}
          <div className="w-full max-w-sm bg-white/95 rounded-3xl shadow-2xl border-4 border-[#64748b]/30 p-12 flex flex-col items-center">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-40 h-56 object-cover rounded-2xl mb-6 border border-neutral-200 shadow" />
            <div className="font-bold text-[#23272a] text-2xl mb-2 text-center">{selectedProduct.name}</div>
            <div className="text-sm text-neutral-500 mb-1 text-center">{selectedProduct.category}</div>
            <div className="text-sm text-neutral-600 mb-1 text-center">Sizes: {selectedProduct.sizes?.join(', ')}</div>
            <div className="text-sm text-neutral-600 mb-1 text-center">Colors: {selectedProduct.colors?.join(', ')}</div>
            <div className="font-bold text-[#ffd700] text-2xl mb-6 text-center">₹{selectedProduct.price?.toFixed(2)}</div>
            <button className="btn bg-[#23272a] text-[#ffd700] hover:bg-[#1e293b] w-full py-3 rounded-xl font-bold shadow mb-2 text-lg" onClick={() => addToCart(selectedProduct)}>
              Add to Cart
            </button>
          </div>
        </div>
        {/* Clothing Selector Panel (carousel) */}
        <div className="w-full max-w-[1700px] mx-auto mt-12">
          <div className="flex items-center justify-between mb-6 px-2">
            <h3 className="text-3xl font-bold text-[#23272a] tracking-tight">Try a New Look</h3>
          </div>
          <div className="flex gap-10 overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-[#64748b]/30 scrollbar-track-[#e0e7ff]/30 px-2">
            {products.map(product => (
              <div key={product.id} className={`rounded-3xl border-2 p-8 flex flex-col items-center bg-white/95 transition-all duration-200 min-w-[220px] max-w-[260px] ${selectedProduct?.id === product.id ? 'border-[#64748b]/60 scale-110 ring-2 ring-[#64748b]/60' : 'border-[#e0e7ff]/30'}`}> 
                <img src={product.image} alt={product.name} className="w-32 h-48 object-cover rounded-2xl mb-4 border border-neutral-200 shadow" />
                <div className="text-lg font-bold text-[#23272a] text-center mb-1">{product.name}</div>
                <div className="text-xs text-neutral-500 mb-1 text-center">{product.category}</div>
                <button className="btn bg-[#64748b] text-white hover:bg-[#334155] hover:text-white px-8 py-2 text-base font-bold rounded-full shadow mt-2" onClick={() => handleTryOn(product)}>
                  Try Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOn;