import { db } from "../fire";
import firebase from "firebase";

const recBook = (book) => {
  db.collection("books")
    .add({
      title: book.title,
      author: book.author,
      thumbnail: book.thumbnail,
      recBy: book.recBy,
      reason: book.reason,
      upvotes: 0,
      uid: book.uid,
      createdAt: new Date(),
    })
    .then((e) => {
      console.log("gottem");
    })
    .catch((e) => {
      console.log(e);
    });
};

const addReadBook = (book) => {
  console.log(book);
};

const likeThisBook = (book, currentUser, likeId) => {
  const increment = firebase.firestore.FieldValue.increment(1);
  try {
    db.collection("likes")
      .doc(likeId)
      .get()
      .then((snap) => {
        if (snap.data()) {
          console.log(snap.data());
        } else {
          console.log("sorry don't got em");
        }
      });

    db.collection("likes")
      .doc(likeId)
      .set({
        bookLiked: book.id,
        title: book.title,
        author: book.author,
        thumbnail: book.thumbnail,
        recBy: book.recBy,
        reason: book.reason,
        upvotes: increment,
        uid: book.uid,
        createdAt: new Date(),
        // Liked by section
        likedBy: currentUser,
        likedOn: new Date(),
      })
      .then(() => {
        console.log("book liked");
      })
      .catch((e) => {
        console.log(e);
      });

    const thisBook = db.collection("books").doc(book.id);

    thisBook.update({ upvotes: increment });
  } catch (e) {
    console.log(e.message);
  }
};

const unlikeThisBook = (book, likeId) => {
  const decrement = firebase.firestore.FieldValue.increment(-1);

  try {
    db.collection("likes").doc(likeId).delete();

    db.collection("books").doc(book.id).update({ upvotes: decrement });
  } catch (e) {
    console.log(e);
  }
};

const grabThisRec = (book, currentUser) => {
  if (window.confirm("Grab this recommendation to add to your TBR")) {
    try {
      if (book.id !== currentUser) {
        book.uid = currentUser;
        recBook(book);
      }
    } catch (e) {
      console.log(e);
    }
  }
};

const addToFinishedList = async (book, currentUser) => {
  if (window.confirm("Are you finished this book?")) {
    try {
      db.collection("finished")
        .where("finishedBy", "==", currentUser)
        .get()
        .then((snap) => {
          if (snap.docs[0]?.data()) {
            removeFromFinishedList(book.id);
            return;
          } else {
            console.log("book finished");
          }
        });

      // db.collection("finished")
      //   .add({
      //     title: book.title,
      //     author: book.author,
      //     thumbnail: book.thumbnail,
      //     recBy: book.recBy,
      //     reason: book.reason,
      //     uid: book.uid,
      //     createdAt: new Date(),
      //     // finished by section
      //     finishedBy: currentUser,
      //     finishedOn: new Date(),
      //   })
      //   .then(() => {
      //     console.log("book finished");
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    } catch (e) {
      console.log(e.message);
    }
  }
};

const removeFromFinishedList = (bookId) => {
  db.collection("finished")
    .doc(bookId)
    .delete()
    .then(() => {
      console.log(bookId + " removed from finished List");
    })
    .catch((e) => {
      console.log(e);
    });
};

const deleteThisRec = (book) => {
  db.collection("books")
    .doc(book.id)
    .delete()
    .then((e) => console.log("deleted successfully"))
    .catch((e) => {
      console.log(e);
    });
};

export {
  recBook,
  addReadBook,
  likeThisBook,
  unlikeThisBook,
  addToFinishedList,
  grabThisRec,
  deleteThisRec,
};
