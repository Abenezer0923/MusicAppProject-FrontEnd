import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import faker from "faker";
import styled from "@emotion/styled/macro";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaPlay, FaPause } from "react-icons/fa";
import Status from "./Status";
import MusicPlayer from "./MusicPlayer";
import {
  deleteSongAsync,
  setSelectedSong,
  togglePlayPause,
} from "../redux/actions/songActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bar } from "react-chartjs-2";

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SongDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const SongImage = styled.img`
  width: 420px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  
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

const CardContainer = styled.div`
  position: relative;
  background-color: #fff;
  width: 450px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const PlayPauseButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  cursor: pointer;
  font-size: 24px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const SongTitle = styled.h2`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SongArtist = styled.p`
  color: #fff;
  font-size: 18px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  margin-top: 3rem;
  margin-right:12rem;
  display: flex;
  justify-content: center;
`;

const UpdateButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin-right: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a71d2a;
  }
`;

const SongDetail = () => {
  const dispatch = useDispatch();
  const successMessageDisplayed = useRef(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const songs = useSelector((state) => state.songs.songs);
  const song = songs.find((song) => song._id === id);

  const status = useSelector((state) => state.songs.status);
  const isPlaying = useSelector((state) => state.songs.isPlaying);
  const selectedSong = useSelector((state) => state.songs.selectedSong);

  const handleSelected = () => {
    if (selectedSong !== song) {
      dispatch(setSelectedSong(song));
    }
    dispatch(togglePlayPause());
  };

  useEffect(() => {
    if (status === 201 && !successMessageDisplayed.current) {
      toast.success("Music Updated successfully!", { autoClose: 3000 });
    } else if (status === 500 && !successMessageDisplayed.current) {
      toast.error(`Error updating music 😌`, { autoClose: 3000 });
    }
    return () => {
      if (status === 201) {
        successMessageDisplayed.current = true;
      }
    };
  }, [status]);

  if (!song) {
    return <Status />;
  }

  const handleDelete = () => {
    dispatch(deleteSongAsync(id));
    navigate("/");
  };

  const chartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
    ],
    datasets: [
      {
        label: "Number of Listeners",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Number of Listeners Over Time",
      },
    },
    scales: {
      x: {
        type: "category",
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ backgroundColor: "#d7a022", padding: "20px" }}>
      <SongDetailContainer>
        <RowContainer>
          <CardContainer>
            <ImageContainer>
              <SongImage src={song.coverImage.secure_url} alt={song.title} />
              <Overlay>
                <PlayPauseButton onClick={handleSelected}>
                  {((selectedSong === song) && isPlaying) ? (
                    <FaPause />
                  ) : (
                    <FaPlay />
                  )}
                </PlayPauseButton>
              </Overlay>
            </ImageContainer>
          </CardContainer>

          <div style={{ flex: 1, marginLeft: "20px" }}>
            <SongTitle>{song.title}</SongTitle>
            <SongArtist>{song.artist}</SongArtist>
            <SongArtist>
              In publishing and graphic design, Lorem ipsum is a placeholder text
              commonly used to demonstrate the visual form of a document or a
              typeface without relying on meaningful content. Lorem ipsum may be
              used as a placeholder before the final copy is available
            </SongArtist>
            {selectedSong && <MusicPlayer />}
            <ButtonContainer>
              <UpdateButton onClick={() => navigate(`/songs/update/${id}`)}>
                Update
              </UpdateButton>
              <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
            </ButtonContainer>
          </div>
        </RowContainer>

        <div style={{ width: "100%" }}>
          <Bar options={chartOptions} data={chartData} />
        </div>
      </SongDetailContainer>
      <ToastContainer />
    </div>
  );
};

export default SongDetail;
