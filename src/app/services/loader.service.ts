import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { TKartochka } from './kartochki.service';

export type TResultResponse<T> = {data: T; headers: HttpHeaders; };
export type TFuncResponse<T> = (_r:TResultResponse<T> )=>void;

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  // private baseUrl:string = "https://test-front.framework.team";
  private baseUrl:string;

  // constructor(private http: HttpClient){}

  fullImageUrl(path_imageUrl:string):string {
    return this.baseUrl + path_imageUrl;
  }

  loadData<T>(path_rl:string, cb:TFuncResponse<T>) {
    this.http
      .get(this.baseUrl+path_rl, {observe: 'response'})
      .subscribe({
        next:(response:any) => {
          cb({data:response.body, headers: response.headers});
        }
      });
  }



  Inited: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private dbName = 'gallery';
  private db: IDBDatabase | null = null;
  private dbVersion = 1;

  constructor(private http: HttpClient) {
    this.baseUrl = window.location.origin;
    if(!this.baseUrl.endsWith('/')) {
      this.baseUrl += '/';
    }
    this.initDB();
  }

  deleteDB() {
    indexedDB.deleteDatabase(this.dbName);
  }

  closeDB(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    } 
  }

  initDB(): void {
    const request = indexedDB.open(this.dbName, this.dbVersion);
    let needAddData = false;

    request.onerror = () => {
      console.error('Ошибка открытия БД:', request.error);
    };

    request.onsuccess = () => {
      this.db = request.result;
      console.log('БД успешно открыта');
      this.Inited.next(true);
    };

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      needAddData = true;
      const db:IDBDatabase = (event.target as IDBOpenDBRequest).result;
      
      StructureDB.paintings.data.sort(function(a,b){
        return (Math.random() > 0.5) ? 1 : -1;
      });

      const structureDB:{[key:string]:{keyPath:string;data:any[];}} = StructureDB;

      if(structureDB) {
        Object.keys(structureDB).forEach((key) => {
          if (!db.objectStoreNames.contains(key)) {
            const keyPath = structureDB[key]['keyPath'] ?? 'id';
            try {
              const store = db.createObjectStore(key, { keyPath: keyPath, autoIncrement: true });
              const data = structureDB[key]?.data ?? [];
              if(data?.length > 0) {
                data.forEach((value)=>{
                  store.add(value);
                });
              }
            } catch (error) {
              console.error(`Ошибка создания таблицы: ${key}`, error);
            }
          }
        });

      }

      
    };
  }

  // Обобщенный метод для получения хранилища
  private getStore(storeName: string, mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
    if (!this.db) {
      throw new Error('БД не инициализирована');
    }
    const transaction = this.db.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  paintings() {
    return new Promise((resolve, reject) => {
      const subInited = this.Inited.subscribe((isInited)=>{
        if(isInited) {
          const store = this.getStore('paintings');
          const request = store.getAll();

          const d = new Date();
          request.onsuccess = () => {
            subInited?.unsubscribe();
            resolve(request.result);
          }
          request.onerror = () => {
            subInited?.unsubscribe();
            reject(request.error);
          }
        }
      });
    });
  }

  authors() {
    return new Promise((resolve, reject) => {
      const subInited = this.Inited.subscribe((isInited)=>{
        if(isInited) {
          const store = this.getStore('authors');
          const request = store.getAll();

          request.onsuccess = () => {
            subInited?.unsubscribe();
            resolve(request.result);
          }

          request.onerror = () => {
            subInited?.unsubscribe();
            reject(request.error);
          }

        }
      });
    });
  }

  locations() {
    return new Promise((resolve, reject) => {
      const subInited = this.Inited.subscribe((isInited)=>{
        if(isInited) {
          const store = this.getStore('locations');
          const request = store.getAll();

          request.onsuccess = () => {
            subInited?.unsubscribe();
            resolve(request.result);
          }

          request.onerror = () => {
            subInited?.unsubscribe();
            reject(request.error);
          }

        }
      });
    });

  }

};


export const StructureDB = {
  authors: {
    keyPath: 'id',
    data: [
      { name: 'Илья Репин'},// 1
      { name: 'Иван Шишкин'},// 2
      { name: 'Виктор Васнецов'},// 3
      { name: 'Андрей Рублёв'},// 4
      { name: 'Исаак Левитан'},// 5
      { name: 'Михаил Врубель'},// 6
      { name: 'Архип Куинджи'},// 7
      { name: 'Иван Айвазовский'},// 8
      { name: 'Валентин Серов'},// 9
      { name: 'Карл Брюллов'},// 10
      // { name: 'Марк Шагал'},// 11
      // { name: 'Казимир Малевич'},// 12
      // { name: 'Василий Суриков'},// 13
      // { name: 'Николай Рерих'},// 14
      // { name: 'Василий Поленов'},// 15
      // { name: 'Борис Кустодиев'},// 16
      // { name: 'Константин Коровин'},// 17
      // { name: 'Иван Билибин'},// 18
      // { name: 'Иван Крамской'},// 19
      // { name: 'Василий Перов'},// 20
      // { name: 'Алексей Саврасов'},// 21
      // { name: 'Игорь Грабарь'}// 22
    ]
  },
  locations: {
    keyPath: 'id',
    data: [
      {
        // id: 1,
        location: 'Локация 1'
      },
      {
        // id: 2,
        location: 'Локация 2'
      }
    ]
  },
  paintings: {
    keyPath: 'id',
    data: [
      {
        authorId : 1,
        created: "1891",
        imageUrl: 'paintings/1/500px-Ilja_Jefimowitsch_Repin_-_Reply_of_the_Zaporozhian_Cossacks_-_Yorck.jpg',
        locationId: 1,
        name: 'Запорожцы',
      },
      {
        authorId : 1,
        created: "1871",
        imageUrl: 'paintings/1/Ilya_Repin_-_Barge_Haulers_on_the_Volga_-_Google_Art_Project.jpg',
        locationId: 1,
        name: 'Бурлаки на Волге',
      },
      {
        authorId : 2,
        created: "1889",
        imageUrl: 'paintings/2/500px-Shishkin,_Ivan_-_Morning_in_a_Pine_Forest.jpg',
        locationId: 1,
        name: 'Утро в сосновом лесу',
      },
      {
        authorId : 2,
        created: "1891",
        imageUrl: 'paintings/2/500px-Шишкин_И._И._(1891)_На_севере_диком.jpg',
        locationId: 1,
        name: 'На севере диком…',
      },
      {
        authorId : 3,
        created: "1910",
        imageUrl: 'paintings/3/1280px-Баян.jpg',
        locationId: 1,
        name: 'Баян',
      },
      {
        authorId : 3,
        created: "1889",
        imageUrl: 'paintings/3/960px-Vasnetsov_Snegurochka.jpg',
        locationId: 1,
        name: 'Снегурочка',
      },
      {
        authorId : 4,
        created: "1411",
        imageUrl: 'paintings/4/Andrey_Rublev_-_Св._Троица_-_Google_Art_Project.jpg',
        locationId: 1,
        name: 'Троица',
      },
      {
        authorId : 4,
        created: "1399",
        imageUrl: 'paintings/4/960px-Mikharkhangel2.jpg',
        locationId: 1,
        name: 'Архангел Михаил',
      },
      {
        authorId : 5,
        created: "1895",
        imageUrl: 'paintings/5/1280px-Levitan_Zolotaya_Osen.jpg',
        locationId: 1,
        name: 'Золотая осень',
      },
      {
        authorId : 5,
        created: "1889",
        imageUrl: 'paintings/5/1280px-1885-1889_Birkenhain.jpg',
        locationId: 1,
        name: 'Берёзовая роща',
      },
      {
        authorId : 6,
        created: "1900",
        imageUrl: 'paintings/6/960px-Tsarevna-Lebed_by_Mikhail_Vrubel_(brightened).jpg',
        locationId: 1,
        name: 'Царевна-Лебедь',
      },
      {
        authorId : 6,
        created: "1891",
        imageUrl: 'paintings/6/960px-Tamaraydemon.jpg',
        locationId: 1,
        name: 'Демон и Тамара',
      },
      {
        authorId : 7,
        created: "1879",
        imageUrl: 'paintings/7/500px-Archip_Iwanowitsch_Kuindshi_005.jpg',
        locationId: 1,
        name: 'Берёзовая роща',
      },
      {
        authorId : 7,
        created: "1908",
        imageUrl: 'paintings/7/1280px-1905_Archip_Iwanowitsch_Kuindshi_Sunset_Dnieper_anagoria.jpg',
        locationId: 1,
        name: 'Красный закат',
      },
      {
        authorId : 8,
        created: "1836",
        imageUrl: 'paintings/8/960px-Aivazovsky_-_Large_raid_in_Kronstadt.jpg',
        locationId: 1,
        name: 'Большой рейд в Кронштадте',
      },
      {
        authorId : 8,
        created: "1838",
        imageUrl: 'paintings/8/1280px-Ялта_айвазовского.jpg',
        locationId: 1,
        name: 'Ялта',
      },
      {
        authorId : 9,
        created: " 1887",
        imageUrl: 'paintings/9/960px-Valentin_Serov_-_Девочка_с_персиками._Портрет_В.С.Мамонтовой_-_Google_Art_Project.jpg',
        locationId: 1,
        name: 'Девочка с персиками',
      },
      {
        authorId : 9,
        created: "1892",
        imageUrl: 'paintings/9/Portrait_of_Ivan_Zabelin.jpg',
        locationId: 1,
        name: 'Портрет Ивана Забелина',
      },
      {
        authorId : 10,
        created: " 1827",
        imageUrl: 'paintings/10/960px-Brjullov_Italianskij_Poldenj.jpg',
        locationId: 1,
        name: 'Итальянский полдень',
      },
      {
        authorId : 10,
        created: "1850",
        imageUrl: 'paintings/10/Peter_Klodt_by_F.A.Goretskiy_(1850,_GTG).jpg',
        locationId: 1,
        name: 'Пётр Карлович',
      }
    ]
  },
}
