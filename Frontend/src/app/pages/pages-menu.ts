import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
		title: 'Scan an IP address',
    icon: 'search',
    link: '/pages/scan'
		// children: [
		// 	{
		// 		title: 'Savings',
		// 		link: '/pages/expenses-management/savings',
		// 	},
		// ],
	},
];
