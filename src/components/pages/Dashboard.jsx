import React, { useState, useEffect } from "react";
import { Card, Button, Container, Spinner } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, Route } from "react-router-dom";
import { db } from "../../fire";
import Profile from "../templates/Profile";
import BookMap from "../maps/BookMap";
import Recommend from "../addBook/Recommend";
import MapNav from "../templates/MapNav";
import "../../css/Dashboard.css";
import EditProfile from "../accounts/EditProfile";
import DisplayModal from "../DisplayModal";
import {
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

const Dashboard = () => {
  const [user, setUser] = useState();
  const { currentUser, getUserById } = useAuth();
  const [recs, setRecs] = useState();
  const [finished, setFinished] = useState();
  const [likes, setLikes] = useState();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isCurrentPage = window.location.pathname;

  useEffect(() => {
    getUser();
    getRecs();
    getFinished();
    getLikes();
    // eslint-disable-next-line
  }, []);

  const getUser = async () => {
    const user = await getUserById(currentUser.uid);
    setUser(user);
    setLoading(true);
  };

  const getFinished = () => {
    db.collection("finished")
      .where("uid", "==", currentUser.uid)
      .onSnapshot((snap) => {
        let result = snap.docs.map((doc) => ({
          id: doc.id,
          uid: doc.data().uid,
          title: doc.data().title,
          author: doc.data().author,
          recBy: doc.data().recBy,
          reason: doc.data().reason,
          thumbnail: doc.data().thumbnail,
          upvotes: doc.data().upvotes,
          createdAt: doc.data().createdAt,
          profileCompleted: doc.data().profileCompleted,
          userId: doc.data().uid,
        }));
        result.sort((a, b) => {
          if (a.createdAt > b.createdAt) return -1;
          if (a.createdAt < b.createdAt) return +1;
          return 0;
        });
        result.sort((a, b) => {
          if (a.upvotes > b.upvotes) return -1;
          if (a.upvotes < b.upvotes) return +1;
          return 0;
        });
        setFinished(result);
      });
  };

  const getLikes = () => {
    db.collection("likes")
      .where("uid", "==", currentUser.uid)
      .onSnapshot((snap) => {
        let result = snap.docs.map((doc) => ({
          id: doc.id,
          uid: doc.data().uid,
          title: doc.data().title,
          author: doc.data().author,
          recBy: doc.data().recBy,
          reason: doc.data().reason,
          thumbnail: doc.data().thumbnail,
          upvotes: doc.data().upvotes,
          createdAt: doc.data().createdAt,
          profileCompleted: doc.data().profileCompleted,
          userId: doc.data().uid,
        }));
        result.sort((a, b) => {
          if (a.createdAt > b.createdAt) return -1;
          if (a.createdAt < b.createdAt) return +1;
          return 0;
        });
        result.sort((a, b) => {
          if (a.upvotes > b.upvotes) return -1;
          if (a.upvotes < b.upvotes) return +1;
          return 0;
        });
        setLikes(result);
      });
  };

  const getRecs = async () => {
    db.collection("books")
      .where("uid", "==", currentUser.uid)
      .onSnapshot((snap) => {
        let result = snap.docs.map((doc) => ({
          id: doc.id,
          uid: doc.data().uid,
          title: doc.data().title,
          author: doc.data().author,
          recBy: doc.data().recBy,
          reason: doc.data().reason,
          thumbnail: doc.data().thumbnail,
          upvotes: doc.data().upvotes,
          createdAt: doc.data().createdAt,
          profileCompleted: doc.data().profileCompleted,
          userId: doc.data().uid,
        }));
        result.sort((a, b) => {
          if (a.createdAt.seconds > b.createdAt.seconds) return -1;
          if (a.createdAt.seconds < b.createdAt.seconds) return +1;
          return 0;
        });
        result.sort((a, b) => {
          if (a.upvotes > b.upvotes) return -1;
          if (a.upvotes < b.upvotes) return +1;
          return 0;
        });
        setRecs(result);
      });
  };

  const handleClose = () => {
    setShowModal(null);
  };

  return (
    <>
      {!loading && (
        <div className='spinner'>
          <Spinner animation='border' />
        </div>
      )}

      {loading && (
        <Card>
          <Profile user={user}>
            <Button
              variant='outline-primary'
              className='rounded-pill'
              onClick={() => setShowModal(true)}
            >
              Edit Profile
            </Button>
            <TwitterShareButton
              url={"Rec me a book https://recs.page/" + user?.username}
            >
              <TwitterIcon size={37} round={true} />
            </TwitterShareButton>
            <WhatsappShareButton
              url={"Rec me a book https://recs.page/" + user?.username}
            >
              <WhatsappIcon size={37} round={true} />
            </WhatsappShareButton>
            <TelegramShareButton
              url={"Rec me a book https://recs.page/" + user?.username}
            >
              <TelegramIcon size={37} round={true} />
            </TelegramShareButton>
            <DisplayModal show={showModal} handleClose={handleClose}>
              <EditProfile handleClose={handleClose} />
            </DisplayModal>
          </Profile>

          <Container className='books-map'>
            <MapNav>
              <li
                className={
                  !isCurrentPage.includes("/finished") &&
                  !isCurrentPage.includes("/likes")
                    ? "current-page"
                    : ""
                }
              >
                <Link to='/home'>Recs TBR</Link>
              </li>
              <li
                className={
                  isCurrentPage.includes("/finished") ? "current-page" : ""
                }
              >
                <Link to='/home/finished'>Finished</Link>
              </li>
              {/* <li
                className={
                  isCurrentPage.includes("/likes") ? "current-page" : ""
                }
              >
                <Link to='/home/likes'>Likes</Link>
              </li> */}
            </MapNav>

            <Route exact path='/home/'>
              <BookMap books={recs} isBookFinished={false}>
                <Recommend uid={currentUser.uid} />
              </BookMap>
            </Route>
            <Route path='/home/finished'>
              <BookMap books={finished} isBookFinished={true}>
                <Recommend uid={currentUser.uid} />
              </BookMap>
            </Route>
            <Route path='/home/likes'>
              <BookMap books={likes} isBookFinished={false}>
                <Recommend uid={currentUser.uid} />
              </BookMap>
            </Route>

            <p className='no-books'>
              {recs?.length === 0 && "You don't have any Recommendations yet."}
            </p>
          </Container>
        </Card>
      )}
    </>
  );
};

export default Dashboard;
