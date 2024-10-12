'use client';

import { useState } from 'react';

import { HELLO_WORLD } from '@repo/shared';

import { apiClient } from '@/lib/api-client';

const Page = () => {
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
    <div>
      <h1 className='mb-6 text-5xl font-bold tracking-tight'>{HELLO_WORLD}</h1>
      <button
        className='inline-flex h-10 cursor-default items-center justify-center whitespace-nowrap rounded-lg border bg-btn px-4 text-sm font-medium shadow ring-offset-background transition-colors hover:bg-btn-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2'
        onClick={testBackend}
      >
        Test connection to backend
      </button>
      {(res || loading) && (
        <pre className='mt-4 rounded-lg bg-surface/50 p-4'>
          {loading ? 'Loading...' : res}
        </pre>
      )}
    </div>
  );
};

export default Page;
