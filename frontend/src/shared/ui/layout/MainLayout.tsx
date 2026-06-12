import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/widgets/sidebar/Sidebar';
import { Header } from '@/widgets/header/Header';
import { Container } from 'react-bootstrap';
import { useUIStore } from '@/app/store/uiStore';

export const MainLayout: React.FC = () => {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div 
        className="d-flex flex-column flex-grow-1"
        style={{ 
          marginLeft: sidebarOpen ? '280px' : '0',
          transition: 'margin-left 0.3s ease',
          minHeight: '100vh',
        }}
      >
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-grow-1 bg-light">
          <Container fluid className="p-3 p-md-4">
            <Outlet />
          </Container>
        </main>

        {/* Footer */}
        <footer className="bg-white border-top py-3 px-3 px-md-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
            <small className="text-muted">
              © {new Date().getFullYear()} MediCare Pro. All rights reserved.
            </small>
            <div className="d-flex gap-3">
              <small className="text-muted">Version 1.0.0</small>
              <small className="text-muted d-none d-md-block">|</small>
              <small className="text-muted">Privacy Policy</small>
              <small className="text-muted d-none d-md-block">|</small>
              <small className="text-muted">Terms of Service</small>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};