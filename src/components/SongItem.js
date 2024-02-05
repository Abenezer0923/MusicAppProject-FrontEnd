import React, {useState} from 'react';
import styled from '@emotion/styled/macro';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSong, togglePlayPause } from '../redux/actions/songActions';


const CardContainer = styled.div`
  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 4px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  transition: transform 0.2s ease;

  ${ImageContainer}:hover & {
    transform: scale(1.1);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ImageContainer}:hover & {
    opacity: 1;
  }
`;

const PlayPauseButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  color: #000;  // Set the color for normal state
  cursor: pointer;
  font-size: 24px;
  transition: transform 0.2s ease, color 0.2s ease;  // Added color transition

  &:hover {
    transform: scale(1.2);
    color: #555;  // Set the color for hover state
  }
`;



const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s ease;

`;


const UpdateButton = styled.button`
  background-color: #d7a022;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin-right: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d7a0266;
  }
`;

const Artist = styled.p`
display: flex;
align-items: center;
justify-content: center;
font-weight: bold;
font-size: 1.1rem;
cursor: pointer;
text-decoration: none;
transition: color 0.2s ease;
`;

const ModalDescription = styled.div`
  color: #fff;
  margin-top: 20px;
`;

// Modal styles
const ModalContent = styled.div`
  position: relative;
  width: 80vw;
  height: 80vh;
  max-width: 800px;
  max-height: 600px;
  margin: auto;
  overflow: hidden;
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  cursor: pointer;
  font-size: 24px;
`;


const SongItem = ({ song }) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.songs.isPlaying);
  const selectedSong = useSelector((state) => state.songs.selectedSong);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isExpanded, setExpanded] = useState(false);

  const handleSelected = () => {
    if (selectedSong !== song) {
      dispatch(setSelectedSong(song));
    }
    dispatch(togglePlayPause());
    setExpanded(true); 
  };

  const handleClick = () => {
    navigate(`/songs/${song._id}`);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <CardContainer>
        <ImageContainer>
          <CardImage src={song.coverImage.secure_url} alt={song.title} />
          <Overlay>
            <PlayPauseButton onClick={handleClick}>
              <ButtonContainer>
                <UpdateButton>Detail</UpdateButton>

              </ButtonContainer>
            </PlayPauseButton>
          </Overlay>
        </ImageContainer>
        <Title>{song.title}</Title>
        <Artist>{song.artist}</Artist>
      </CardContainer>

    
      
    </div>
  );
};

export default SongItem;
