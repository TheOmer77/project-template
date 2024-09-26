import { useState } from 'react';

import { HELLO_WORLD } from '@repo/shared';

import { apiClient } from '@/lib/api-client';

const App = () => {
  const [res, setRes] = useState<string>(),
    [loading, setLoading] = useState(false);

  const testBackend = async () => {
    setLoading(true);
    try {
      const res = await apiClient.index.$get();
      if (!res.ok)
        throw new Error(
          `Request failed${res.status ? ` with status code ${res.status}` : ''}`
        );
      const data = await res.json();
      setRes(JSON.stringify(data, undefined, 2));
    } catch (err) {
      setRes(
        `Error connecting to backend:\n${
          err instanceof Error ? err.message : err
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>{HELLO_WORLD}</h1>
      <button onClick={testBackend}>Test connection to backend</button>
      {(res || loading) && <pre>{loading ? 'Loading...' : res}</pre>}
    </>
  );
};

export default App;
