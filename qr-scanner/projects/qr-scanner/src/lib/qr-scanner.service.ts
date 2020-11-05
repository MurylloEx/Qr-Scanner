import { Injectable } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

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
  pluginName = 'QRSCANNER';

  constructor(private qrScanner: QRScanner, private barcodeScanner: BarcodeScanner) { }

  /**Define qual o plugin será utilizado na leitura do QR Code.
   * @param pluginName Valores possíveis: ```QRSCANNER``` ou ```BARCODESCANNER```.
   */
  public DefinePlugin(pluginName: string){
    this.pluginName = String(pluginName).toUpperCase();
    return this;
  }

  /**Define o callback de erro de permissão. ```[ATENÇÃO] Esse callback só é disparado pelo plugin QR-Scanner.```*/
  public OnPermissionError(ptrCallback){
    this.onPermErrFunc = ptrCallback;
    return this;
  }

  /**Define o callback de dados obtidos. */
  public OnScannedData(ptrCallback){
    this.onScanDataFunc = ptrCallback;
    return this;
  }

  /**Define o callback de erro recebido. */
  public OnUnknownError(ptrCallback){
    this.onUnkErrFunc = ptrCallback;
    return this;
  }

  /**Abre a tela de Scan do Qr-Code com a câmera do celular.*/
  public Scan(){
    if (this.pluginName == 'QRSCANNER'){
      this.qrScanner.prepare().then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.lastOpacity = document.getElementsByTagName("body")[0].style.opacity;
          this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
            document.getElementsByTagName("body")[0].style.opacity = this.lastOpacity;
            this.qrScanner.hide();
            if (this.onScanDataFunc) {
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
          if (this.onPermErrFunc) {
            this.onPermErrFunc();
            this.isOpenned = false;
          }
        }
      }).catch((e) => {
        if (this.onUnkErrFunc) {
          this.onUnkErrFunc(e);
          this.isOpenned = false;
        }
      });
    } 
    else if (this.pluginName == 'BARCODESCANNER') {
      this.isOpenned = true;
      this.barcodeScanner.scan().then((qrData) => {
        if (!qrData.cancelled)
          this.onScanDataFunc(qrData.text);
        setTimeout(()=>{ this.isOpenned = false; }, 700);
      }).catch((reason) => {
        this.onUnkErrFunc(reason);
        setTimeout(()=>{ this.isOpenned = false; }, 700);
      });
    }
  }

  /**Fecha a tela de Scan e desligar o leitor de QR-Code. ```[ATENÇÃO] Esse método só funciona para o plugin QR-Scanner.```*/
  public Close(){
    if ((this.isOpenned == true) && (this.pluginName == 'QRSCANNER')){
      this.qrScanner.hide();
      this.scanSub.unsubscribe();
      document.getElementsByTagName("body")[0].style.opacity = this.lastOpacity;
      this.isOpenned = false;
    }
  }

  /**Retorna um valor booleano indicando se o leitor de QR-Scanner ou o Barcode Scanner ainda estão abertos */
  public IsScanning(){
    return this.isOpenned;
  }

}
