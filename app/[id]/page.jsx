"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";

const ViewProfile = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      console.log(data);
      setPosts(data);
      setUsername(data[0].creator.username);
    };

    if (userId) fetchPosts();
  }, []);

  return (
    <Profile
      name=""
      desc={`Welcome to ${username}'s personalized profile page`}
      data={posts}
    />
  );
};

export default ViewProfile;
