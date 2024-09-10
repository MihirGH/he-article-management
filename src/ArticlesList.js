import { TagButton } from './TagButton';

export const ArticlesList = ({ articles, onTagRemove }) => {
  return (
    <div className="flex flex-col gap-4">
      {articles.map((article) => (
        <div key={article.id}>
          <div className="flex flex-col gap-3 border rounded-md p-4 shadow-md">
            <span className="tracking-wide font-semibold text-md">
              {article.title}
            </span>
            <div className="flex items-center gap-1 font-light">
              <span className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Tags:
              </span>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <TagButton
                    key={tag}
                    disabled={article.tags.length === 1}
                    onClick={() => onTagRemove(article.id, tag)}
                  >
                    {tag} {'\u2A09'}
                  </TagButton>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
