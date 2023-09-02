import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { items_data } from '../../data/items_data';
import Auctions_dropdown from '../../components/dropdown/Auctions_dropdown';
import Link from 'next/link';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Items_Countdown_timer from '../../components/items_countdown_timer';
import { ItemsTabs } from '../../components/component';
import More_items from './more_items';
import Likes from '../../components/likes';
import Meta from '../../components/Meta';
import { useDispatch } from 'react-redux';
import { bidsModalShow } from '../../redux/counterSlice';
import { doc, getDoc, where } from 'firebase/firestore';
import { db } from '../../components/firebase';
import { KlaytnContext } from "../../context/KlaytnContext";

const Item = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const pid = router.query.item;
	const [userData, setUserData] = useState();

	const [imageModal, setImageModal] = useState(false);

	const klaytnContext = useContext(KlaytnContext);
	const { rentNFTs, rentLoading } = klaytnContext;

	const getDetails = async () => {
		const docRef = doc(db, "CreateNFTs", pid);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists) {
			const data = docSnap.data();
			setUserData(data);
		 
		}
	}

	useEffect(() => {
		pid && getDetails();
	}, [pid])

	return (
		<>
			<Meta title={`${pid}`} />
			<section className="relative lg:mt-24 lg:pt-24 lg:pb-24 mt-24 pt-12 pb-24">
				<picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
					<img src="/images/gradient_light.jpg" alt="gradient" className="h-full" />
				</picture>
				<div className="container">
					<div className="md:flex md:flex-wrap"  >
						{/* <!-- Image --> */}
						<figure className="mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2 w-full">
							<button className=" w-full" onClick={() => setImageModal(true)}>
								<img src={userData && userData.Photo} alt={userData && userData.Nftname} className="rounded-2xl cursor-pointer  w-full" />
							</button>

							{/* <!-- Modal --> */}
							<div className={imageModal ? 'modal fade show block' : 'modal fade'}>
								<div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center">
									<img src={userData && userData.Photo} alt={userData && userData.Nftname} className="h-full rounded-2xl" />
								</div>

								<button
									type="button"
									className="btn-close absolute top-6 right-6"
									onClick={() => setImageModal(false)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										width="24"
										height="24"
										className="h-6 w-6 fill-white"
									>
										<path fill="none" d="M0 0h24v24H0z" />
										<path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
									</svg>
								</button>
							</div>
							{/* <!-- end modal --> */}
						</figure>

						{/* <!-- Details --> */}
						<div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
							{/* <!-- Collection / Likes / Actions --> */}
							<div className="mb-3 flex">
								{/* <!-- Collection --> */}
								<div className="flex items-center">
									<Link href="#">
										<a className="text-accent mr-2 text-sm font-bold">{userData && userData.Nftname}</a>
									</Link>
									<span
										className="dark:border-jacarta-600 bg-green inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
										data-tippy-content="Verified Collection"
									>
										<Tippy content={<span>Verified Collection</span>}>
											<svg className="icon h-[.875rem] w-[.875rem] fill-white">
												<use xlinkHref="/icons.svg#icon-right-sign"></use>
											</svg>
										</Tippy>
									</span>
								</div>

								{/* <!-- Likes / Actions --> */}
								<div className="ml-auto flex items-stretch space-x-2 relative">
									<Likes
										like={21}
										classes="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 flex items-center space-x-1 rounded-xl border bg-white py-2 px-4"
									/>

									{/* <!-- Actions --> */}
									<Auctions_dropdown classes="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white" />
								</div>
							</div>

							<h1 className="font-display text-jacarta-700 mb-4 text-4xl font-semibold dark:text-white">
							{userData && userData.Nftname}
							</h1>

							<div className="mb-8 flex items-center space-x-4 whitespace-nowrap">
								<div className="flex items-center">
									<img
										src="/images/chains/tbnb.png"
										alt="avatar"
										className="rounded-2lg mr-1 h-4 w-4"
										loading="lazy"
									/>
									<span className="text-accent text-sm font-medium tracking-tight">
									{userData && userData.Price}
									</span>
								</div>
								<span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
									Rent Amount
								</span>
								<span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
							
								</span>
							</div>

							<p className="dark:text-jacarta-300 mb-10">{userData && userData.Description}</p>

						 
							{/* <!-- Bid --> */}
							<div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8">
								<div className="mb-8 sm:flex sm:flex-wrap">
									{/* <!-- Highest bid --> */}
									<div className="sm:w-1/2 sm:pr-4 lg:pr-8">
										<div className="block overflow-hidden text-ellipsis whitespace-nowrap">
											<span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
												On Rent by{' '}
											</span>
											<Link href="/user/avatar_6">
												<a className="text-accent text-sm font-bold">
													{userData?.Creator}
												</a>
											</Link>
										</div>
										<div className="mt-3 flex">
											<figure className="mr-4 shrink-0">
												<Link href="#">
													<a className="relative block">
														
														<img
															src={userData?.Photo}
															alt="avatar"
															className="rounded-2lg h-12 w-12"
															loading="lazy"
														/>
													</a>
												</Link>
											</figure>
											<div>
												<div className="flex items-center whitespace-nowrap">
													<img
														src="/images/chains/tbnb.png"
														alt="avatar"
														className="rounded-2lg mr-1 h-4 w-4"
														loading="lazy"
													/>
													<span className="text-accent text-lg font-medium leading-tight tracking-tight">
													{userData && userData.Price} TCBNB
													</span>
												</div>
												 
											</div>
										</div>
									</div>

									{/* <!-- Countdown --> */}
									{/* <div className="dark:border-jacarta-600 sm:border-jacarta-100 mt-4 sm:mt-0 sm:w-1/2 sm:border-l sm:pl-4 lg:pl-8">
										<span className="js-countdown-ends-label text-jacarta-400 dark:text-jacarta-300 text-sm">
											Rent ends in
										</span>
										<Items_Countdown_timer time={+userData && userData.EndDate} />
									</div> */}
								</div>

								<Link href="#">
									<button
										className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
										onClick={() => rentNFTs(userData)}
										disabled={rentLoading}
									>
										{rentLoading ? "Renting..." : "Rent"}
									</button>
								</Link>
							</div>
							{/* <!-- end bid --> */}
						</div>
						{/* <!-- end details --> */}
					</div>
				</div>
			</section>
			{/* <!-- end item --> */}

			<More_items />
		</>
	);
};

export default Item;
