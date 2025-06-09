import React, { useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { ChevronDown, ChevronUp, Wallet, Send, FileText, Droplets } from 'lucide-react';

import '@solana/wallet-adapter-react-ui/styles.css';
import { SendTokens } from './components/transation';
import { SignMessage } from './components/signMessage';
import { RequestAirdrop } from './components/fauset';
import { ShowSolBalance } from './components/userBalance';


function App() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);


  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-800/10 via-transparent to-blue-800/10"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 container mx-auto px-4 py-8">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Solana Faucet
                </h1>
                {/* <p className="text-gray-400 text-lg">Manage your SOL tokens with ease</p> */}
              </div>

              {/* Main Content */}
              <div className="max-w-2xl mx-auto space-y-8">
                {/* Wallet Connection */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-white">Wallet Connection</h2>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                  </div>
                </div>

                {/* Balance Display */}
                <ShowSolBalance />

                {/* Request Airdrop */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-600/20 rounded-lg">
                      <Droplets className="text-blue-400" size={20} />
                    </div>
                    <h2 className="text-xl font-semibold text-white">Request Airdrop</h2>
                  </div>
                  
                  <RequestAirdrop />
                </div>

                {/* Advanced Features Dropdown */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
                  <button 
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full p-6 flex items-center justify-between text-white hover:bg-gray-700/30 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-600/20 rounded-lg">
                        <FileText className="text-purple-400" size={20} />
                      </div>
                      <span className="text-xl font-semibold">Advanced Features</span>
                    </div>
                    
                    {showAdvanced ? (
                      <ChevronUp className="text-gray-400" size={24} />
                    ) : (
                      <ChevronDown className="text-gray-400" size={24} />
                    )}
                  </button>

                  {showAdvanced && (
                    <div className="border-t border-gray-700/50">
                      <div className="p-6 space-y-8">
                        {/* Sign Message */}
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-yellow-600/20 rounded-lg">
                              <FileText className="text-yellow-400" size={18} />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Sign Message</h3>
                          </div>
                          <SignMessage />
                        </div>

                        <div className="border-t border-gray-700/30 pt-8">
                          {/* Send Tokens */}
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-pink-600/20 rounded-lg">
                              <Send className="text-pink-400" size={18} />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Send Transaction</h3>
                          </div>
                          <SendTokens />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="text-center mt-16 text-gray-500">
                <p>Connected to Solana Devnet</p>
              </div>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App