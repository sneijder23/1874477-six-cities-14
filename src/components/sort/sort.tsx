import { memo, useState } from 'react';
import { SortType } from '../../const';
import classNames from 'classnames';
import { ServerOffer } from '../../types-ts/offer';

type SortProps = {
  activeSort: string;
  setActiveSort?: React.Dispatch<React.SetStateAction<string>>;
};

type SortTypeKey = keyof typeof SortType;

export function CreateSortingOffers(activeSort: string, offers: ServerOffer[]) {
  switch (activeSort) {
    case SortType.PriceLowToHigh:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortType.PriceHighToLow:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortType.TopRatedFirst:
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
}

function SortComponent({ activeSort, setActiveSort }: SortProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);

  const handleToggleOptions = () => {
    setIsOpened(!isOpened);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        onClick={handleToggleOptions}
        tabIndex={0}
      >
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={classNames('places__options', 'places__options--custom', {
          'places__options--opened': isOpened,
        })}
      >
        {Object.keys(SortType).map((key) => (
          <li
            key={key}
            className={classNames('places__option', {
              'places__option--active':
                SortType[key as SortTypeKey] === activeSort,
            })}
            onClick={() => {
              setActiveSort?.(SortType[key as SortTypeKey]);
              handleToggleOptions();
            }}
            tabIndex={0}
            data-testid='sort-item'
          >
            {SortType[key as SortTypeKey]}
          </li>
        ))}
      </ul>
    </form>
  );
}

export const Sort = memo(SortComponent);
