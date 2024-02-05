import { Outlet } from "react-router-dom"
import Navbar from './Navbar'
import styled from '@emotion/styled/macro';
import { useSelector } from 'react-redux';
import { MusicPlayer } from '.';

const AppContainer = styled.nav`
    padding: 0;
    margin:0;
    background-color: #d7a022;
`;
const Layout = () => {
    const selectedSong = useSelector((state) => state.songs.selectedSong);
    return (
        <AppContainer >
            <Navbar />
            <Outlet />
            
        </AppContainer>
    )
}

export default Layout
