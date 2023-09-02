import React, { createContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../components/firebase";
import { ethers } from "ethers"; 


export const AuthContext = createContext(undefined);

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState();
    const [update, setUpdate] = useState(false);
    const [userData, setUserData] = useState();
    const [userExist, setUserExists] = useState(false);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [add, setAdd] = useState();


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const add = localStorage.getItem("address"); 
            setAdd(add);
        }
    }, [])

    useEffect(() => {
        const initialize = async () => {
            if (typeof window !== 'undefined') {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                setProvider(provider);
                setSigner(signer);

                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setUser(accounts[0]);
            }
        };

        if (add) {
            initialize();
        }
    }, [add]);


    const disconnectWallet = () => {
        // navigate("/");
        window.localStorage.removeItem("address");
        setUpdate(!update);
        window.location.reload();
    };

    const shortAddress = (addr) =>
        addr.length > 10 && addr.startsWith("0x")
            ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
            : addr;


    const login = async () => {
        const { ethereum } = window;
        if (!ethereum) {
            alert("Please install the Metamask Extension!");
        }
        try {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            setUser(accounts[0]);
            window.localStorage.setItem("address", accounts[0]);
            await checkUserStatus(accounts[0]);
        } catch (err) {
            if (err.code === 4902) {
                try {
                    const accounts = await ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    setUser(accounts[0]);
                    window.localStorage.setItem("address", accounts[0]);
                    setUpdate(!update);
                } catch (err) {
                    alert(err.message);
                }
            }
        }
    }

    useEffect(() => {
        if (user) {
            getFirestoreData()
        }
    }, [user, update])

    const getFirestoreData = async () => {
        const q = query(collection(db, "Users"), where("Address", "==", user));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            setUserExists(false);
        } else {
            setUserExists(true);
        }
        querySnapshot.forEach((fire) => {
            const id = fire.id;
            setUserData({ ...fire.data(), id });
        });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                update,
                setUpdate,
                userData,
                getFirestoreData,
                userExist,
                disconnectWallet,
                shortAddress,

            }}
            {...props}
        >
            {props.children}
        </AuthContext.Provider>
    );
}