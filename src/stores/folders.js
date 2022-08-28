import { defineStore } from 'pinia'

export const useFoldersStore = defineStore({
  id: 'folders',
  state: () => ({
    foldersCategory: [
      {
        id: 1,
        name: 'Пункт 1 для примера',
        subname : 'Описание подпункта для примера',
        children: [
          {
            id: 2,
            name: 'Пункт 1 для примера',
            subname : 'Описание подпункта для примера',
          },
          {
            id: 3,
            name: 'Пункт 1 для примера',
            subname : 'Описание подпункта для примера',
          }
        ]
      },
      {
        id: 4,
        name: 'Пункт 2 для примера',
        subname : 'Описание подпункта для примера',
        children: [
          {
            id: 5,
            name: 'Пункт 2 для примера',
            subname : 'Описание подпункта для примера',
          },
          {
            id: 6,
            name: 'Пункт 2 для примера',
            subname : 'Описание подпункта для примера',
          }
        ]
      }
    ],
    foldersNoCategory: [
      {
        id: 7,
        name: 'Пункт 2 для примера',
        subname : 'Описание подпункта для примера',
      },
      {
        id: 8,
        name: 'Пункт 2 для примера',
        subname : 'Описание подпункта для примера',
      }
    ],
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {

    deleteFolder(folder) {
      this.foldersCategory.find((el, i, array)=>{
        if(el === folder){
          this.foldersCategory.splice(i, 1);
        }
      });
      return null;
    },
    deleteSubFolder(folder, parent) {
      this.foldersCategory.find((el, i, array)=>{
        if(el === parent){
          el.children.find((el_sub, i_sub, array_sub) => {
            el.children.splice(i_sub, 1);
          })
        }
      });
      return null;
    },
    deleteNoFolder(folder) {
      this.foldersNoCategory.find((el, i, array)=>{
        if(el === folder){
          this.foldersNoCategory.splice(i, 1);
        }
      });
      return null;
    }
  }
})
