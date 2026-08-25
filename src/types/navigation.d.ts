import { ReactElement } from 'react';

export interface IRoute {
  name: string;
  layout: string;
  icon?: ReactElement | string;
  secondary?: boolean;
  path: string;
  category?: string;
  badge?: string | number;
  badgeColor?: string;
}
