import React, { useState, useEffect, useContext } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Image from "next/image";
import Auctions_dropdown from "../../components/dropdown/Auctions_dropdown";
import Link from "next/link";
import Trending_categories_items from "../categories/trending_categories_items";
import { KlaytnContext } from "../../context/KlaytnContext";
import { AuthContext } from "../../context/AuthConext";

const User_items = () => {
  const [itemActive, setItemActive] = useState(1);
  const klaytnContext = useContext(KlaytnContext);
  let { getMyNFTS, myNFTs } = klaytnContext;
  const authContext = useContext(AuthContext);
  let { user } = authContext;
  const tabItem = [
    {
      id: 1,
      text: "on sale",
      icon: "on-sale",
    },
    {
      id: 2,
      text: "owned",
      icon: "owned",
    },
    {
      id: 3,
      text: "created(20)",
      icon: "created",
    },
  ];

  useEffect(() => {
    const init = async () => {
      await getMyNFTS();
    };
    init();
  }, [user]);

  return (
    <>
      <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          {/* <img src="img/gradient_light.jpg" alt="gradient" className="h-full w-full" /> */}
          <Image
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
            layout="fill"
          />
        </picture>
        <div className="container">
          {/* <!-- Tabs Nav --> */}
          <Tabs className="tabs">
            <TabList className="nav nav-tabs scrollbar-custom mb-12 flex items-center justify-start overflow-x-auto overflow-y-hidden border-b border-jacarta-100 pb-px dark:border-jacarta-600 md:justify-center">
              {tabItem.map(({ id, text, icon }) => {
                return (
                  <Tab
                    className="nav-item"
                    role="presentation"
                    key={id}
                    onClick={() => setItemActive(id)}
                  >
                    <button
                      className={
                        itemActive === id
                          ? "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white active"
                          : "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white"
                      }
                    >
                      <svg className="icon mr-1 h-5 w-5 fill-current">
                        <use xlinkHref={`/icons.svg#icon-${icon}`}></use>
                      </svg>
                      <span className="font-display text-base font-medium">
                        {text}
                      </span>
                    </button>
                  </Tab>
                );
              })}
            </TabList>

            <TabPanel>
              <div>
                {/* <!-- Filter --> */}
                <Trending_categories_items id="rented" />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                {/* <!-- Filter --> */}
                <Trending_categories_items  id="renter"/>
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                {/* <!-- Filter --> */}
                <Trending_categories_items   id="Creator"/>
              </div>
            </TabPanel>
          </Tabs>
        </div>
       
      </section>
    </>
  );
};

export default User_items;
