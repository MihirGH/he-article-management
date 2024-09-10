import { TagButton } from './TagButton';

export const ArticlesList = ({ articles }) => {
  return (
    <div className="flex flex-col gap-3">
      {articles.map((article) => (
        <div key={article.id}>
          <h3 className="text-xl">{article.title}</h3>
          <div className="flex items-center gap-1">
            <strong>Tags: </strong>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <TagButton key={tag}>
                  {tag} {'\u2A09'}
                </TagButton>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
