import React from 'react';
// import renderer from "react-test-renderer";
import {render, screen} from "@testing-library/react";
import Search from './Search';
import DisplaySearch from "./DisplaySearch";

it('Display search bar and search button',  () => {
	render(<Search />)
	const searchBar = screen.getAllByPlaceholderText('Search for a service ...');
	const searchButton = screen.getByTitle('search-button');
	expect(searchBar)
	expect(searchButton)
})