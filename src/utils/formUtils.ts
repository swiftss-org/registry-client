export const scrollToError = (errors: Record<string, unknown>) => {
  const errorFields = Object.keys(errors);
  if (errorFields.length > 0) {
    const firstErrorElement = document.querySelector(
      errorFields.map((name) => `[name="${name}"]`).join(',')
    );
    if (firstErrorElement) {
      firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      (firstErrorElement as HTMLElement).focus?.();
    }
  }
};
