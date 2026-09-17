/**
 * The red / gold / ink bar that closes the hero in the original concept. Kept because it
 * is the one piece of pure graphic identity in the source and it divides sections hard.
 */
export function BrandStripe() {
  return (
    <div
      aria-hidden="true"
      className="h-2 w-full bg-[linear-gradient(90deg,var(--color-brand-red)_0_55%,var(--color-brand-gold)_55%_72%,var(--color-ink)_72%)]"
    />
  );
}
