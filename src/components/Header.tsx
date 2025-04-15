import React from 'react';
import styled from 'styled-components';

import Search from "@/components/Search";
import Menu from "@/components/Menu";

const HeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    width: 100%;
    padding: 0 33px;
    background-color: #333;
    color: white;
    text-align: center;
    z-index: 1;
`;

type HeaderProps = {
    query: string;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSearchClear: () => void;
    handleSidebarToggle: () => void;
    menuOpen: boolean;
}

const Header = ({ query, handleSearchChange, handleSearchClear, handleSidebarToggle, menuOpen }: HeaderProps) => {
    return (
        <HeaderWrapper>
            <Menu open={menuOpen} handleSidebarToggle={handleSidebarToggle}/>
            <Search query={query} onChange={handleSearchChange} onClear={handleSearchClear} />
        </HeaderWrapper>
    );
};

export default Header;
