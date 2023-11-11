import { useState } from 'react';
import { SortTypes } from '../../const';
import classNames from 'classnames';
import { ServerOffer } from '../../types-ts/offer';

type SortProps = {
  activeSort: string;
  setActiveSort: React.Dispatch<React.SetStateAction<string>>;
};

export function CreateSortingOffers(activeSort: string, offers: ServerOffer[]) {
  switch (activeSort) {
    case SortTypes.PriceLowToHigh:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortTypes.PriceHighToLow:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortTypes.TopRatedFirst:
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
}

function Sort({ activeSort, setActiveSort }: SortProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);

  const toggleOptions = () => {
    setIsOpened(!isOpened);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        onClick={toggleOptions}
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
        {Object.keys(SortTypes).map((key) => (
          <li
            key={key}
            className={classNames('places__option', {
              'places__option--active':
                SortTypes[key as keyof typeof SortTypes] === activeSort,
            })}
            onClick={() => {
              setActiveSort(SortTypes[key as keyof typeof SortTypes]);
              toggleOptions();
            }}
            tabIndex={0}
          >
            {SortTypes[key as keyof typeof SortTypes]}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sort;
