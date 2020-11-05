import { Injectable } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Injectable({
  providedIn: 'root'
})
export class QrScannerService {
  onPermErrFunc = null;
  onScanDataFunc = null;
  onUnkErrFunc = null;
  scanSub = null;
  lastOpacity = null;
  isOpenned = false;

  constructor(private qrScanner: QRScanner) { }

  /**Define o callback de erro de permissão. */
  public OnPermissionError(ptrCallback){
    this.onPermErrFunc = ptrCallback;
  }

  /**Define o callback de dados obtidos. */
  public OnScannedData(ptrCallback){
    this.onScanDataFunc = ptrCallback;
  }

  /**Define o callback de erro recebido. */
  public OnUnknownError(ptrCallback){
    this.onUnkErrFunc = ptrCallback;
  }

  /**Abre a tela de Scan do Qr-Code com a câmera do celular.*/
  public Scan(){
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.lastOpacity = document.getElementsByTagName("body")[0].style.opacity;
        this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
          document.getElementsByTagName("body")[0].style.opacity = this.lastOpacity;
          this.qrScanner.hide();
          if (this.onScanDataFunc){
            this.onScanDataFunc(text);
          }
          this.scanSub.unsubscribe();
          this.isOpenned = false;
        });
        document.getElementsByTagName("body")[0].style.opacity = "0";
        this.qrScanner.resumePreview();
        this.qrScanner.show();
        this.isOpenned = true;
      }
      else if (status.denied) {
        this.qrScanner.openSettings();
        this.isOpenned = false;
      }
      else {
        if (this.onPermErrFunc){
          this.onPermErrFunc();
          this.isOpenned = false;
        }
      }
    }).catch((e) => {
      if (this.onUnkErrFunc){
        this.onUnkErrFunc(e);
        this.isOpenned = false;
      }
    });
  }

  /**Fecha a tela de Scan e desligar o leitor de QR-Code.*/
  public Close(){
    if (this.isOpenned == true){
      this.qrScanner.hide();
      this.scanSub.unsubscribe();
      document.getElementsByTagName("body")[0].style.opacity = this.lastOpacity;
      this.isOpenned = false;
    }
  }

  public IsScanning(){
    return this.isOpenned;
  }

}
