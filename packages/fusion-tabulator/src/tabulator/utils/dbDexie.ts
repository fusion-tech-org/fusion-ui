import { Message } from '@arco-design/web-react';
import Dexie from 'dexie';

export class DBDexie {
  static dexie: Dexie;
  isReady: boolean;

  constructor() {
    this.isReady = false;
  }

  public init(
    dbName: string,
    tables: Record<string, string>,
    version = 1
  ): Promise<boolean> {
    DBDexie.dexie = new Dexie(dbName);
    // creating database's tables
    DBDexie.dexie.version(version).stores(tables);

    return new Promise((resolve, reject) => {
      DBDexie.dexie
        .open()
        .then(() => {
          this.isReady = true;
          resolve(true);
        })
        .catch((error) => {
          console.log('opening dexie failed: ', error);
          reject(false);
        });
    });
  }

  public getDexie() {
    // if (!DBDexie.dexie) {
    //   Message.info('请先初始化Dexie');
    // }
    return DBDexie.dexie;
  }

  public getTable(tableName: string) {
    if (!this.isReady) {
      Message.info('IndexedDB尚未启用');
      return;
    }

    return DBDexie.dexie.table(tableName);
  }

  public open() {
    console.log('this.isReady', this.isReady);
    if (this.isReady) return;

    // DBDexie.dexie.open();
  }
}

const dbDexie = new DBDexie();

export default dbDexie;
