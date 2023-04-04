import { ethers } from 'ethers';
import { useEffect } from 'react';
import Web3Modal from 'web3modal';
import './App.css';

const web3Modal = new Web3Modal({
  network: 'jacky web', //主網名稱
  providerOptions: {},
});

function App() {
  useEffect(() => {
    async function init() {
      // 使用 web3Modal.connect() 連接到區塊鏈錢包，如 MetaMask
      const instance = await web3Modal.connect();

      // 用 ethers.providers.Web3Provider 將剛剛取得的實例轉換成 ethers.js 可用的 provider
      const provider = new ethers.providers.Web3Provider(instance);

      // 從 provider 中獲取簽名者（signer），通常用於執行交易等操作
      const signer = provider.getSigner();

      // 使用簽名者獲取當前用戶的 Ethereum 地址
      const address = await signer.getAddress();

      // 使用 provider.getBalance() 獲取當前用戶地址的餘額（以 wei 為單位）
      const balance = await provider.getBalance(address);

      // 使用 provider.lookupAddress() 進行 ENS（Ethereum Name Service）查詢，
      // 將 Ethereum 地址解析為更易讀的 ENS 地址（要在主網購買才有）
      const ensAddress = await provider.lookupAddress(address);

      //顯示錢包連結的餘額-utils.formatEther是格式轉換
      // console.log(ethers.utils.formatEther(balance));
    }
    init();
  }, []);

  return <div></div>;
}

export default App;
