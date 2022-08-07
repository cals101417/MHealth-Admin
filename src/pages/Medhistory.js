import * as FaIcons from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  addDoc,
} from "firebase/firestore";
import Sidebar from "../layout/Sidebar";
import { Header } from "../layout/Header";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import { async } from "@firebase/util";

export function Medhistory() {
  const [users, setUsers] = useState([]);
  const PatientCollection = collection(db, "users");

  useEffect(() => {
    async function getUsers() {
      const q = query(PatientCollection, orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const result = [];

        querySnapshot.forEach((doc) => {
          result.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setUsers(result);
      });
      return unsubscribe;
    }

    getUsers();
  }, []);

  const [progress, setProgress] = useState(0);

  const formHandler = async (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
    await addDoc(collection(db, "files"), {
      firstname: users.firstName,
      File: file,
    });
  };

  const uploadFiles = (file) => {
    //
    if (!file) return;
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className="flex bg-gray-100 w-full">
      <Sidebar />

      <div className="h-auto flex-1">
        <Header />

        {users.map((user) => {
          return (
            <div className="flex gap-6">
              {user.firstName}

              <button
                onClick={toggleModal}
                className="btn-modal bg-blue-700 p-3 text-xs rounded-full"
              >
                Send Certificate
              </button>
              {modal && (
                <div className="modal text-center mx-auto w-56 h-56 top-0 left-0 right-0 bottom-0 fixed">
                  <div className="overlay">
                    <div className="modal-content absolute top-1/3 p-2 bg-white rounded max-w-full min-w-56">
                      <h2>Hello Modal</h2>
                      {
                        <div>
                          <form onSubmit={formHandler}>
                            <input type="file" className="input" />
                            <button type="submit">Upload</button>
                          </form>
                          <hr />
                          <h2>Uploading done {progress}%</h2>
                        </div>
                      }
                      <button
                        className="close-modal py-12 cursor-pointer"
                        onClick={toggleModal}
                      >
                        CLOSE
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
