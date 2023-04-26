const firebaseConfig = {
  apiKey: "AIzaSyAAZOdMCOopq4sg5fZ8ZuvL5IFweqv6DlA",
  authDomain: "claudya-lntfinalproject-fe.firebaseapp.com",
  projectId: "claudya-lntfinalproject-fe",
  storageBucket: "claudya-lntfinalproject-fe.appspot.com",
  messagingSenderId: "613871740177",
  appId: "1:613871740177:web:4c5085a337552a629118b0"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const userCollection = db.collection("User");



// log data firebase
userCollection.get()
.then(snapshot => {
    snapshot.forEach(doc =>{
        console.log(doc.data())
    })
});



// validasi form
(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {

      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      else {
        event.preventDefault()
        const formData = new FormData(form)
        const email = formData.get("email")
        const name = formData.get("name")
        const phone = formData.get("phone")
        const eventName = formData.get("event")

        const data = {
          email: email,
          event: eventName,
          name: name,
          phone: phone
        };

        // ajax
        fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

        // add to firebase
        userCollection.add(data)
        .then(doc => {
            console.log("User telah ditambahkan dengan id: ", doc.id);
        })
        .catch(e => {
            console.error("Error menambahkan user dengan id: ", e);
        });
      }

      form.classList.add('was-validated')

    })

  })

})()