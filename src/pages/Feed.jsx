import PostCard from "../components/PostCard";

export default function Feed() {
  return (
    <main className="max-w-2xl mx-auto mt-6 px-4">
      <PostCard 
        username="Tarek Aloui"
        content="This is my first real GETC post"
      />
      <PostCard 
        username="iheb berhouma"
        content="Welcome to the community "
      />
       <PostCard 
        username="chahnez nahia"
        content="i love tarekkkkkkkkkkk"
      />
    </main>
  );
}
