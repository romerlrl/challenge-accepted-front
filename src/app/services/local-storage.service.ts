import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
    console.log("Construtor do storage", this.storage)
  }

  setTemperatureUnit(value: boolean) {
    let v: string = value ? 'C' : "F";
    this.storage.setItem('temperature', v);
  }

  getTemperatureUnit(): boolean {
    let v: boolean
    v = this.storage.getItem('temperature') == 'F'
    return v
  }

  setVolumeUnit(value: boolean) {
    let v: string = value ? 'pol' : 'mm'
    this.storage.setItem('volume', v)
  }

  getVolumeUnit(): boolean {
    let v: boolean
    v = this.storage.getItem('volume') == 'pol'
    return v
  }
}