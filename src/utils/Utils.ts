

/**
 * Get the lower of two values.
 * if maybe is undefined, return the lowervalue
 * 
 * @param maybe 
 * @param lowerValue 
 */
export function safeLower(maybe: number | undefined | null, lowerValue: number): number {
  if (!maybe) {
    return lowerValue;
  }

  if (maybe > lowerValue) {
    return lowerValue;
  }

  return maybe;
}