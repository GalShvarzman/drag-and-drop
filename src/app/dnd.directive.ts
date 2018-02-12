import { Directive, HostListener, HostBinding, Output, Input, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  @Input() private allowed_extensions : string[] = [];
  @Output("onFile") private filesChangeEmiter : EventEmitter<File[]> = new EventEmitter();  
  @Output("onInvalid") private filesInvalidEmiter : EventEmitter<File[]> = new EventEmitter();  
  @HostBinding('style.background') private background = '#eee';
  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee'
  }

  @HostListener('drop', ['$event']) public onDrop(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    const files = evt.dataTransfer.files;
    const valid_files : File[] = [];
    const invalid_files : File[] = [];
    if(files.length > 0){      
      for (let i = 0; i < files.length; i++){
        const file = files[i];
        const ext = file.name.split('.')[file.name.split('.').length - 1];
        if(this.allowed_extensions.lastIndexOf(ext) != -1){
          valid_files.push(file);
          break;
        }
        else{
          invalid_files.push(file);
        }
      }
      this.filesChangeEmiter.emit(valid_files);
      this.filesInvalidEmiter.emit(invalid_files);
    }
  }
}
