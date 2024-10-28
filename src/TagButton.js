import cn from 'classnames';

export const TagButton = ({ children, disabled, onClick, isSelected }) => (
  <button
    type="button"
    disabled={disabled}
    className={cn('border px-2 py-0.5 rounded hover:border-blue-400', {
      'border-blue-400': isSelected,
    })}
    onClick={onClick}
  >
    {children}
  </button>
);
