import React from "react";
import Searchbar from "@/componenets/admin/user/searchbar/page";
import Blogwithdetail from "@/componenets/admin/user/userwithdetail/[page]/page";

const Users = () => {
  return (
    <>
      <div>
        <Searchbar />
      </div>
      <div className="border w-full h-[1px] border-gray-200 " />
      <div>
        <Blogwithdetail />
      </div>
    </>
  );
};

export default Users;
