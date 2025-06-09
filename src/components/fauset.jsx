import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Droplets } from "lucide-react";
import { useState } from "react";

export function RequestAirdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState(0);

    async function requestAirdrop() {
        await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
        alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-300">Wallet Address</label>
                <input 
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Your wallet address will appear here"
                readOnly
                value={wallet.publicKey?.toBase58()}
                />
            </div>
            
            <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-300">Amount (SOL)</label>
                <input 
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter amount"
                type="number"
                step="0.1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            
            <button onClick={requestAirdrop} className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
                <Droplets size={18} />
                Request Airdrop
            </button>
        </div>
    );
}