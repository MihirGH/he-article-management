import cn from 'classnames';

export const TagButton = ({ children, isSelected }) => (
  <button
    type="button"
    className={cn('border px-2 py-0.5 rounded hover:border-blue-400', {
      'border-blue-400': isSelected,
    })}
  >
    {children}
  </button>
);
