"use client";
import { useChain } from "@/context/ChainContext";
import React, { useEffect } from "react";
import Dropdown from "@/Resusables/Dropdown";

const ChainDropdown = () => {
  const { setChainDetail, chainDetail } = useChain();
  const chains = [
    {
      name: "Bitifinity",
      url: "https://testnet.bitfinity.network/",
      id: "355113",
    },

  ];

  const savedChainId = localStorage.getItem("selectedChainId");

  useEffect(() => {
    if (savedChainId) {
      const savedChain = chains.find(
        (chain) => chain.id === savedChainId
      );
      if (savedChain) {
        setChainDetail(savedChain);
      }
    }
  }, [savedChainId, setChainDetail]);

  const handleSelectChain = (chain : any) => {
    setChainDetail(chain);
    localStorage.setItem("selectedChainId", chain.id);
  };

  return (
    <Dropdown
      items={chains}
      label="Supported Chains"
      onSelect={handleSelectChain}
      selectedItem={chainDetail}
    />
  );
};

export default ChainDropdown;
