import React from "react";
import { Header } from "../layout/Header";
import Sidebar from "../layout/Sidebar";

export function Home() {
  return (
    <div className="flex bg-gray-100 w-full">
      <Sidebar />

      <div className="h-auto flex-1">
        <Header />

        <div></div>
        <div className="lg:flex py-12 justify-between px-20">
          <div className="bg-white p-6">
            <div className="py-20 p-16">Patient List</div>
          </div>
          <div className="bg-white p-6">
            <div className="py-20 p-16">Latest Bookings</div>
          </div>
          <div className="bg-white p-6">
            <div className="py-20 p-16">Recent Conversations</div>
          </div>
        </div>
        <div className="flex py-12 px-20 ">
          <div className="w-full bg-white p-12">
            <div className="py-28 p-16">Recent Conversations</div>
          </div>
        </div>
      </div>
    </div>
  );
}
