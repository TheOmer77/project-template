import { useState } from 'react';

import { HELLO_WORLD } from '@repo/shared';

import { apiClient } from '@/lib/api-client';

const testBackend = async () => {
  try {
    const res = await apiClient.index.$get();
    if (!res.ok)
      throw new Error(
        `Request failed${res.status ? ` with status code ${res.status}` : ''}`
      );
    const data = await res.json();
    return JSON.stringify(data, undefined, 2);
  } catch (err) {
    return `Error connecting to backend:\n${
      err instanceof Error ? err.message : err
    }`;
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
