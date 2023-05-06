import { FormGroup } from '@angular/forms';

export const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const resetForm = (form: FormGroup) => {
  form.reset();
  form.markAsPristine();
  form.markAsUntouched();
  Object.keys(form.controls).forEach((key) => {
    form.get(key)?.setErrors(null);
    form.get(key)?.markAsPristine();
    form.get(key)?.markAsUntouched();
  });
};
