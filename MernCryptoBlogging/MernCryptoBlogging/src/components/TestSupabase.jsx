import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

const TestSupabase = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Test connection by fetching settings
        const { data, error } = await supabase
          .from('settings')
          .select('*')
          .limit(1);

        if (error) {
          setError(error.message);
        } else {
          setData(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4">Testing Supabase connection...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Supabase Connection Test</h2>
      {data && data.length > 0 ? (
        <div className="bg-green-100 p-4 rounded">
          <p className="text-green-800">✅ Successfully connected to Supabase!</p>
          <p className="text-green-800">Site name: {data[0].site_name}</p>
        </div>
      ) : (
        <div className="bg-yellow-100 p-4 rounded">
          <p className="text-yellow-800">⚠️ Connected to Supabase but no data found</p>
        </div>
      )}
    </div>
  );
};

export default TestSupabase;