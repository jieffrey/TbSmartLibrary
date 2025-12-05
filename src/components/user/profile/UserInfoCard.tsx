'use client';
import React, { useState, useEffect } from 'react';
// import { useModal } from '../../hooks/useModal';
// import { Modal } from '../ui/modal';
// import Button from '../ui/button/Button';
// import Input from '../form/input/InputField';
// import Label from '../form/Label';
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   console.error('Missing Supabase environment variables');
// }

// const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function UserInfoCard() {
  // const { isOpen, openModal, closeModal } = useModal();
  // const [firstName, setFirstName] = useState('Loading...');
  // const [lastName, setLastName] = useState('Loading...');
  // const [userEmail, setUserEmail] = useState('Loading...');
  // const [userPhone, setUserPhone] = useState('Loading...');
  // const [loading, setLoading] = useState(true);

  

  return (
    <div className="rounded-2xl border border-gray-200 p-5 dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="font-inter text-lg font-bold text-green-700 lg:mb-6">
            Informasi Pribadi
          </h4>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Nama awal
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Nama akhir
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Alamat email
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Nomor Handphone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}