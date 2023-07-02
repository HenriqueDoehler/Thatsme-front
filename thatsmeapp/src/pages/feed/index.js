import * as React from "react";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Navbar from "@/components/menu/navbar";
import Grid from "@mui/material/Grid";
import SearchField from "@/components/SearchField";
import SideNav from "@/components/menu/sideNav";
import styles from "@/styles/feed.module.css";

import Avatar from "@mui/material/Avatar";
import {
  StyledIconButtonFavoriteIcon,
  AnimationCard,
  StyledIconFavoriteIconPositive,
} from "../../styles/styles.js";
import { useState, useEffect, useContext, useCallback } from "react";
import { EmailContext } from "@/context/EmailContext";
import { useRouter } from "next/router";
import Modal from "@/components/modals/modalsFrame";

export default function Feed() {
  const router = useRouter();
  const { setEmail } = useContext(EmailContext);
  const [thisUser, setThisUser] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [initialFeedData, setInitialFeedData] = useState([]);
  const [filteredFeedData, setFilteredFeedData] = useState([]);
  const [codeMedal, setCodeMedal] = useState([]);
  const [urlThumbnail, setUrlThumbnail] = useState([]);
  const [modalData, setModalData] = useState({
    codModel: "",
    eventName: "",
    description: "",
    nameUser: "",
    eventAdress: "",
    eventDate: "",
    companyName: "",
  });

  const handleFeedInformation = useCallback(async () => {
    try {
      const loginEmail = localStorage.getItem("email");
      const response = await fetch(
        `https://api.thatsme.site/feed/${loginEmail}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data)
      setInitialFeedData(data?.data);
      const newData = data.data.map((medal) => medal.cod_model);
      setCodeMedal(newData);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleFeedLike = useCallback(async (walletId) => {
    const email = localStorage.getItem("email");
    try {
      await fetch(`https://api.thatsme.site/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, walletId }),
      });
      handleFeedInformation();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleThumbnail = useCallback(async () => {
    try {
      const thumbnailUrls = await Promise.all(
        codeMedal.map(async (medal) => {
          const response = await fetch(
            `https://sketchfab.com/oembed?url=https://sketchfab.com/models/${medal}`
          );
          const data = await response.json();
          return data?.thumbnail_url;
        })
      );
      setUrlThumbnail(thumbnailUrls);
    } catch (err) {
      console.error(err);
    }
  }, [codeMedal]);

  useEffect(() => {
    const filterFeed = () => {
      const filtered = initialFeedData?.filter((medal) => {
        const nameLowerCase = medal?.user_name.toLowerCase();
        const searchLowerCase = searchField.toLowerCase();
        return nameLowerCase.includes(searchLowerCase);
      });
      setFilteredFeedData(filtered);
    };

    filterFeed();
  }, [searchField, initialFeedData]);

  const handleNavigateToViewUsersProfile = (userEmail) => {
    setEmail(userEmail);
    router.push("/viewUsersProfile");
  };

  function handleClickModal(
    company_name,
    cod_model,
    user_name,
    event_name,
    date,
    address,
    event_description
  ) {
    setModalData({
      codModel: cod_model,
      eventName: event_name,
      description: event_description,
      nameUser: user_name,
      eventAdress: address,
      eventDate: date,
      companyName: company_name,
    });
    setShowModal(true);
  }

  const mainUser = async () => {
    try {
      const email = localStorage.getItem("email");
      const response = await fetch(`https://api.thatsme.site/wallets/${email}`);
      const data = await response.json();
      setThisUser(data[data.length - 1].user_name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFeedInformation();
  }, [handleFeedInformation]);

  useEffect(() => {
    handleThumbnail();
  }, [handleThumbnail]);

  useEffect(() => {
    mainUser();
  }, [mainUser]);


  return (
    <div className={styles.container}>
      <Grid>
        <Navbar />
        <Grid container justifyContent="center">
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            codModel={modalData.codModel}
            eventName={modalData.eventName}
            description={modalData.description}
            nameUser={modalData.nameUser}
            eventAdress={modalData.eventAdress}
            eventDate={modalData.eventDate}
            companyName={modalData.companyName}
          />
          <Grid item xs={12} sm={1.2} xl={1} container justifyContent="center">
            <SideNav />
          </Grid>
          <Grid
            container
            alignItems="baseline"
            className={styles.feedContainer}
            sx={{
              justifyContent: {
                xs: "center",
                sm: "start",
                md: "start",
                lg: "start",
                xl: "start",
              },
            }}
            item
            xs={12}
            sm={10}
            xl={10.5}
          >
            <Grid
              item
              sx={{
                marginRight: {
                  xs: 0,
                  sm: 2,
                  md: 2,
                  lg: 2,
                  xl: 4,
                },
                marginTop: {
                  xs: 2,
                  sm: 0,
                  md: 0,
                  lg: 0,
                  xl: 0,
                },
              }}
            >
              <Avatar
                alt={thisUser[0]}
                src="/static/images/avatar/1.jpg"
                sx={{
                  width: 72,
                  height: 72,
                  marginRight: "10px",
                  fontSize: "2rem",
                }}
              />
            </Grid>
            <Grid item>
              <SearchField setSearchField={setSearchField} />
              {!initialFeedData && (
                <p className={styles.nothingToShow}>
                  Oops! Ainda não temos o que mostrar…
                </p>
              )}
            </Grid>
            {filteredFeedData?.map(
              (
                {
                  id,
                  email,
                  avatar,
                  user_name,
                  event_name,
                  data,
                  company_name,
                  cod_model,
                  liked,
                  amount_likes,
                  address,
                  event_description,
                  medal_id,
                },
                index
              ) => {
                return (
                  <Grid
                    container
                    className={styles.cardContainer}
                    alignItems="center"
                    sx={{
                      "& .MuiTypography-root": {
                        color: "white",
                      },
                      justifyContent: {
                        xs: "center",
                        sm: "start",
                        md: "start",
                        lg: "start",
                        xl: "start",
                      },
                    }}
                    key={id}
                  >
                    <AnimationCard>
                      <a
                        onClick={() => handleNavigateToViewUsersProfile(email)}
                        style={{ cursor: "pointer" }}
                      >
                        <CardHeader
                          style={{
                            backgroundColor: "black",
                          }}
                          avatar={
                            <Avatar
                              sx={{ bgcolor: "#FF4F79" }}
                              aria-label="recipe"
                            >
                              {avatar}
                            </Avatar>
                          }
                          title={user_name}
                        />
                      </a>
                      <Grid container justifyContent="center">
                        <span
                          onClick={() =>
                            handleClickModal(
                              company_name,
                              cod_model,
                              user_name,
                              event_name,
                              data,
                              address,
                              event_description
                            )
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={urlThumbnail[index]}
                            className={styles.feedCard}
                          />
                        </span>
                      </Grid>
                      <CardContent
                        style={{
                          paddingBottom: "0px",
                          textAlign: "center",
                          backgroundColor: "black",
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          style={{
                            fontWeight: 300,
                          }}
                        >
                          {event_name}
                        </Typography>
                      </CardContent>
                      <CardActions
                        style={{
                          backgroundColor: "black",
                        }}
                      >
                        <Grid container alignItems="center">
                          <Grid item>
                            <StyledIconButtonFavoriteIcon
                              aria-label="add to favorites"
                              onClick={() => handleFeedLike(id)}
                            >
                              {liked ? (
                                <StyledIconFavoriteIconPositive />
                              ) : (
                                <FavoriteIcon />
                              )}
                            </StyledIconButtonFavoriteIcon>
                          </Grid>
                          <Grid item ml={1}>
                            <Typography>{amount_likes}</Typography>{" "}
                          </Grid>
                        </Grid>
                      </CardActions>
                    </AnimationCard>
                  </Grid>
                );
              }
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
