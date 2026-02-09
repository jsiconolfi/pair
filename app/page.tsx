'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Claude } from '@lobehub/icons';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#1A1A1A'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg, #CC785C, #D4926F)',
          borderRadius: '16px',
          margin: '0 auto 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Claude size={32} color="white" />
        </div>
        <div style={{ fontSize: '24px', fontWeight: '500', color: '#FFFFFF', marginBottom: '8px' }}>Forge</div>
        <div style={{ fontSize: '14px', color: '#8C8C8C' }}>Loading...</div>
      </div>
    </div>
  );
}