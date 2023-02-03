import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldProps, FieldType } from 'src/app/interfaces/answer.interface';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DynamicInputComponent,
      multi: true,
    },
  ],
})
export class DynamicInputComponent implements ControlValueAccessor {
  @Input() fieldProps!: FieldProps;
  @Input() correctAnswer!: number[];
  @Output() valueCahnged = new EventEmitter();
  onChange!: (value: number[] | number) => void;
  disabled = false;
  value: number[] = [];
  form = new FormGroup({multiselect: new FormControl()});
  FieldType = FieldType;
  radioWrong = false;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  propagateChange(value: number[] | number) {
    if (this.onChange) {
      this.onChange(value);
      this.valueCahnged.next(value);
    }
  }

  writeValue(value: number[]): void {
    if (value) {
      this.value = value;
    }
    if (this.fieldProps.type === FieldType.MULTISELECT) {
      this.form.controls.multiselect.setValue(value);
    }
  }
}
