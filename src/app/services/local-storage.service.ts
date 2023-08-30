import { LocalStorage } from './../models/local-storage';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  private storage: LocalStorage;

  constructor() {
    this.storage = window.localStorage;
    console.log("Construtor do storage", this.storage)
  }
}

const storage: Storage = window.localStorage;

export function setTemperatureUnit(value: boolean) {
  let v: string = value ? 'C' : "F";
  storage.setItem('temperature', v);
}

export function getTemperatureUnit(): boolean {
  const storage: Storage = window.localStorage;
  let v: boolean
  v = storage.getItem('temperature') == 'C'
  return v
}

export function getVolumeUnit(): boolean {
  let v: boolean = true
  v = storage.getItem('volume') == 'pol'
  return v
}


export function switchVolumeUnit() {
  let v: boolean = storage.getItem('volume') == 'mm'
  console.log('switch temperatue unit', v)
  storage.setItem('volume', v ? 'pol' : 'mm')

}

export function switchTemperatureUnit() {
  let v: boolean = storage.getItem('temperature') == 'C'
  console.log('switch temperatue unit', v)
  storage.setItem('temperature', v ? 'F' : 'C')
}