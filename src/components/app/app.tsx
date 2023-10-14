import MainScreen from '../../pages/main/main';
import { CARDS_COUNT } from '../../const';

function App(): JSX.Element {
  return (
    <MainScreen cardsCount={CARDS_COUNT} />
  );
}

export default App;
