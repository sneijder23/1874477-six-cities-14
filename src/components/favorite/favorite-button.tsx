import classNames from 'classnames';
import { memo } from 'react';

interface FavoriteButtonProps {
  className?: string;
  bigIcon?: boolean;
  isAuth: boolean;
  isActive: boolean;
  handleFavoriteClick: () => void;
}

function FavoriteButtonComponent({className, bigIcon, isAuth, isActive, handleFavoriteClick}: FavoriteButtonProps) {
  const isActiveButton = isActive && isAuth;
  const iconText = `${isActiveButton ? 'In' : 'To'} bookmarks`;
  const width = bigIcon ? '31' : '18';
  const height = bigIcon ? '33' : '19';
  const iconStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };
  const classNameButton = className ? `${className}` : 'place-card';

  return (
    <button
      className={classNames(`${classNameButton}__bookmark-button`, `${classNameButton}__button`, 'button', {
        [`${classNameButton}__bookmark-button--active`]: isActiveButton,
      })}
      type="button"
      onClick={handleFavoriteClick}
    >
      <svg className={`${classNameButton}__bookmark-icon`} style={iconStyle}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{iconText}</span>
    </button>
  );
}

export const FavoriteButton = memo(FavoriteButtonComponent);
