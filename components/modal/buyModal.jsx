import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { buyModalHide } from "../../redux/counterSlice";

const BuyModal = () => {
  const { buyModal } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      {/* <!-- Buy Now Modal --> */}
      <div className={buyModal ? "modal fade show block" : "modal fade"}>
        <div className="modal-dialog max-w-2xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="buyNowModalLabel">
                Buy Item
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => dispatch(buyModalHide())}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-jacarta-700 h-6 w-6 dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                </svg>
              </button>
            </div>

            {/* <!-- Body --> */}
            <div className="modal-body p-6">
              
              <div className="dark:border-jacarta-600 border-jacarta-100 relative flex items-center   border-b py-4">
                <figure className="mr-5 self-start">
                  <img
                    src="/images/avatars/avatar_2.jpg"
                    alt="avatar 2"
                    className="rounded-2lg"
                    loading="lazy"
                  />
                </figure>

                <div>
                  <a href="collection.html" className="text-accent text-sm">
                    Elon Musk #709
                  </a>
                  <h3 className="font-display text-jacarta-700 mb-1 text-base font-semibold dark:text-white">
                    Lazyone Panda
                  </h3>
                  <div className="flex flex-wrap items-center">
                    <span className="dark:text-jacarta-300 text-jacarta-500 mr-1 block text-sm">
                      Creator Earnings: 5%
                    </span>
                    <span data-tippy-content="The creator of this collection will receive 5% of the sale total from future sales of this item.">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="dark:fill-jacarta-300 fill-jacarta-700 h-4 w-4"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z" />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="ml-auto">
                  <span className="mb-1 flex items-center whitespace-nowrap">
                    <span data-tippy-content="TCBNB">
                      <img
                        src="/images/chains/klay.png"
                        alt="avatar"
                        className="rounded-2lg mr-1 h-4 w-4"
                        loading="lazy"
                      />
                    </span>
                    <span className="dark:text-jacarta-100 text-sm font-medium tracking-tight">
                      1.55 TCBNB
                    </span>
                  </span>
                  <div className="dark:text-jacarta-300 text-right text-sm">
                    $130.82
                  </div>
                </div>
              </div>

              {/* <!-- Total --> */}
              <div className="dark:border-jacarta-600 border-jacarta-100 mb-2 flex items-center justify-between border-b py-2.5">
                <span className="font-display text-jacarta-700 hover:text-accent font-semibold dark:text-white">
                  Total
                </span>
                <div className="ml-auto">
                  <span className="flex items-center whitespace-nowrap">
                    <span data-tippy-content="KLAY">
                      <svg className="h-4 w-4">
                        <use xlinkHref="/icons.svg#icon-KLAY"></use>
                      </svg>
                    </span>
                    <span className="text-accent font-medium tracking-tight">
                      1.55 TCBNB
                    </span>
                  </span>
                  <div className="dark:text-jacarta-300 text-right">
                    $130.82
                  </div>
                </div>
              </div> 
              
            </div>
            {/* <!-- end body --> */}

            <div className="modal-footer">
              <div className="flex items-center justify-center space-x-4">
              <button
                  type="button"
                  className="bg-accent shadow-accent-volume hover:bg-accent-dark rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                >
                  Buy Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyModal;
