import { useState, useRef } from 'react';
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
  const fileInputRef = useRef();
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

  // Layout: full-width, immersive, broad
  return (
    <div className={`min-h-screen w-full ${BG_GRADIENT} flex flex-col items-center justify-center py-0 px-0`}>
      <div className="w-full max-w-[1800px] mx-auto flex flex-col gap-12 items-center justify-center min-h-screen">
        {/* Immersive Try-On Display */}
        <div className="w-full flex flex-col lg:flex-row gap-12 items-center justify-center py-12">
          {/* Model/Avatar + Overlay */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className={`relative w-[420px] h-[650px] rounded-[3rem] ${CARD_SHADOW} bg-white/90 flex items-center justify-center border-8 border-[#64748b]/30 overflow-hidden`} style={{backdropFilter:'blur(10px)'}}>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-[#ffd700] mb-6"></div>
                  <span className="text-neutral-500 text-xl font-semibold">Loading...</span>
                </div>
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
            </div>
            {/* Fit Feedback */}
            {fitFeedback && (
              <div className="mt-4 px-6 py-3 rounded-full bg-[#ffd700]/20 text-[#b68900] font-semibold text-base shadow fade-in">{fitFeedback}</div>
            )}
            {/* Model/controls */}
            <div className="flex gap-3 mt-6 flex-wrap justify-center">
              <button className="btn-outline text-base" onClick={() => fileInputRef.current.click()}>Upload Photo</button>
              <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleImageUpload} />
              <select className="btn-outline text-base" value={selectedModel.id} onChange={e => setSelectedModel(AR_VR_MODELS.find(m => m.id === Number(e.target.value)))}>
                {AR_VR_MODELS.filter(m => m.type === '3d' || !m.type).map(model => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </select>
              <button className="btn-outline px-4 py-2 text-base" onClick={() => handleZoom(0.1)}>Zoom In</button>
              <button className="btn-outline px-4 py-2 text-base" onClick={() => handleZoom(-0.1)}>Zoom Out</button>
              <button className="btn-outline px-4 py-2 text-base" onClick={() => handleRotate(10)}>Rotate Right</button>
              <button className="btn-outline px-4 py-2 text-base" onClick={() => handleRotate(-10)}>Rotate Left</button>
              <button className="btn-outline px-4 py-2 text-base" onClick={handleReset}>Reset</button>
            </div>
          </div>
          {/* Product Details */}
          <div className="w-full max-w-sm bg-white/95 rounded-3xl shadow-2xl border-4 border-[#64748b]/30 p-10 flex flex-col items-center">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-40 h-56 object-cover rounded-2xl mb-4 border border-neutral-200 shadow" />
            <div className="font-bold text-[#23272a] text-2xl mb-2">{selectedProduct.name}</div>
            <div className="text-sm text-neutral-500 mb-1">{selectedProduct.category}</div>
            <div className="text-sm text-neutral-600 mb-1">Sizes: {selectedProduct.sizes?.join(', ')}</div>
            <div className="text-sm text-neutral-600 mb-1">Colors: {selectedProduct.colors?.join(', ')}</div>
            <div className="font-bold text-[#ffd700] text-2xl mb-4">${selectedProduct.price?.toFixed(2)}</div>
            <button className="btn bg-[#23272a] text-[#ffd700] hover:bg-[#1e293b] w-full py-3 rounded-xl font-bold shadow mb-2 text-lg" onClick={() => addToCart(selectedProduct)}>
              Add to Cart
            </button>
          </div>
        </div>
        {/* Clothing Selector Panel (carousel) */}
        <div className="w-full max-w-[1700px] mx-auto mt-8">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-3xl font-bold text-[#23272a] tracking-tight">Try a New Look</h3>
          </div>
          <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-[#64748b]/30 scrollbar-track-[#e0e7ff]/30 px-2">
            {products.map(product => (
              <div key={product.id} className={`rounded-3xl border-2 p-6 flex flex-col items-center bg-white/95 transition-all duration-200 min-w-[220px] max-w-[260px] ${selectedProduct?.id === product.id ? 'border-[#64748b]/60 scale-110 ring-2 ring-[#64748b]/60' : 'border-[#e0e7ff]/30'}`}> 
                <img src={product.image} alt={product.name} className="w-32 h-48 object-cover rounded-2xl mb-3 border border-neutral-200 shadow" />
                <div className="text-lg font-bold text-[#23272a] text-center mb-1">{product.name}</div>
                <div className="text-xs text-neutral-500 mb-1">{product.category}</div>
                <button className="btn bg-[#64748b] text-white hover:bg-[#334155] hover:text-white px-6 py-2 text-base font-bold rounded-full shadow mt-2" onClick={() => handleTryOn(product)}>
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