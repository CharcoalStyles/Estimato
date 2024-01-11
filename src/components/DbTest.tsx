import { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from '@/util/schema';

type Test = Database['public']['Tables']['test']['Row'];


const DbTest = () => {
  const [records, setRecords] = useState<Array<Test>>([]);

  const supabase = useSupabaseClient<Database>()

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const { data, error } = await supabase.from('test').select('*');
        if (error) {
          console.error('Error fetching records:', error);
          throw error;
        }
        setRecords(data);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchRecords();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold">Records</h1>
      <ul>
        {records.map((record) => (
          <li key={record.id}>{record.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default DbTest;
