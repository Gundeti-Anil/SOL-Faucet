import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import { useState } from "react";
import { Send } from "lucide-react";

export function SendTokens() {
    const wallet = useWallet();
    const {connection} = useConnection();
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState(0);
    
    async function sendTokens() {
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL,
        }));

        await wallet.sendTransaction(transaction, connection);
        alert("Sent " + amount + " SOL to " + to);
    }

    // return <div>
    //     <input id="to" type="text" placeholder="To" />
    //     <input id="amount" type="text" placeholder="Amount" />
    //     <button onClick={sendTokens}>Send</button>
    // </div>

return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-300">Recipient Address</label>
          <input 
            className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter recipient address"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-300">Amount (SOL)</label>
          <input 
            className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="0.0"
            type="number"
            step="0.001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
      
      <button onClick={sendTokens} className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
        <Send size={18} />
        Send Transaction
      </button>
    </div>
  );
}