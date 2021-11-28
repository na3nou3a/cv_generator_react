import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Cv from './Cv';

const AppContext = React.createContext();

const Main = () => {
  const [previewMode, setPreviewMode] = useState(false);
  const editCv = () => {
    return setPreviewMode(false);
  };
  const previewCv = () => {
    return setPreviewMode(true);
  };
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({ content: () => componentRef.current });

  if (previewMode) {
    return (
      <main>
        <AppContext.Provider
          value={{
            previewMode,
          }}
        >
          <Cv ref={componentRef} />
          <button type='button' className='btn btn-center' onClick={editCv}>
            edit
          </button>

          <button
            type='button'
            className='btn btn-center'
            onClick={() => {
              componentRef.current.classList.add('print');
              return handlePrint();
            }}
          >
            Download
          </button>
        </AppContext.Provider>
      </main>
    );
  }

  return (
    <main>
      <AppContext.Provider
        value={{
          previewMode,
        }}
      >
        <Cv ref={componentRef} />
        <button type='button' className='btn btn-center' onClick={previewCv}>
          preview
        </button>
      </AppContext.Provider>
    </main>
  );
};

export { AppContext };
export default Main;
