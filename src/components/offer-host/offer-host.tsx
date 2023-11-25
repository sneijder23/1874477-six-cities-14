import { ServerOffer } from '../../types-ts/offer';

type OfferHostProps = {
  offerState: ServerOffer;
};

function OfferHost({offerState}: OfferHostProps) : JSX.Element {
  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
          <img
            className="offer__avatar user__avatar"
            src={offerState.host.avatarUrl}
            width="74"
            height="74"
            alt="Host avatar"
          />
        </div>
        <span className="offer__user-name">
          {offerState.host.name}
        </span>
        <span className="offer__user-status">
          {offerState.host.isPro}
        </span>
      </div>
      <div className="offer__description">
        <p className="offer__text">{offerState.description}</p>
      </div>
    </div>
  );
}

export { OfferHost };
