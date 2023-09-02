import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Likes from "../likes";
import Auctions_dropdown from "../dropdown/Auctions_dropdown";
import { useDispatch, useSelector } from "react-redux";
import { buyModalShow } from "../../redux/counterSlice";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { KlaytnContext } from "../../context/KlaytnContext";
import { AuthContext } from "../../context/AuthConext";

const Explore = ({ propId }) => {
    const { sortedtrendingCategoryItemData } = useSelector(
        (state) => state.counter
    );
    const dispatch = useDispatch();
    const authContext = useContext(AuthContext);
    const { user } = authContext;
    const [nftData, setNftData] = useState([]);
    const klaytnContext = useContext(KlaytnContext);
    const { rentNFTs, rentLoading } = klaytnContext;

    useEffect(() => {
        getNftData();
    }, []);

    async function getNftData() {
        const arry = [];
        // const q = query(collection(db, "CreateNFTs"));
        const q = query(collection(db, "CreateNFTs"), where('rented',"==",false));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((fire) => {
            const id = fire.id;
            arry.push({ ...fire.data(), id });
        });
        setNftData(arry);
    }

    return (
        <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
            {nftData &&
                nftData.map((item) => {
                    const { id, Photo, Nftname, Description, Creator, Price, nftId } = item;
            
                    return (
                        <article key={id}>
                            <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
                                <figure className="relative">
                                    <Link href={`/item/${id}`}>
                                        <a>
                                            <img
                                                src={Photo}
                                                alt="nft"
                                                className="w-full h-[230px] rounded-[0.625rem] object-cover"
                                            />
                                        </a>
                                    </Link>

                                    {/* <Likes like={likes} /> */}

                                    {/* <div className="absolute left-3 -bottom-3">
                  <div className="flex -space-x-2">
                    <Link href={`/item/${itemLink}`}>
                      <a>
                        <Tippy content={<span>creator: {creator.name}</span>}>
                          <img
                            src={creator.image}
                            alt="creator"
                            className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                          />
                        </Tippy>
                      </a>
                    </Link>
                    <Link href={`/item/${itemLink}`}>
                      <a>
                        <Tippy content={<span>creator: {owner.name}</span>}>
                          <img
                            src={owner.image}
                            alt="owner"
                            layout="fill"
                            className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                          />
                        </Tippy>
                      </a>
                    </Link>
                  </div>
                </div> */}
                                </figure>
                                <div className="mt-7 flex items-center justify-between">
                                    <Link href={`/item/${id}`}>
                                        <a>
                                            <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">
                                                {Nftname}
                                            </span>
                                        </a>
                                    </Link>
                                    <span className="dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2">
                                        <span>
                                            <img
                                                src="/images/chains/klay.png"
                                                alt="avatar"
                                                className="rounded-2lg mr-1 h-4 w-4"
                                                loading="lazy"
                                            />
                                        </span>
                                    </span>

                                    {/* auction dropdown  */}
                                    <Auctions_dropdown classes="dark:hover:bg-jacarta-600 dropup hover:bg-jacarta-100 rounded-full " />
                                </div>
                                <div className="mt-2 text-sm">
                                    <span className="dark:text-jacarta-200 text-jacarta-700 mr-1">
                                        Rent
                                    </span>
                                    <span className="dark:text-jacarta-300 text-jacarta-500">
                                        {Price}
                                    </span>
                                </div>

                                <div className="mt-8 flex items-center justify-between">
                                    <button
                                        className="text-accent font-display text-sm font-semibold"
                                        // onClick={() => rentNFTs(item)}
                                    >
                                        Buy Nft
                                    </button>
                                     
                                </div>
                            </div>
                        </article>
                    );
                })}
        </div>
    );
};

export default Explore;
