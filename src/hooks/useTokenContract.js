import { ethers } from 'ethers'
import { useState, useEffect } from 'react'

const useTokenContract = (contractAddress, web3ContractAbi, account) => {
  const [signer, setSigner] = useState()
  const [webThreeProvider, setWebThreeProvider] = useState()
  const { ethereum } = typeof window !== 'undefined' && window

  useEffect(() => {
    if (ethereum) {
      setWebThreeProvider(new ethers.providers.Web3Provider(window.ethereum))
    }
  }, [ethereum])

  useEffect(() => {
    if (webThreeProvider && account) {
      setSigner(webThreeProvider.getSigner())
    }
  }, [account, webThreeProvider])

  if (!contractAddress || !web3ContractAbi || !ethereum || !webThreeProvider) {
    return
  }

  return new ethers.Contract(
    contractAddress,
    web3ContractAbi,
    signer || webThreeProvider
  )
}

export default useTokenContract
