import React from 'react';
import styled from '@emotion/styled/macro';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AddButtonContainer = styled.div`
  
  width: 60px;
  height: 50px;
  background-color: red;  // Corrected color value
  margin-left:2rem;
 
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: -1;
  }

  
`;
const AddButtons = styled.div`
background-color: red;  // Corrected color value
  color:#fff;
`

const PlusIcon = styled(FaPlus)`
  color: #fff;
  font-size: 24px;
  background-color: red;  // Corrected color value
`;


const AddButton = () => {
    const navigate = useNavigate();

    return (
        <AddButtonContainer title="Add Music" onClick={() => navigate('/songs/create')}>
            <AddButtons>
              Add
            </AddButtons>
        </AddButtonContainer>
    );
};

export default AddButton;
