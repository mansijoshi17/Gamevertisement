import React, { useEffect } from 'react';
import { trendingCategoryData } from '../../data/categories_data';
import Collection_category_filter from '../collectrions/collection_category_filter';
import CategoryItem from './categoryItem';
import { useDispatch } from 'react-redux';
import { updateTrendingCategoryItemData } from '../../redux/counterSlice';
import Explore from './SubCategory';

const FilterCategoryItem = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(updateTrendingCategoryItemData(trendingCategoryData.slice(0, 8))); 
	}, []);

	return (
		<div> 
			<Collection_category_filter />
			<Explore />
		</div>
	);
};

export default FilterCategoryItem;
