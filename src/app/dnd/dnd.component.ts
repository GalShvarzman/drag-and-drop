import { Component } from '@angular/core';

@Component({
  selector: 'app-dnd',
  templateUrl: './dnd.component.html',
  styleUrls: ['./dnd.component.css']
})
export class DndComponent{
  private fileList : File[] = [];
  private invalidFileList : File[] = [];
  private headers : {[key:string] : string};
  private csv : {[key:string] : string}[];
  private displayedColumns : string[];
  constructor() { }

  private onFilesChange(fileList : File[]){
    this.fileList = fileList;
    if(fileList && fileList.length > 0){
      const file : File = fileList[0];
      const reader : FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e)=>{
        const csv:string = reader.result;
        const allLines:string[] = csv.split(/\r\n|\n/);
        this.headers = {};
        const headersArr:string[] = allLines.shift().split(',');
        headersArr.forEach((header, i)=>{
          this.headers[i] = header;
        })
        this.displayedColumns = headersArr.map((header, i)=>i+"");
        const lines:{[key:string]:string}[] = [];
        allLines.forEach((docLine:string)=>{
          const line:{[key:string]:string} = {};
          const data:string[] = docLine.split(',');
          if(data.length == headersArr.length){
            data.forEach((docCol, i)=>{
              line[i] = docCol;
            })
            lines.push(line);
          }
        })
        this.csv = lines;
      }
    }
  }

  private onFileInvalids(fileList : File[]){
    this.invalidFileList = fileList;
  }

}
