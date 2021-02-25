export interface IDataItem {
  text: string;
  done: boolean;
  date: string;
  id?: number;
}

export interface IAppProps {
  todayTodos?: IDataItem[];
  notDoneTodos?: IDataItem[];
  addTodo?: any;
  getTodos?: any;
  getAllNotDoneTodos?: any;
  langData?: ILangTextList;
}
export interface ILangTextList {
  addBtnText: string;
  placeholder: string;
  modalTitle: string;
  showAll: string;
  cancelBtnText: string;
  okBtnText: string;
}

export interface ILangData {
  [lang: string]: ILangTextList;
}

export interface ICustomListItemProps {
    item?: IDataItem;
    removeTodo: any;
    doneTodo: any;
    done?: boolean;
  }

  export interface ICustomListItemWithDateProps {
    item: IDataItem;
    removeTodo: (id: number) => Promise<void>;
    doneTodo: (id: number, doneStatus: boolean) => Promise<void>;
  }