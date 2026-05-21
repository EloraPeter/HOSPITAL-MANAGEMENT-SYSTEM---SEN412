import React from 'react';
import { Outlet } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import { useUIStore } from '@/app/store';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const MainLayout: React.FC = () => {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div 
        className="d-flex flex-column flex-grow-1"
        style={{ 
          marginLeft: sidebarOpen ? '280px' : '80px',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-grow-1 bg-light p-4">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-top py-3 px-4">
          <Container fluid>
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                © {new Date().getFullYear()} Hospital Management System. All rights reserved.
              </small>
              <small className="text-muted">
                Version 1.0.0
              </small>
            </div>
          </Container>
        </footer>
      </div>
    </div>
  );
};