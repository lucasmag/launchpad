export function clean(className: string) {
  return className
    .replace(/undefined|null/gu, '')
    .replace(/(\s\s+)/gu, ' ')
    .trim();
}