import React, { useState, useEffect } from 'react';

export default function Admin() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  useEffect(() => {
    // Generate the link
    const baseUrl = window.location.origin;
    
    // Create query param
    const encodedPrefix = encodeURIComponent(prefix);
    const encodedName = encodeURIComponent(guestName.trim());
    
    const link = guestName.trim() 
      ? `${baseUrl}?prefix=${encodedPrefix}&name=${encodedName}`
      : '';
      
    setGeneratedLink(link);

    const message = `Dear ${prefix} ${guestName.trim()} ❤️\n\nWith joyful hearts, we warmly invite you and your family to celebrate one of the most special days of our lives as we begin our journey together.\n\nPlease view our wedding invitation and all the event details through the link below 🌐:\n\n${link}\n\nYour presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.\n\nWith love,\n❤️ Dhananjaya & Hansi`;
    
    setGeneratedMessage(message);
    setCopiedLink(false);
    setCopiedMessage(false);
  }, [prefix, guestName]);

  const handleCopyLink = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyMessage = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  return (
    <div className="h-[100dvh] w-full overflow-y-auto bg-[#fdfaf5] font-montserrat smooth-mobile-scroll p-4 py-12 md:py-24 flex">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-theme-200 max-w-2xl w-full mx-auto h-fit">
        <h1 className="font-playball text-4xl text-theme-800 mb-6 text-center">Invitation Link Generator</h1>
        
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3">
              <label className="block text-xs uppercase tracking-widest text-stone-500 font-bold mb-2">Prefix</label>
              <select 
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full bg-stone-50 border border-theme-200 px-4 py-3 rounded-lg focus:outline-none focus:border-theme-400 font-cinzel text-lg"
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Mr. & Mrs.">Mr. & Mrs.</option>
                <option value="Family">Family</option>
                <option value="Dear">Dear</option>
              </select>
            </div>
            
            <div className="w-full md:w-2/3">
              <label className="block text-xs uppercase tracking-widest text-stone-500 font-bold mb-2">Guest Name</label>
              <input 
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Sanjaya"
                className="w-full bg-stone-50 border border-theme-200 px-4 py-3 rounded-lg focus:outline-none focus:border-theme-400 font-cinzel text-lg"
              />
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-stone-500 font-bold">Generated Link</h3>
            <div className="p-4 bg-stone-100 rounded-lg break-all font-mono text-sm text-stone-700 min-h-[50px] border border-stone-200">
              {generatedLink || 'Enter a guest name to generate link'}
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-stone-500 font-bold">Message Template</h3>
            <div className="p-4 bg-stone-100 rounded-lg whitespace-pre-wrap font-sans text-sm text-stone-700 min-h-[200px] border border-stone-200">
              {guestName ? generatedMessage : 'Enter a guest name to generate message'}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button 
              onClick={handleCopyLink}
              disabled={!guestName}
              className="flex-1 bg-white border-2 border-theme-800 text-theme-800 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-theme-50 transition-colors disabled:opacity-50"
            >
              {copiedLink ? 'Copied!' : 'Copy Link Only'}
            </button>
            <button 
              onClick={handleCopyMessage}
              disabled={!guestName}
              className="flex-1 bg-theme-800 text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-theme-900 transition-colors shadow-lg shadow-theme-900/20 disabled:opacity-50"
            >
              {copiedMessage ? 'Copied Message!' : 'Copy Full Message'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
