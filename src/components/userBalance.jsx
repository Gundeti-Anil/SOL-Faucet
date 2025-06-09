import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export function ShowSolBalance() {
    const { connection } = useConnection();
    const [balance, setBalance] = useState(0);
    const wallet = useWallet();
    
    useEffect(() => {
        getBalance();
    }, [wallet.publicKey]);
    
    async function getBalance() { 
        if (wallet.publicKey) {

            const balance = await connection.getBalance(wallet.publicKey);
            setBalance(balance / LAMPORTS_PER_SOL);
        }else{
            setBalance(0);
        }
    }
    
    return (
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 shadow-lg">
            <div className="text-center">
                <p className="text-green-100 text-sm font-medium mb-2">SOL Balance</p>
                <p className="text-white text-3xl font-bold">{balance}</p>
                {/* <p className="text-green-100 text-sm mt-1">≈ $52.34 USD</p> */}
            </div>
        </div>
    );
}