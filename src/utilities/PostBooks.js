import { db } from "../fire";

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
    .then(() => {
      console.log("added to Rec");
    })
    .catch(() => {
      console.log("don't gottem");
    });
};

const addReadBook = (book) => {
  console.log(book);
};

const revBook = (book) => {
  db.collection("reviews")
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
    .then(() => {
      console.log("added to rev");
    })
    .catch(() => {
      console.log("don't gottem");
    });
};

const likeThisBook = (book, uid) => {
  console.log(uid + " liked " + book.title);
};

const addToFinishedList = (book, uid) => {
  console.log(uid + " finished " + book.title);
};

export { recBook, addReadBook, revBook, likeThisBook, addToFinishedList };
