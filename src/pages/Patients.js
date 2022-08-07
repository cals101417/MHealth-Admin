import * as FaIcons from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  Timestamp,
  query,
  onSnapshot,
  orderBy,
  addDoc,
} from "firebase/firestore";
import Sidebar from "../layout/Sidebar";
import { Header } from "../layout/Header";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../firebase";
import { async } from "@firebase/util";
import { Link } from "react-router-dom";

export function Patients() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [examtype, setExamtype] = useState("");
  const PatientCollection = collection(db, "users");
  const [sort, setSort] = useState(null);
  const [asc, setAsc] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [file, setFile] = useState(null);
  const [modal, setModal] = useState(false);

  const toggleModal = (user) => {
    setModal(!modal);
    // set selectedUser to user
    setSelectedUser(user);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  // FIle Upload
  const handleFileUpload = (e) => {
    e.preventDefault();
    console.log(file);
    console.log(selectedUser.id);

    const now = Date.now();
    const ext = file.name.substr(
      file.name.lastIndexOf(".") + 1,
      file.name.length
    );
    const fileName = `${now}_Medical_cert_${selectedUser.lastName.toLowerCase()}.${ext}`;

    const storageRef = ref(storage, `files/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log("Upload is " + progress + "% done");
        if (progress == 100) {
          alert("File Uploaded");
          setModal(!modal);
        }
      },
      (error) => {
        console.error(error.message);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          // create file
          addMedicalCertificate(selectedUser, fileName, downloadURL);
        });
      }
    );
  };

  // Add data to Firestore
  const addMedicalCertificate = (user, fileName, downloadUrl) => {
    const filesRef = collection(db, "Certificates");
    addDoc(filesRef, {
      id: user.id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      TypeOfExam: examtype,
      file: fileName,
      url: downloadUrl,
      createdAt: Timestamp.fromDate(new Date()),
    })
      .then((r) => {
        console.log(r);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Fetch Patients Data
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

  // Search and Filter Condition
  useEffect(() => {
    let result = [];

    if (!search && !sort) {
      result = users;
    }

    const searchValue = search.toLowerCase();

    if (searchValue) {
      result = filteredData.filter((u) => {
        return (
          u.lastName.toLowerCase().includes(searchValue) ||
          u.firstName.toLowerCase().includes(searchValue) ||
          u.middleName.toLowerCase().includes(searchValue) ||
          u.email.toLowerCase().includes(searchValue) ||
          u.address.toLowerCase().includes(searchValue) ||
          u.contactNumber.toLowerCase().includes(searchValue)
        );
      });
    }

    if (sort) {
      result = filteredData.sort((a, b) => {
        if (a[`${sort}`] > b[`${sort}`]) {
          return asc ? 1 : -1;
        }
        if (a[`${sort}`] < b[`${sort}`]) {
          return asc ? -1 : 1;
        }
        return 0;
      });
    }

    setFilteredData(result);
  }, [search, sort, asc, users]);

  const handleReset = () => {
    setSort("");
  };

  return (
    <div className="flex bg-gray-100 w-full">
      <Sidebar />

      <div className="h-auto flex-1">
        <Header />

        <div className="mx-16 my-12 pb-12 drop-shadow-md bg-white">
          <div className="flex justify-between">
            <div>
              <h1 className="pl-16 py-6 text-black font-bold text-xl ">
                Registered Patients
              </h1>
            </div>
          </div>
          <hr />
          <div className="flex justify-between pt-12 lg:px-16">
            <div className="flex gap-2">
              <FaIcons.FaFilter className="w-20 h-6 mt-2" />
              <select
                onChange={(e) => setSort(e.target.value)}
                className="px-4 w-full mb-8 mt-2 rounded-md focus:border-gray-500 
                bg-gray-50 border-2 bfocus:bg-white focus:ring-0 text-sm"
              >
                <option value="">Select Filter ...</option>
                <option value="lastName">Lastname</option>
                <option value="firstName">Firstname</option>
                <option value="contactNumber">Contact Number</option>
                <option value="email">Email</option>
                <option value="address">Address</option>
              </select>
              <button
                className="mb-8 px-4 mt-2 bg-gray-100 rounded"
                disabled={!sort}
                onClick={(e) => setAsc(!asc)}
              >
                {asc ? <FaIcons.FaSortAlphaUp /> : <FaIcons.FaSortAlphaDown />}
              </button>
              <button
                onClick={handleReset}
                className="mb-8 px-4 mt-2 bg-green-700 rounded text-white"
              >
                Reset
              </button>
            </div>
            <div className="mb-3 xl:w-96">
              <div className=" flex input-group relative flex items-stretch mb-4">
                <FaIcons.FaSearch className="relative justify-end w-10 p-2 h-10 border-2 border-solid border-gray-300 " />
                <input
                  type="search"
                  className="form-control relative flex-auto w-96 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-b-2 border-r-2 border-t-2 border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                  placeholder="Search.."
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          {modal && (
            <div className="modal flex text-center top-0 left-0 right-0 bottom-0 fixed">
              <div className="overlay flex justify-center">
                <div className="modal-content absolute top-1/4 p-6 bg-white rounded max-w-full min-w-96">
                  <div className="flex justify-end">
                    <button
                      className="close-modal justify-end mx-2 text-white rounded bg-red-700 text-xl mb-2 cursor-pointer"
                      onClick={toggleModal}
                    >
                      <FaIcons.FaRegWindowClose className="" />
                    </button>
                  </div>
                  <h1 className="mb-2">Medical certificate for </h1>
                  <span className="bg-green-700 p-2 text-white rounded-lg">
                    {`${selectedUser.firstName} ${selectedUser.lastName}`}
                  </span>
                  <select
                    onChange={(e) => setExamtype(e.target.value)}
                    className="p-4 w-full mb-6 mt-12 text-sm mt-2 rounded-md focus:border-gray-500 
                bg-gray-50 border-2 bfocus:bg-white gap-y-2 focus:ring-0 text-sm"
                  >
                    <option value="">Type of Exam/Training ...</option>
                    <option
                      className="text-md"
                      value="Counselling & Psychotherapy"
                    >
                      Counselling & Psychotherapy
                    </option>
                    <option
                      className="text-md"
                      value="Psychotherapy Assessment"
                    >
                      Psychotherapy Assessment
                    </option>
                    <option className="text-md" value="Seminar & Trainings">
                      Seminar & Training
                    </option>
                  </select>
                  <div className="flex justify-start gap-2">
                    <div>
                      <input
                        type="file"
                        className="form-control relative flex-auto block px-3 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding  border-solid border-2 border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                        placeholder="Search.."
                        onChange={handleFileChange}
                      />
                    </div>
                    <div>
                      <button
                        disabled={!file}
                        onClick={handleFileUpload}
                        className="bg-blue-700 py-2.5 px-3 text-white hover:bg-blue-500"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex lg:px-16 ">
            <div className="container mx-auto w-full bg-gray-50 drop-shadow-xs">
              <div className="w-full overflow-hidden rounded shadow-lg">
                <div className="w-full overflow-y-auto overflow-hidden h-[600px] overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-gray-300 scrollbar-track-white">
                  <table className="w-full text-base">
                    <thead>
                      <tr className=" font-semibold tracking-wide text-left text-white bg-hover-color uppercase border-b border-gray-600">
                        <th className="px-4 py-3 w-[900px]">Name</th>
                        <th className="px-4 py-3 w-96">Contact Number</th>
                        <th className="px-4 py-3 w-96">Email</th>
                        <th className="px-4 py-3 w-96">Address</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredData.map((user) => {
                        return (
                          <tr
                            className="text-gray-700 border-gray-200 border-b"
                            key={user.id}
                          >
                            <td className="px-6 py-3 ">
                              <div className="flex justify-start">
                                <div>
                                  <img
                                    src={`data:image/jpeg;base64,${user.image}`}
                                    className="avatar w-10 h-10 rounded-full border object-cover lg:mr-8"
                                  />
                                </div>
                                <div className="py-2 hidden lg:block">
                                  <span>
                                    {user.firstName}&nbsp;
                                    {user.middleName}&nbsp;
                                    {user.lastName}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">{user.contactNumber}</td>
                            <td className="px-4 py-3">{user.email}</td>
                            <td className="px-4 py-3">{user.address}</td>
                            <td className="px-4 py-3 w-56">
                              <button
                                onClick={() => toggleModal(user)}
                                className="flex gap-1 w-auto text-xs text-white bg-blue-500 hover:bg-blue-400 px-2 py-2 rounded-full"
                              >
                                <FaIcons.FaFileUpload className="mt-0.5 text-purple-200 " />{" "}
                                Send Certificate
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
