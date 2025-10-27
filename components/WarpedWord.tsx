// components/WarpWordTailwind.tsx
type Props = { text?: string; amp?: number; className?: string };

export default function WarpWordTailwind({
  text = "looooot",
  amp = 8, // vertical amplitude in px
  className = "",
}: Props) {
  const chars = Array.from(text);
  const n = Math.max(chars.length - 1, 1);

  return (
    <span className={`inline-flex select-none ${className}`} aria-label={text}>
      {chars.map((ch, i) => {
        const t = i / n;                           // 0..1 across the word
        const y = amp * Math.sin(2 * Math.PI * t); // 1 full wave → S-like
        const dy = (2 * Math.PI * amp) * Math.cos(2 * Math.PI * t) / n;
        const tilt = Math.atan2(dy, 16) * (180 / Math.PI); // slight flow
        return (
          <span
            key={i}
            className="inline-block will-change-transform [letter-spacing:0.02em]"
            style={{ transform: `translateY(${y}px) rotate(${tilt}deg)` }}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
}
