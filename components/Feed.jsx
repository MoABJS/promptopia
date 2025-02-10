"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PromptCardList = ({ data, handleTagClick, goToProfile }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          goToProfile={goToProfile}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    const filteredPostsResults = posts.filter(
      (post) =>
        post.tag.toLowerCase().includes(searchValue) ||
        post.creator.username.toLowerCase().includes(searchValue)
    );
    // console.log(filteredPostsResults);
    setFilteredPosts(filteredPostsResults);
  };

  const handleTagClick = (post) => {
    setSearchText(post);
  };

  const goToProfile = (id) => {
    console.log(session);
    if (session?.user?.id === id) {
      return router.push("/profile");
    }
    router.push(`/profile/${id}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      console.log(data);
      setPosts(data);
      setFilteredPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={filteredPosts}
        handleTagClick={handleTagClick}
        goToProfile={goToProfile}
      />
    </section>
  );
};

export default Feed;
