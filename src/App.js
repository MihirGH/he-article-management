import React, { useState } from 'react';

import { TagsList } from './TagsList';
import { ArticlesList } from './ArticlesList';

import { ARTICLES } from './data';

const App = () => {
  // TODO: Handle state updates to the articles list
  const [articles] = useState(ARTICLES);

  // TODO: Extract unique tags from articles
  const uniqueTags = [
    { tag: 'history', count: 2 },
    { tag: 'english', count: 2 },
    { tag: 'french', count: 3 },
    { tag: 'fiction', count: 1 },
    { tag: 'mystery', count: 1 },
    { tag: 'love', count: 1 },
  ];

  // TODO: Implement this
  const handleTagClick = () => {};

  // TODO: Implement this
  const handleTagRemove = () => {};

  const filteredArticles = articles;

  return (
    <div className="flex flex-col gap-5 mx-auto max-w-2xl p-10">
      <header className="flex flex-col gap-2">
        <span className="uppercase tracking-wide text-md text-indigo-500 font-semibold">
          Tags
        </span>
        <TagsList tags={uniqueTags} onTagClick={handleTagClick} />
      </header>

      <main className="flex flex-col gap-2">
        <span className="uppercase tracking-wide text-md text-indigo-500 font-semibold">
          Articles
        </span>
        <ArticlesList
          articles={filteredArticles}
          onTagRemove={handleTagRemove}
        />
      </main>
    </div>
  );
};

export default App;
