import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Directive({
  selector: '[Uppercase]',
  providers: [UpperCasePipe],
})
export class UppercaseDirective {
  private el = inject(ElementRef);
  private upperCasePipe = inject(UpperCasePipe);

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const transformedValue = this.upperCasePipe.transform(input.value);
    if (transformedValue !== null) {
      input.value = transformedValue;
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    const pastedText = event.clipboardData?.getData('text') || '';
    const transformedText = this.upperCasePipe.transform(pastedText);

    if (transformedText !== null) {
      input.value = transformedText;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}
