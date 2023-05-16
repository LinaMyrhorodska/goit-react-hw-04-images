import styled from "styled-components";

export const SearchField = styled.div`
    top: 0;
    left: 0;
    position: sticky;
    height: 70px;
  
    z-index: 1100;
    display: flex;
    justify-content: center;
    align-items: center;
    

    padding-right: 24px;
    padding-left: 24px;
    padding-top: 12px;
    padding-bottom: 12px;

    color: #fff;
    background-color: #AAD989;
`;

export const SearchForm = styled.form` 
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
  `;

export const SearchInput = styled.input`
    padding: 10px;
    height: 37px;
    font-size: 15px;
    border: none;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    float: left;
    width: 300px;
    outline: none;
    background: #fff;
`;

export const SearchBtn = styled.button`
    width: 100px;
    height: 37px;

    font-size: 16px;

    border: none;
    background-color: #C2F193;

    cursor: pointer;
    transition: background-color 300ms linear, color 300ms linear;

    &:hover,
    &:focus {
        background-color: #94C265;
        color: white;
    }
`;