import { FormGroup } from '@angular/forms';

export const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
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

export const timeSince = (date: Date) => {
  const now = new Date();
  const yourDate = new Date(date);
  const seconds = Math.floor((now.getTime() - yourDate.getTime()) / 1000);
  let timer = seconds / 31536000;
  if (timer > 1) {
    return `${Math.floor(timer)} năm trước`;
  }
  timer = seconds / 2592000;
  if (timer > 1) {
    return `${Math.floor(timer)} tháng trước`;
  }
  timer = seconds / 604800;
  if (timer > 1) {
    return `${Math.floor(timer)} tuần trước`;
  }
  timer = seconds / 86400;
  if (timer > 1) {
    return `${Math.floor(timer)} ngày trước`;
  }
  timer = seconds / 3600;
  if (timer > 1) {
    return `${Math.floor(timer)} giờ trước`;
  }
  timer = seconds / 60;
  if (timer > 1) {
    return `${Math.floor(timer)} phút trước`;
  }
  timer = seconds;
  if (timer > 1) {
    return `${Math.floor(timer)} giây trước`;
  }
  return;
};
