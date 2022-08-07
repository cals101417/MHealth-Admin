import * as FaIcons from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  updateDoc,
  doc,
  onSnapshot,
  query,
  limit,
  addDoc,
  orderBy,
  where,
  deleteDoc,
} from "firebase/firestore";
import Sidebar from "../../layout/Sidebar";
import { Header } from "../../layout/Header";

export function Assesmentcancelled() {
  const [assessment, setAssessment] = useState([]);
  const AssesmentCollection = collection(db, "book_assessment");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(null);
  const [asc, setAsc] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function getAssessment() {
      const q = query(
        AssesmentCollection,
        where("assessmentStatus", "==", "Cancelled"),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const result = [];

        querySnapshot.forEach((doc) => {
          result.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setAssessment(result);
      });
      return unsubscribe;
    }

    getAssessment();
  }, []);

  useEffect(() => {
    let result = [];

    if (!search && !sort) {
      result = assessment;
    }

    const searchValue = search.toLowerCase();

    if (searchValue) {
      result = filteredData.filter((u) => {
        return (
          u.lastName.toLowerCase().includes(searchValue) ||
          u.firstName.toLowerCase().includes(searchValue) ||
          u.assessmentStatus.toLowerCase().includes(searchValue) ||
          u.address.toLowerCase().includes(searchValue) ||
          u.time.toLowerCase().includes(searchValue) ||
          u.date.toLowerCase().includes(searchValue)
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
  }, [search, sort, asc, assessment]);

  const handleReset = () => {
    setSort("");
  };

  const deleteBook = async (id) => {
    const assessmentDoc = doc(db, "book_assessment", id);
    await deleteDoc(assessmentDoc);
  };

  return (
    <div className="flex bg-gray-100 w-full">
      <Sidebar />

      <div className="h-auto flex-1">
        <Header />

        <div className="mx-16 my-12 flex justify-around pb-12 drop-shadow-md bg-white">
          <div id="Pending">
            {" "}
            <h1 className="px-16 py-6 text-black font-bold text-xl ">
              Cancelled Assessment
            </h1>
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
                  <option value="time">Time</option>
                  <option value="date">Date</option>
                  <option value="address">Address</option>
                </select>
                <button
                  className="mb-8 px-4 mt-2 bg-gray-100 rounded"
                  disabled={!sort}
                  onClick={(e) => setAsc(!asc)}
                >
                  {asc ? (
                    <FaIcons.FaSortAlphaUp />
                  ) : (
                    <FaIcons.FaSortAlphaDown />
                  )}
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
                    placeholder="Search .."
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex lg:px-16 ">
              <div className="container mx-auto w-full  drop-shadow-xs">
                <div className="w-full overflow-hidden rounded shadow-lg">
                  <div className="w-full overflow-y-auto overflow-hidden h-[600px] overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-gray-300 scrollbar-track-white">
                    <table className="w-full text-base">
                      <thead>
                        <tr className=" font-semibold tracking-wide text-left text-white bg-hover-color uppercase border-b border-gray-600">
                          <th className="px-4 py-3 w-[900px]">Name</th>
                          <th className="px-4 py-3 w-96">Time</th>
                          <th className="px-4 py-3 w-96">Date</th>
                          <th className="px-4 py-3 w-96">Address</th>
                          <th className="px-4 py-3 w-56">Status</th>
                          <th className="px-4 py-3 w-28">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((assessmentBook) => {
                          return (
                            <tr
                              className="text-gray-700 border-gray-200 border-b"
                              key={assessmentBook.id}
                            >
                              <td className="px-6 py-3 ">
                                <div className="flex justify-start">
                                  <div>
                                    <img
                                      src={`data:image/jpeg;base64,${assessmentBook.senderImage}`}
                                      className="avatar w-10 h-10 rounded-full border object-cover lg:mr-8"
                                    />
                                  </div>
                                  <div className="py-2 hidden lg:block">
                                    <span>
                                      {assessmentBook.firstName},&nbsp;
                                      {assessmentBook.middleName}&nbsp;
                                      {assessmentBook.lastName}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                {assessmentBook.time}
                              </td>
                              <td className="px-4 py-3">
                                {assessmentBook.date}
                              </td>
                              <td className="px-4 py-3">
                                {assessmentBook.address}
                              </td>
                              <td className="px-4 py-3">
                                {assessmentBook.assessmentStatus}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex justify-around gap-6">
                                  <button
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          "Are you sure to Delete this booking?"
                                        )
                                      ) {
                                        deleteBook(assessmentBook.id);
                                      }
                                    }}
                                  >
                                    <FaIcons.FaTrash className="text-xl text-red-500" />
                                  </button>
                                </div>
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
    </div>
  );
}
