const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotifications = notification => {
  let ref = admin.firestore().collection("followArray")
    .doc(`${ notification.array.message }-${ notification.array.id }`);

  if (notification.type === "follow")
    return ref.get().then(doc => admin.firestore().collection("notifications")
      .add(notification)
      .then(doc => console.log("notification added", doc)));

  return ref.get().then(doc => admin.firestore().collection("notifications")
    .add({ ...notification, followers: doc.data().followers })
    .then(doc => console.log("notification added", doc)));
};

const followsArrayAdd = follows => {
  return admin.firestore().collection("followArray")
    .doc(`${ follows.message }-${ follows.id }`)
    .update({
      followers: admin.firestore.FieldValue.arrayUnion(follows.follower),
      lastUpdate: admin.firestore.FieldValue.serverTimestamp()
    })
    .then(doc => console.log("follows added", doc))
};

const followsArrayRemove = follows => {
  return admin.firestore().collection("followArray")
    .doc(`${ follows.message }-${ follows.id }`)
    .update({
      followers: admin.firestore.FieldValue.arrayRemove(follows.follower),
      lastUpdate: admin.firestore.FieldValue.serverTimestamp()
    })
    .then(doc => console.log("follows added", doc))
};

exports.follow = functions.firestore
  .document("/followers/{followId}")
  .onCreate(doc => {
    const follow = doc.data();

    const followArr = {
      follower: follow.authorId,
      message: follow.message.slice(0, -1),
      id: follow.followThingId
    };

    followsArrayAdd(followArr);

    const notification = {
      content: "została/-o zaobserwowana/-e",
      type: "follow",
      followers: [follow.authorId],
      objectTitle: follow.followObject.title,
      message: follow.message,
      array: {
        message: follow.message.slice(0, -1),
        id: follow.followThingId
      },
      objectId: follow.followThingId,
      created: admin.firestore.FieldValue.serverTimestamp()
    };

    return createNotifications(notification);
  });

exports.unfollow = functions.firestore
  .document("/followers/{followId}")
  .onDelete(doc => {
    const follow = doc.data();

    const followArr = {
      follower: follow.authorId,
      message: follow.message.slice(0, -1),
      id: follow.followThingId
    };

    followsArrayRemove(followArr);

    const notification = {
      content: "nie jest obserwowana/-e",
      type: "follow",
      followers: [follow.authorId],
      objectTitle: follow.followObject.title,
      message: follow.message,
      array: {
        message: follow.message.slice(0, -1),
        id: follow.followThingId
      },
      objectId: follow.followThingId,
      created: admin.firestore.FieldValue.serverTimestamp()
    };

    return createNotifications(notification);
  });

exports.createPost = functions.firestore
  .document("/posts/{postId}")
  .onCreate(doc => {
    const post = doc.data();

    const notification = {
      content: "został dodany nowy post",
      type: "createPost",
      objectId: post.gameId,
      objectTitle: post.gameTitle,
      message: "posts",
      array: {
        message: "game",
        id: post.gameId
      },
      postId: doc.id,
      created: admin.firestore.FieldValue.serverTimestamp()
    };

    return createNotifications(notification);
  });

exports.createGame = functions.firestore
  .document("/games/{gameId}")
  .onCreate(doc => {
    return admin.firestore().collection("followArray")
      .doc(`game-${ doc.id }`)
      .set({ followers: [], created: admin.firestore.FieldValue.serverTimestamp() });
  });

exports.createComment = functions.firestore
  .document("/comments/{commentId}")
  .onCreate(doc => {
    if (doc.data().message === "posts") return;
    const comment = doc.data();

    const notification = {
      content: "został dodany nowy komentarz",
      type: "createComment",
      objectId: comment.eventId,
      message: "comments",
      array: {
        message: "event",
        id: comment.eventId
      },
      gameId: comment.gameId,
      objectTitle: comment.appearTitle,
      created: admin.firestore.FieldValue.serverTimestamp()
    };

    return createNotifications(notification);
  });

exports.createEvent = functions.firestore
  .document("/events/{eventId}")
  .onCreate(doc => {
    const event = doc.data();

    admin.firestore().collection("followArray")
      .doc(`event-${ doc.id }`)
      .set({ followers: [], created: admin.firestore.FieldValue.serverTimestamp() });

    const notification = {
      content: "zostało dodane nowe wydarzenie",
      type: "createEvent",
      message: "events",
      array: {
          message: "game",
          id: event.gameId
      },
      objectId: doc.id,
      objectTitle: event.title,
      created: admin.firestore.FieldValue.serverTimestamp()
    };

    return createNotifications(notification);
  });
