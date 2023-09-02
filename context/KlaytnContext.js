import React, { createContext, useEffect, useState, useContext } from "react";
import { collection, db, doc, getDocs, query, updateDoc, where } from "../components/firebase";
import { AuthContext } from "./AuthConext";
import axios from "axios";
import { nftABI, nftMarketABI, nftaddress, nftmarketaddress, rentAbi, rentFactoryABI, rentFactoryAddress } from "../opBNB";
import { ethers } from "ethers";
import { toast } from "react-toastify";


export const KlaytnContext = createContext(undefined);

export const KlaytnContextProvider = (props) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;


  const [nfts, setNfts] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  const [rentLoading, setRentLoading] = useState(false);

  const setupUser = async () => {

  };

  const createNFT = async (_metadataUrl) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let tokencontract = new ethers.Contract(nftaddress, nftABI, signer);
    let transaction = await tokencontract.createToken(_metadataUrl);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    return tokenId;
  };

  const getNFTs = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let tokencontract = new ethers.Contract(nftaddress, nftABI, signer);
    let contract = new ethers.Contract(nftmarketaddress, nftMarketABI, signer);
    const transaction = await contract.fetchMarketItems();
    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenUri = await tokencontract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let item = {
          name: meta.data.name,
          tokenId: i.tokenId.toNumber(),
          description: meta.data.description,
          seller: i.seller,
          owner: i.owner,
          place: meta.data.place,
          image: meta.data.image,
        };
        return item;
      })
    );
    setNfts(items);
  };

  const getMyNFTS = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let tokencontract = new ethers.Contract(nftaddress, nftABI, signer);
    let contract = new ethers.Contract(nftmarketaddress, nftMarketABI, signer);
    const transaction = await contract.fetchSellersCreateNFTs(user); 

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenUri = await tokencontract.tokenURI(i.tokenId); 
        const meta = await axios.get(tokenUri); 
        let item = {
          name: meta.data.name,
          tokenId: i.tokenId.toNumber(),
          description: meta.data.description,
          seller: i.seller,
          owner: i.owner,
          place: meta.data.place,
          image: meta.data.image,
        };
        return item;
      })
    );
    setMyNFTs(items);
  };


  async function buyNft(nft) { 
    try {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        nft.rentContract,
        rentAbi,
        signer
      );

      const price = nft.Price + 100000000000000000;

      const transaction = await contract.rentToken(
        user,
        nft.Price,
        {
          value: price.toString(),
        }
      );
      const q = query(
        collection(db, "CreateNFTs"),
        where("nftId", "==",  nft.tokenId)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (e) => {
        await updateDoc(doc(db, "CreateNFTs", e.id), {
          rented: true,
          renter: user,
        });
      });

      await transaction.wait();
      toast.success("Nft Successfully rented.");
    } catch (error) {
      alert(error.data?.message);
      console.log("err", error);
    }
  }


  const rentNFTs = async (data) => {  
    setRentLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(nftmarketaddress, nftMarketABI, signer);
    let tokencontract = new ethers.Contract(nftaddress, nftABI, signer);
    const transaction = await contract.createMarketItem(nftaddress, data.nftId); 
    await transaction.wait();
    var rentingAmount;
    var rentCont; 
    const listingPriceofRent = ethers.utils.formatEther(data.Price); 
    let rentFactoryContract = new ethers.Contract(
      rentFactoryAddress,
      rentFactoryABI,
      signer
    );
    rentingAmount =
      parseInt(listingPriceofRent) +
      (parseInt(listingPriceofRent) * parseInt(10)) / 100;

    const sdate = new Date(data.StartDate);
    const edate = new Date(data.EndDate);
    const stimestamp = sdate.getTime() / 1000;
    const etimestamp = edate.getTime() / 1000; 

    let rentTransaction = await rentFactoryContract.createContract(
      user,
      parseInt(rentingAmount),
      nftaddress,
      "Wrapped KAN",
      "WKAN",
      data.nftId,
      stimestamp,
      etimestamp
    );
    let rentTx = await rentTransaction.wait(); 
    let rentEvent = rentTx.events[0];
    rentCont = rentEvent.args[1];
    const contractRent = new ethers.Contract(rentCont, rentAbi, signer);
    const txn = await tokencontract.approve(await contractRent.wrappedToken(), data.nftId);
  
    await txn.wait();
    setRentLoading(false);

    const q = query(
      collection(db, "CreateNFTs"),
      where("nftId", "==", parseInt(data.nftId))
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (e) => {
      await updateDoc(doc(db, "CreateNFTs", e.id), {
        rented: false,
        seller: user,
        rentContract: rentCont
      });
    });
    toast.success("Nft Successfully listed on rent");
  };

  return (
    <KlaytnContext.Provider
      value={{
        createNFT,
        setupUser,
        getNFTs,
        nfts,
        rentNFTs,
        getMyNFTS,
        myNFTs,
        rentLoading,
        buyNft
      }}
      {...props}
    >
      {props.children}
    </KlaytnContext.Provider>
  );
};
