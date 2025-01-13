import { FC, ReactNode } from 'react';
import { AdminLayout } from '../layouts/AdminLayout';
import { PublicLayout } from '../layouts/PublicLayout';

interface PageWrapperProps {
  defaultLayout: 'admin' | 'public';
  children: ReactNode;
}

export const PageWrapper: FC<PageWrapperProps> = ({ defaultLayout, children }) => {
  const Layout = defaultLayout === 'admin' ? AdminLayout : PublicLayout;

  return (
    <Layout>
      {children}
    </Layout>
  );
};