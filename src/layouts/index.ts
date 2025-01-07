// # src/layouts/index.ts
import { FC, PropsWithChildren } from 'react'
import { AdminLayout } from './AdminLayout'
import { PublicLayout } from './PublicLayout'
import { LayoutType } from '../types/routing'

export const layouts: Record<LayoutType, FC<PropsWithChildren>> = {
  admin: AdminLayout,
  public: PublicLayout,
}