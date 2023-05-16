import { useState } from "react";
import { toast } from "react-toastify";
import { SearchField, SearchForm, SearchBtn, SearchInput } from "./SearchBar.styled";
import PropTypes from 'prop-types';

export const SearchBar = ({onSubmit}) =>  {
    const [searchedName, setSearchedName] = useState('');


    const onSearchedNameChange = e => {
        setSearchedName(e.currentTarget.value.toLowerCase());
    };

    const handleSubmit = (e) => {
    e.preventDefault();

    if (searchedName.trim() === '') {
      toast.warn("Please enter something in the search field");
      return;
    }

    onSubmit(searchedName);
    setSearchedName('');
  };

    return (
        <SearchField>
            <SearchForm onSubmit={handleSubmit}>
                <SearchInput
                    type="text"
                    name="searchedName"
                    value={searchedName}
                    onChange={onSearchedNameChange}
                    autoComplete="off"
                />
                <SearchBtn type="submit" >
                    Search
                </SearchBtn>
            </SearchForm>
        </SearchField>
    );
};

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}