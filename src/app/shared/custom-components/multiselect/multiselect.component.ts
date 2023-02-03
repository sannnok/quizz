import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AnswerOption, AnswerOptionSelection } from 'src/app/interfaces/answer.interface';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MultiselectComponent,
      multi: true,
    },
  ],
})
export class MultiselectComponent implements ControlValueAccessor {
  @Input() input: boolean = true;
  @Input('options') options!: AnswerOptionSelection[];
  @Output() valueChanged = new EventEmitter();
  onChange!: (value: number[]) => void;
  disabled = false;
  value: number[] = [];

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  propagateChange() {
    if (this.onChange) {
      this.onChange(this.value);
      this.valueChanged.next(this.value);
    }
  }

  writeValue(value: number[]): void {
    if (value) {
      this.value = value;
    }
  }

  toggleSelection(option: AnswerOptionSelection) {
    if (!this.disabled) option.isSelected = !option.isSelected
    if (option.isSelected) {
      this.value.push(option.answerId);
    } else {
      this.value = this.value.filter(id => id !== option.answerId);
    }
    this.propagateChange()
  }
}
