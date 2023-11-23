import { memo } from 'react';
import { ClipLoader } from 'react-spinners';

function LoadingScreenMemo(): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div>
        <p style={{ fontSize: 36, color: '#333333' }}>Loading ...</p>
        <div style={{ marginTop: 20, marginLeft: 34 }}>
          <ClipLoader color="#3671d6" loading size={100} />
        </div>
      </div>
    </div>
  );
}

export const LoadingScreen = memo(LoadingScreenMemo);
