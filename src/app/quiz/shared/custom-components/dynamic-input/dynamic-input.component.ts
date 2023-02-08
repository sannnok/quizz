import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldProps, FieldType } from '../../../interfaces/answer.interface';


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
  @Input() isCorrect?: boolean | null;
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

  propagateChange(value: number[] | number, fieldType: FieldType) {
    if (this.onChange) {
      this.writeValue(value);
      this.onChange(this.value);
      this.valueCahnged.next({ value: this.value, fieldType });
    }
  }

  writeValue(value: number[] | number): void {
    if (!value) return;

    if (Array.isArray(value)) {
      this.value = value;
    } else {
      this.value = [value];
    }
    
    if (this.fieldProps.type === FieldType.MULTISELECT) {
      this.form.controls.multiselect.setValue(value);
    }
  }
}
