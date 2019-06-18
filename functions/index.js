// Inicjalizacja projektu w firebase
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

/**
 * Funkcja tworząca powiadomienia i umiweszczająca je w firestore
 * @param notification - Obiekt przechowujący dane o danym powiadomieniu
 * @returns {Promise<void | firebase.firestore.DocumentSnapshot>} - Zwracany jest komunikat o stworzeniu powiadomienia
 */
const createNotifications = notification => {
  // Tworzę referencję do tablicy przechowującej danych obserwujących
  let ref = admin.firestore().collection("followArray")
    .doc(`${ notification.array.message }-${ notification.array.id }`);

  // Jeśli powiadomienie tyczy się oberwaćji, bądź usunięcia obserwacji tworzone jest powiadomienie.
  // Powiadomienie dotyczy tylko jednego użytkownika, więc to on będzie jedynym elementem tablicy obserwowanych.
  // Powiadomienie będzie zawierało wtedy informacje o użytkowniku oraz obiektu obserwowania.
  if (notification.type === "follow")
    return ref.get().then(doc => admin.firestore().collection("notifications")
      .add(notification)
      .then(doc => console.log("notification added", doc)));

  // W przypadku, gdy powiadomienie tyczy się np. gry, wpisu, komentarza do wydarzenia, bądź samego wydarzenia,
  // tworzone jest powiadomienie, w którym tablica obserwowanych zawiera wszystkich obserwujących danego elementu
  // (gry, wydarzenia). Powiadomienie będzie zawierało wówczas informacje o obserwujących użytkownikach (ich id)
  // oraz inforamcje dotyczące obiektu powiadomienia np. wpisu, wydarzenia.
  return ref.get().then(doc => admin.firestore().collection("notifications")
    .add({ ...notification, followers: doc.data().followers })
    .then(doc => console.log("notification added", doc)));
};

/**
 * Funkcja dodająca użytkownika do tabeli obserwujących
 * @param follows - Obiekt przechowujący dane o danej obserwacji
 * @returns {Promise<void | never>} - Zwracany jest komunikat o dodaniu do tablicy
 */
const followsArrayAdd = follows => {
  // Do dokumentu przechowującego tablicę obserwowanych dodawany jest identyfikator użytkownika. Dokument jset nazywany
  // nazwą kolekcji, do której porzechowywuje obserwujących oraz identyfikatorem danego obiektu z tej samej kolekcji,
  // np. nazwa kolekcji 'kolekcja' oraz identyfikator z tej kolekcji 'identyfikator', wyszuka nam nazwę
  // 'kolekcja-identyfikator'.
  return admin.firestore().collection("followArray")
    .doc(`${ follows.message }-${ follows.id }`)
    .update({
      followers: admin.firestore.FieldValue.arrayUnion(follows.follower),
      lastUpdate: admin.firestore.FieldValue.serverTimestamp()
    })
    .then(doc => console.log("follows added", doc))
};

/**
 * Funkcja odwrotna do followsArrayAdd, czyli usuwająca danego obserwatora
 * @param follows - Obiekt przechowujący dane o danej obserwacji
 * @returns {Promise<void | never>} - Zwracany jest komunikat o usunięciu do tablicy
 */
const followsArrayRemove = follows => {
  // Zasada taka sama jak przy dodawaniu.
  return admin.firestore().collection("followArray")
    .doc(`${ follows.message }-${ follows.id }`)
    .update({
      followers: admin.firestore.FieldValue.arrayRemove(follows.follower),
      lastUpdate: admin.firestore.FieldValue.serverTimestamp()
    })
    .then(doc => console.log("follows removed", doc))
};

/**
 * Funkcja wykonywana w chmurze. Przy stworzeniu jakiegoś dokumentu w kolekcji 'followers' (czyli de facto
 * zaobserwowaniu przez użytkownika) funkcja otrzymuje trigger onCreate i wykonuje wewnętrzną funkcję, w której
 * ze stworzonego dokumentu zaciągane są wszystkie informacje. Po czym tworzony jest obiekt zawierający dane
 * do dodania do tablicy obserwowanych a następnie dodawany jest owy obiekt do tablicy obserwowanych. Na samym końcu
 * tworzy się obiekt zawierający informacje jakie zawierają się w powiadomieniu oraz tworzone jest powiadomienie.
 * @type {CloudFunction<DocumentSnapshot>}
 */
exports.follow = functions.firestore
  .document("/followers/{followId}")
  .onCreate(doc => {
    // Pobranie informacji o obiekcie
    const follow = doc.data();

    // Stworzenie obiektu do dodania do tablicy obserwowanych
    const followArr = {
      follower: follow.authorId,
      message: follow.message.slice(0, -1),
      id: follow.followThingId
    };

    // Wywołanie dodania do tablicy
    followsArrayAdd(followArr);

    // Stworzenie obiektu z informacjami do powiadomienia
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

    // Stworzenie powiadomienia
    return createNotifications(notification);
  });

/**
 * Funkcja wykonywana w chmurze. Działa analogicznie jak funkcja follow, z tym że jest to funkcja usuwająca obserwację
 * użytkownika z tablicy obserwowanych.
 * @type {CloudFunction<DocumentSnapshot>}
 */
exports.unfollow = functions.firestore
  .document("/followers/{followId}")
  .onDelete(doc => {
    // Pobranie informacji o obiekcie
    const follow = doc.data();

    // Stworzenie obiektu do usunięcia z tablicy obserwowanych
    const followArr = {
      follower: follow.authorId,
      message: follow.message.slice(0, -1),
      id: follow.followThingId
    };

    // Wywołanie usunięcia z tablicy
    followsArrayRemove(followArr);


    // Stworzenie obiektu z informacjami do powiadomienia
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


    // Stworzenie powiadomienia
    return createNotifications(notification);
  });

/**
 * Funkcja wykonywana w chmurze. Funkcja przy stworzeniu wpisu pobiera informacje o nim, po czym tworzy obiekt
 * powiadomienia i tworzy dokument powiadomienia w firestore.
 * @type {CloudFunction<DocumentSnapshot>}
 */
exports.createPost = functions.firestore
  .document("/posts/{postId}")
  .onCreate(doc => {
    // Pobranie informacji o obiekcie
    const post = doc.data();

    // Stworzenie obiektu z informacjami do powiadomienia
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

    // Stworzenie powiadomienia
    return createNotifications(notification);
  });

/**
 * Funkcja wykonywana w chmurze. Przy stworzeniu gry tworzona jest tablica obserwujących.
 * @type {CloudFunction<DocumentSnapshot>}
 */
exports.createGame = functions.firestore
  .document("/games/{gameId}")
  .onCreate(doc => {
    // Stworzenie dokumentu w kolekcji followArray zawierającego tablicę obserwujących
    return admin.firestore().collection("followArray")
      .doc(`game-${ doc.id }`)
      .set({ followers: [], created: admin.firestore.FieldValue.serverTimestamp() });
  });

/**
 * Funkcja wykonywana w chmurze. Przy stworzeniu komentarzu jest sprawdzane czy dotyczy on wpisu czy też wydarzenia.
 * Jeśli dotyczy wydarzenia tworzony jest obiekt powiadomienia oraz samo powiadomienie dodawane jest do firestore.
 * W przeciwynm wykonanie funkcji jest przerywane.
 * @type {CloudFunction<DocumentSnapshot>}
 */
exports.createComment = functions.firestore
  .document("/comments/{commentId}")
  .onCreate(doc => {
    // Jeśli komentarz dotyczy wpisu funkcja jest przerywana
    if (doc.data().message === "posts") return;
    // Pobranie informacji o obiekcie
    const comment = doc.data();

    // Stworzenie obiektu z informacjami do powiadomienia
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

    // Stworzenie powiadomienia
    return createNotifications(notification);
  });

/**
 * Funkcja wykonywana w chmurze. Przy stworzeniu wydarzenia tworzona jest tablica obserwujących oraz powiadomienie,
 * w którym zawarte są informacja na temat wydarzenia oraz gry, do której zostało dodane wydarzenie.
 * @type {CloudFunction<DocumentSnapshot>}
 */
exports.createEvent = functions.firestore
  .document("/events/{eventId}")
  .onCreate(doc => {
    // Pobranie informacji o obiekcie
    const event = doc.data();

    // Stworzenie dokumentu w kolekcji followArray zawierającego tablicę obserwujących
    admin.firestore().collection("followArray")
      .doc(`event-${ doc.id }`)
      .set({ followers: [], created: admin.firestore.FieldValue.serverTimestamp() });

    // Stworzenie obiektu z informacjami do powiadomienia
    const notification = {
      content: "zostało dodane.",
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

    // Stworzenie powiadomienia
    return createNotifications(notification);
  });
