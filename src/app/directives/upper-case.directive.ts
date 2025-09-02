import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[Uppercase]',
  providers: [UpperCasePipe],
})
export class UppercaseDirective {
  private el = inject(ElementRef);
  private upperCasePipe = inject(UpperCasePipe);
  private ngControl = inject(NgControl, { optional: true });

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cursorPosition = input.selectionStart;
    const transformedValue = this.upperCasePipe.transform(input.value);

    if (transformedValue !== null && transformedValue !== input.value) {
      input.value = transformedValue;

      if (this.ngControl && this.ngControl.control) {
        this.ngControl.control.setValue(transformedValue);
      }

      if (cursorPosition !== null) {
        input.setSelectionRange(cursorPosition, cursorPosition);
      }
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    const pastedText = event.clipboardData?.getData('text') || '';
    const transformedText = this.upperCasePipe.transform(pastedText);

    if (transformedText !== null) {
      const cursorPosition = input.selectionStart || 0;
      const currentValue = input.value;
      const newValue =
        currentValue.slice(0, cursorPosition) +
        transformedText +
        currentValue.slice(input.selectionEnd || cursorPosition);
      const finalValue = this.upperCasePipe.transform(newValue);

      if (finalValue !== null) {
        input.value = finalValue;
        if (this.ngControl && this.ngControl.control) {
          this.ngControl.control.setValue(finalValue);
        }

        const newCursorPosition = cursorPosition + transformedText.length;
        input.setSelectionRange(newCursorPosition, newCursorPosition);

        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  }
}
