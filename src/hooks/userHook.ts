import {useAtom} from 'jotai';
import {userAtom} from '@/util/supabase';

export const useUser = () => {
  return useAtom(userAtom);
};