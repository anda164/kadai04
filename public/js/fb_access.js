        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
        //import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js';
        import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js';
        //Auth reference:
        //  https://firebase.google.com/docs/auth/web/password-auth?hl=ja
        //  https://firebase.google.com/docs/auth/web/start?hl=ja
      
        // Your web app's Firebase configuration
        /*
        const firebaseConfig = {
          apiKey: "XXXXXXXXXXXXXXXXXXXXXXX",
          authDomain: "XXXXXXXXXXXXXXXXXXXXXXX",
          databaseURL: "XXXXXXXXXXXXXXXXXXXXXXX",
          projectId: "XXXXXXXXXXXXXXXX",
          storageBucket: "XXXXXXXXXXXXXXX,
          messagingSenderId: "XXXXXXXXXXXXXXX",
          appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        };
        */


        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        const auth = getAuth();

        $("#register").on("click", function(){
            const email = $("#uname").val();
            const password = $("#password").val();

            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                $("#uname").val()="";
                $("#password").val()="";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
            $("#uname").val("");
            $("#password").val("");
        });

        $("#signin").on("click", function(){
            const email = $("#uname").val();
            const password = $("#password").val();

            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

        });
        
        $("#signout").on("click", function(){
            
            signOut(auth).then(() => {
            // Sign-out successful.
            alert("Sign-out successful")
            }).catch((error) => {
            // An error happened.
            });
        });

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                $("#msg").text(`${uid} Logged in`);
                $("#msg2").text(`${auth.currentUser.email}`);
                const html = "success.html";
                window.location.href=html;
                
            } else {
                // User is signed out
                $("#msg").text(`Logged out`);
            }
        });
