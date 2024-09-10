import React, { useState } from 'react';

import { TagsList } from './TagsList';
import { ArticlesList } from './ArticlesList';

import { ARTICLES } from './data';

const App = () => {
  // Handle state updates to the articles list
  const [articles, setArticles] = useState(ARTICLES);
  const [selectedTags, setSelectedTags] = useState([]);

  // Extract unique tags from articles
  const uniqueTags = articles.reduce((acc, article) => {
    article.tags.forEach((tag) => {
      const matchingTag = acc.find((t) => t.tag === tag);
      if (matchingTag) {
        matchingTag.count += 1;
        return;
      }
      acc.push({ tag, count: 1 });
    });

    return acc;
  }, []);

  // Maintain a list of selected tags
  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Update the articles state
  const handleTagRemove = (articleId, tag) => {
    const updatedArticles = articles.map((article) => {
      if (article.id === articleId) {
        return { ...article, tags: article.tags.filter((t) => t !== tag) };
      }
      return article;
    });
    setArticles(updatedArticles);
  };

  const filteredArticles =
    selectedTags.length > 0
      ? articles.filter((article) =>
          selectedTags.every((tag) => article.tags.includes(tag))
        )
      : articles;

  return (
    <div className="flex flex-col gap-5 mx-auto max-w-2xl p-10">
      <header className="flex flex-col gap-2">
        <span className="uppercase tracking-wide text-md text-indigo-500 font-semibold">
          Tags
        </span>
        <TagsList
          tags={uniqueTags}
          selectedTags={selectedTags}
          onTagClick={handleTagClick}
        />
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
