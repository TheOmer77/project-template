import { useState } from 'react';

import { HELLO_WORLD } from '@theomer77/some-package';

const testBackend = async (): Promise<string> => {
  try {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL);
    return JSON.stringify(await res.json(), undefined, 2);
  } catch (err) {
    return `Error connecting to ${import.meta.env.VITE_BACKEND_URL}:\n${err}`;
  }
};

const App = () => {
  const [backendRes, setBackendRes] = useState<string>();

  return (
    <div>
      <h1>{HELLO_WORLD}</h1>
      <button onClick={() => testBackend().then(setBackendRes)}>
        Test connection to backend
      </button>
      {backendRes && <pre>{backendRes}</pre>}
    </div>
  );
};

export default App;
