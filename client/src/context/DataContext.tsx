import React, { useState, useEffect, ReactNode } from "react";
import { useAccount } from "wagmi";
import { useEthersSigner } from "@/utils/signer";
import { ethers, BigNumber, Contract } from "ethers";
import toast from "react-hot-toast";
import {
  mainContractABI,
  mainContractAddress,
  
} from "@/constant/index";

// Context types
interface DataContextProps {
  submitName: (greet: any) => Promise<void>;
  greetNames: string[];
  getGreetNames: () => Promise<void>;
}

interface DataContextProviderProps {
  children: ReactNode;
}

// Context initialization
const DataContext = React.createContext<DataContextProps | undefined>(
  undefined
);

const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
}) => {
  const [tokenBalance, setTokenBalance] = useState<BigNumber | undefined>();
  const { address, chain } = useAccount();
  const [greetNames, setGreetNames] = useState<string[]>([]);
  const [activeChain, setActiveChainId] = useState<number | undefined>(
    chain?.id
  );
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    setActiveChainId(chain?.id);
  }, [chain?.id]);

  const signer = useEthersSigner({ chainId: activeChain });

  const getContractInstance = async (
    contractAddress: string,
    contractAbi: any
  ): Promise<Contract | undefined> => {
    try {
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      return contractInstance;
    } catch (error) {
      console.log("Error in deploying contract");
      return undefined;
    }
  };

  const submitName=async(_greet:any)=>{
    const contractInstance = await getContractInstance(
      mainContractAddress,
      mainContractABI
    );
    if (!contractInstance) {
      toast.error("Error in deploying contract");
      return;
    }
    const tx = await contractInstance.greet(_greet);
    await tx.wait();
    toast.success("Name submitted successfully");
  }

  const getGreetNames=async()=>{
    const contractInstance = await getContractInstance(
      mainContractAddress,
      mainContractABI
    );
    console.log(contractInstance,"instance");
    const greetNames = await contractInstance.getSubmittedNames();

    console.log(greetNames,"greetNames");
    setGreetNames(greetNames);
    return greetNames;
  }



  

 
  useEffect(() => {
    if (!signer) return;
    getGreetNames();
  }, [signer]);

  return (
    <DataContext.Provider
      value={{
        submitName,
        getGreetNames,
        greetNames
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
};

export default DataContextProvider;
