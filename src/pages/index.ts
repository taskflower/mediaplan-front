import { lazy, ComponentType, LazyExoticComponent } from 'react'

type PagesType = {
  [key: string]: {
    [key: string]: LazyExoticComponent<ComponentType>
  }
}

export const pages: PagesType = {
  admin: {
    'dashboard': lazy(() => import('./admin/Dashboard')),
    'websites': lazy(() => import('./admin/Websites')),
    'website/:id': lazy(() => import('./admin/WebsiteDetails')),
    'campaigns': lazy(() => import('./admin/Campaigns')),
    'campaign/:id': lazy(() => import('./admin/CampaignDetails')),
    'campaigns/new': lazy(() => import('./admin/NewCampaign')),
    'analytics': lazy(() => import('./admin/Analytics')),
    'users': lazy(() => import('./admin/Users')),
  },
  public: {
    'home': lazy(() => import('./public/Home')),
    'about': lazy(() => import('./public/About')),
    'login': lazy(() => import('./public/Login')),
    'url-analysis-step1': lazy(() => import('./public/url-analysis/Step1')),
    'url-analysis-step2': lazy(() => import('./public/url-analysis/Step2')),
    'url-analysis-step3': lazy(() => import('./public/url-analysis/Step3')),
    'url-analysis-step4': lazy(() => import('./public/url-analysis/Step4')),
    'url-analysis-processing': lazy(() => import('./public/url-analysis/Processing')),
  }
}