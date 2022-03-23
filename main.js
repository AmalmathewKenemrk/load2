import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"; // TODO: Add SDKs for Firebase products that you want to use
import {
  collection,
  addDoc,
  setDoc,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQtaJ_QlWeoN6fC4Khc4p6h85wOlY-xBY",
  authDomain: "myguider-a5503.firebaseapp.com",
  projectId: "myguider-a5503",
  storageBucket: "myguider-a5503.appspot.com",
  messagingSenderId: "516451138237",
  appId: "1:516451138237:web:fc6d5929e28d7bc59115d4",
  measurementId: "G-3DQ02VR50T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
///popup
// function openTheForm() {
//   document.getElementById("popupForm").style.display = "block";
// }

// function closeTheForm() {
//   document.getElementById("popupForm").style.display = "none";
// }





//email
document.getElementById("contact_btn").onclick = function () {
  var e_name = document.getElementById("mail_name").value;
  var e_mail = document.getElementById("mail_email").value;
  var e_subject = document.getElementById("mail_subject").value;
  var e_message = document.getElementById("mail_message").value;
  sendmail(e_name, e_mail, e_subject, e_message);
};

function sendmail(e_name, e_mail, e_subject, e_message) {
  var templateParams = {
    subject: e_subject,
    to_name: "My Guider(Little Flower)",
    email: e_mail,
    from_name: e_name,
    message: e_message,
  };

  emailjs.send("service_sgqmn6m", "template_l2picoq", templateParams).then(
    function (response) {
      alert("Message send");
      location.reload();
      console.log("SUCCESS!", response.status, response.text);
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
}

document.getElementById("btn_reg").onclick = function () {
  register();
};

let order = "";

const docRef = doc(db, "order", "order");
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
  order = docSnap.data();
  order = order.order;
  order = parseInt(order) + 1;
} else {
  order = 1000000;
}

function register() {
  var name = document.getElementById("reg_name").value;
  var mobile = document.getElementById("reg_number").value;
  var school = document.getElementById("scl/cl").value;
  var g_num = document.getElementById("g_num").value;
  var district = document.getElementById("district").value;
  var c_stream = document.getElementById("c_stream").value;
  var p_course = document.getElementById("p_course").value;
  var e_mark = document.getElementById("e_mark").value;
  var level = document.getElementById("level").value;
  const date = new Date();

  // try {
  //   await
  if (
    name === "Student Name" ||
    mobile === "Number" ||
    school === "School/College" ||
    district === "" ||
    c_stream === "" ||
    p_course === "Preffered Course" ||
    e_mark === ""||
    level===""
  ) {
    alert("Complete the fields");
  } else {
    addDoc(collection(db, "candidates"), {
      name: name,
      number: mobile,
      c_school: school,
      g_num: g_num,
      district: district,
      c_stream: c_stream,
      p_course: p_course,
      e_mark: e_mark,
      date: date,
      level:level,
      order: order.toString(),
    })
      .then(() => {
        setDoc(doc(db, "order", "order"), {
          order: order,
        });
      })
      .then(() => {
        alert("Data Uploaded");
        location.reload();
      })
      .catch((error) => {
        alert("Error Upload document: ", error);
      });
  }

  // } catch (e) {
  //   console.error("Error adding document: ", e);
  // }
}
