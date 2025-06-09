import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
// import bs58 from 'bs58';
import React, { useState } from 'react';
import { FileText } from 'lucide-react';

export function SignMessage() {
    const { publicKey, signMessage } = useWallet();
    const [message, setMessage] = useState('');

    async function onClick() {
        if (!publicKey) throw new Error('No Wallet connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');

        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);

        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
        alert('Message signature: ' + signature);
    };


    return (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-300">Message to Sign</label>
            <textarea 
              className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Enter your message here..."
              rows="3"  
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          
          <button onClick={onClick} className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
            <FileText size={18} />
            Sign Message
          </button>
        </div>
      );
};