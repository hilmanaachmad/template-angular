import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Navigation',
    main: [
      {
        state: 'dashboard',
        main_state: 'admin',
        short_label: 'D',
        name: 'Dashboard',
        type: 'link',
        icon: 'ti-home'
      },



      {
        state: 'rencana\-\makan',
        name: 'Rencana Makan',
        type: 'sub',
        icon: 'ti-layout-grid2-alt',
        children: [
          {
            state: 'add',
            name: 'Add'
          },
          {
            state: 'list',
            name: 'List'
          }
        ]
      },
      {
        state: 'animations',
        name: 'Generate',
        type: 'link',
        icon: 'ti-reload rotate-refresh'
      }
    ],
  },
  
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
