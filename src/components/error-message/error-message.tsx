import {useAppSelector} from '../../hooks/store';
import './error-message.css';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector((state) => state.offers.error);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

}

export { ErrorMessage };
