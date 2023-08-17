import React from "react";
import Posts from "./Posts";

export default function Feed() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-6xl mx-auto">
      <section className="md:col-span-2">
        <Posts />
      </section>
    </main>
  );
}
