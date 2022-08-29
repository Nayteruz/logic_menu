import { defineStore } from 'pinia'

export const useFoldersStore = defineStore({
  id: 'folders',
  state: () => ({
    searchText: '',
    dinamicFolder: [],
    dinamicSubFolder: [],
    dinamicOutFolder: [],
    staticFolder: [
      {
        id: 1,
        name: 'Обязательные для всех',
        subname : 'Документы, обязательные для всех сотрудников без исключения',
        label: '',
        colors: ['#FF238D', '#FFB800', '#FF8D23'],
      },
      {
        id: 4,
        name: 'Обязательные для трудоустройства',
        subname : 'Документы, без которых невозможно трудоустройство человека на какую бы то ни было должность в компании вне зависимости от гражданства и его паспорта',
        label: '',
        children: [
          {
            id: 5,
            name: 'Трудовая книжка',
            subname : 'Для всех',
            label:'Обязательный'
          },
          {
            id: 6,
            name: 'СНИЛС',
            subname : 'Для всех',
            label:'Обязательный'
          }
        ]
      },
      {
        id: 7,
        name: 'Специальные',
        subname : '',
        label: '',
        children: [
          {
            id: 8,
            name: 'Специальный документ',
            subname : 'Для всех',
          },
          {
            id: 9,
            name: 'Еще какой то документ',
          }
        ]
      }
    ],
    staticSubFolder: [
      {
        id: 2,
        parentId:1,
        name: 'Паспорт',
        subname : 'Для всех',
        label:'Обязательный',
        colors: ['#00C2FF'],
      },
      {
        id: 3,
        parentId:1,
        name: 'ИНН',
        subname : 'Для всех',
        label:'Обязательный'
      },
      {
        id: 5,
        parentId:4,
        name: 'Трудовая книжка',
        subname : 'Для всех',
        label:'Обязательный'
      },
      {
        id: 6,
        parentId:4,
        name: 'СНИЛС',
        subname : 'Для всех',
        label:'Обязательный'
      },
      {
        id: 8,
        parentId:7,
        name: 'Специальный документ',
        subname : 'Для всех',
      },
      {
        id: 9,
        parentId:7,
        name: 'Еще какой то документ',
      }
    ],
    staticOutFolder: [
      {
        id: 10,
        name: 'Тестовое задание кандидата',
        subname : 'Россия, Белоруссия, Украина, администратор филиала, повар-сушист, повар-пиццмейкер, повар горячего цеха',
        colors: ['#0066FF', '#8E9CBB'],
      },
      {
        id: 11,
        name: 'Трудовой договор',
        subname : '',
      },
      {
        id: 11,
        name: 'Мед. книжка',
        subname : '',
      }
    ],
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    getOneItem(id){
      let item = this.dinamicFolder.find(i=>i.id=id);
      if(item){
        item = this.dinamicSubFolder.find(i=>i.id=id);
      }
      if(item){
        item = this.dinamicOutFolder.find(i=>i.id=id);
      }

      return item;
    },
    deleteFolder(folder) {
      this.staticFolder.find((el, i, array)=>{
        if(el === folder){
          this.staticFolder.splice(i, 1);
        }
      });
      return null;
    },
    deleteSubFolder(folder) {
      this.staticFolder.find((el, i, array)=>{
        if(el === folder.parentId){
          el.children.find((el_sub, i_sub, array_sub) => {
            el.children.splice(i_sub, 1);
          })
        }
      });
      return null;
    },
    deleteNoFolder(folder) {
      this.staticOutFolder.find((el, i, array)=>{
        if(el === folder){
          this.staticOutFolder.splice(i, 1);
        }
      });
      return null;
    },
    searchItem(){
      let str = this.searchText.toLowerCase();

      if(str !==''){
        this.dinamicFolder = this.staticFolder.filter(c => {
          let name = c?.name.toLowerCase().includes(str);
          let subname = c?.subname.toLowerCase().includes(str);
          let childrens = this.staticSubFolder.filter(r=>{
            let name = r?.name?.toLowerCase().includes(str);
            let subname = r?.subname?.toLowerCase().includes(str);
            if((name || subname) && c.id === r.parentId){
              return r;
            }
          })
          if(name || subname || childrens.length){
            return c;
          }
        });

        this.dinamicOutFolder = this.staticOutFolder.filter(c => {
          let name = c?.name.toLowerCase();
          let subname = c?.subname.toLowerCase();
          if(name.includes(str) || subname.includes(str)){
            return c;
          }
        });

        this.dinamicSubFolder = this.staticSubFolder.filter(s=>{
          let name = s?.name?.toLowerCase().includes(str);
          let subname = s?.subname?.toLowerCase().includes(str);
          if(name || subname){
            return s;
          }
        })

      } else {
        this.dinamicFolder = this.staticFolder;
        this.dinamicOutFolder = this.staticOutFolder;
        this.dinamicSubFolder = this.staticSubFolder;
      }

    }
  }
})
