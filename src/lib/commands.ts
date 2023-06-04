import {Navigate} from "@ngxs/router-plugin";
import {DeleteRowDialog} from "./table-page/table.store";

interface Command {
  icon: string
  title: string
  type: string
  process: (module: string, tableKey: string, uid: string) => {}
}

export const COMMANDS_MAP: { [key: string]: Command } = {
  delete: {
    icon: '/assets/icons/01-Interface-Essential/43-Remove-Add/remove-bold.svg',
    title: 'Delete', type: 'delete',
    process: (module, tableKey, uid) => {
      return new DeleteRowDialog( tableKey,  uid)
    }
  },
  edit: {
    icon: '/assets/icons/11-Content/01-Content-Creation/content-browser-edit.svg',
    title: 'Edit', type: 'edit',
    process: (module, tableKey, uid) => {
      return new Navigate([module, tableKey, uid, 'form'])
    }
  },
  show: {
    icon: '/assets/icons/11-Content/05-Newspapers/newspaper.svg',
    title: 'Show', type: 'show',
    process: (module, tableKey, uid) => {
      return new Navigate([module, tableKey,  uid,'editor'],undefined,{preserveFragment:true})
    }
  }
};
