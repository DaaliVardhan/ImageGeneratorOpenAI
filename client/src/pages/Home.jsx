import React, { useState, useEffect } from "react";
import { Loader, Card, FormField } from "../components";
const SERVER_URL="https://imagegenerator-2a8h.onrender.com";

const RenderCards = ({data,title}) =>{

  if(data?.length > 0) return data.map((post)=> <Card key={post._id} {...post}/>)
  return <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
}


const Home = () => {
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/save`);
        if(!response.ok) return alert("something went wrong")
        const data = await response.json();
        if (data.success) {
          setAllPosts(data.data.reverse());
          setLoading(false);
        }
      } catch (error) {
        alert(error);
      }finally{
        setLoading(false)
      }
    }
    fetchPosts()
    return () => {
      setLoading(false)
    }
  }, [])
  

  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [searchText, setSearchText] = useState("")
  const [searchTimeout, setSearchTimeout] = useState(null)
  const handleSearch = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(

      setTimeout(() =>{const Results= allPosts.filter((post)=>{ return post.prompt.toLowerCase().includes(searchText.toLowerCase()) || post.name.toLowerCase().includes(searchText.toLowerCase())})
        setSearchResults(Results);
      },500)
    )
    
      
    
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#333328] text-[32px]">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#666275] text-[14px] max-w-[500px]">
          Browse through a collection of imaginative and visually stunning
          images generated by DALL-E AI
        </p>
      </div>
      <div className="mt-16">
        <FormField labelName="Search Post" name="text" type="text" placeholder="Search post" value={searchText} handleChange={handleSearch}/>
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center"><Loader /></div>) : (<>
            {(searchText && (<h1 className="font-meduim text-[#666e75] text-xl mb-3">
              Showing results for <span className="text-[#222328]">"{searchText}"</span>
            </h1>))}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 ">
              {searchText ? (
                <RenderCards data={searchResults} title="No search results found"/>
              ) : <RenderCards data={ allPosts} title="No posts found" />}
            </div>
          </>)}
      </div>
      
    </section>
  );
};

export default Home;
Home;
