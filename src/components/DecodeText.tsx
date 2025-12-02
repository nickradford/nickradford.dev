import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Seeded PRNG using xorshift32 algorithm.
 * Provides deterministic, reproducible randomness for identical animations.
 * - Fast (~1 operation per call)
 * - Reasonable distribution for character selection
 * - Same seed always produces same sequence
 */
class SeededRandom {
  private state: number;

  constructor(seed: number = Date.now()) {
    this.state = seed || 1;
  }

  next(): number {
    let x = this.state;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    this.state = x;
    return (x >>> 0) / 0x100000000;
  }
}

interface DecodeTextProps {
  /** Target string to decode into */
  value: string;
  /** Enable/disable animation (pause/resume) */
  running?: boolean;
  /** Seed for reproducible shuffle sequences. If undefined, uses timestamp. */
  seed?: number;
  /** Delay (ms) before animation starts. Default 100. */
  initialDelay?: number;
  /** Time (ms) between shuffle frames. Default 30. */
  shuffleInterval?: number;
  /** Time (ms) between revealing each character. Default 80. */
  revealInterval?: number;
  /** Character pool for noise. Default: A-Za-z0-9 + symbols */
  pool?: string;
  /** Preserve spaces in the target; don't shuffle them. Default true. */
  preserveSpaces?: boolean;
  /** Decode by word position instead of left-to-right. Default false. */
  decodeByWord?: boolean;
  /** Callback when reveal completes (all chars locked) */
  onComplete?: () => void;
  /** CSS class for styling */
  className?: string;
}

/**
 * DecodeText Component
 *
 * Animates text with a matrix-rain style decode effect:
 * 1. Characters shuffle with random noise (unlocked positions)
 * 2. Characters progressively lock left-to-right into target
 * 3. Animation pauses/resumes with `running` prop
 *
 * Key design decisions:
 * - Uses xorshift32 PRNG for determinism (same seed = same animation)
 * - Initializes with all chars locked (SSR-safe: no hydration mismatch)
 * - useEffect triggers animation only after mount (client-side only)
 * - requestAnimationFrame for shuffle loop (smooth 60fps)
 * - setInterval for reveal (cleaner for discrete steps)
 * - Each char rendered as separate <span data-locked={boolean}>
 *   (allows CSS transitions if desired)
 * - Accessible: aria-label shows final value; no canvas
 * - Cleanup timers on unmount/prop change to prevent memory leaks
 */
export const DecodeText: React.FC<DecodeTextProps> = ({
  value,
  running = true,
  seed,
  initialDelay = 100,
  shuffleInterval = 30,
  revealInterval = 80,
  pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()',
  preserveSpaces = true,
  decodeByWord = false,
  onComplete,
  className = '',
}) => {
  // Display state: current character at each position
  // Initialize with random characters using the PRNG
  const [display, setDisplay] = useState<string>(() => {
    const prng = new SeededRandom(seed);
    return value
      .split('')
      .map((char) => {
        // Preserve spaces if preserveSpaces is true
        if (preserveSpaces && char === ' ') {
          return ' ';
        }
        const charPool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        const randomIdx = Math.floor(prng.next() * charPool.length);
        return charPool[randomIdx];
      })
      .join('');
  });
  
  // Which positions are "locked" (won't shuffle anymore)
  const [lockedIndices, setLockedIndices] = useState<Set<number>>(
    () => new Set()
  );

  // Refs to manage timers and state persistence
  const prngRef = useRef<SeededRandom>(new SeededRandom(seed));
  const shuffleTimerRef = useRef<number | null>(null);
  const revealTimerRef = useRef<NodeJS.Timeout | null>(null);
  const delayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const displayRef = useRef<string>(value);
  const lockedRef = useRef<Set<number>>(lockedIndices);
  const nextRevealIndexRef = useRef<number>(0);
  const revealStartedRef = useRef<boolean>(false);
  const wordIndicesRef = useRef<number[][]>([]); // Word boundaries: [[start, end], ...]

  // Update refs when state changes (for access in closures)
  useEffect(() => {
    displayRef.current = display;
  }, [display]);

  useEffect(() => {
    lockedRef.current = lockedIndices;
  }, [lockedIndices]);

  /**
   * Shuffle loop: continuously randomize unlocked positions.
   * Runs via requestAnimationFrame for smooth 60fps animation.
   */
  const startShuffling = useCallback(() => {
    let lastTime = Date.now();

    const shuffle = () => {
      const now = Date.now();
      
      // Only update if enough time has passed (throttle by shuffleInterval)
      if (now - lastTime >= shuffleInterval) {
        lastTime = now;

        setDisplay((prev) => {
          const chars = prev.split('');
          
          // Update all positions: shuffle unlocked, show target for locked
          for (let i = 0; i < chars.length; i++) {
            if (lockedRef.current.has(i)) {
              // Locked position: show target character
              chars[i] = value[i];
            } else if (preserveSpaces && value[i] === ' ') {
              // Preserve spaces if enabled
              chars[i] = ' ';
            } else {
              // Unlocked position: random noise
              const randomIdx = Math.floor(
                prngRef.current.next() * pool.length
              );
              chars[i] = pool[randomIdx];
            }
          }
          
          return chars.join('');
        });
      }

      // Continue looping if running
      if (running) {
        shuffleTimerRef.current = requestAnimationFrame(shuffle);
      }
    };

    shuffleTimerRef.current = requestAnimationFrame(shuffle);
  }, [shuffleInterval, running, pool]);

  /**
   * Reveal loop: progressively lock characters from left to right (or by word).
   * Each interval, lock (reveal) the next character(s) to their targets.
   */
  const startRevealing = useCallback(() => {
    revealTimerRef.current = setInterval(() => {
      setLockedIndices((prev) => {
        if (nextRevealIndexRef.current >= value.length) {
          return prev;
        }

        const newLocked = new Set(prev);

        if (decodeByWord && wordIndicesRef.current.length > 0) {
          // Decode by word: unlock Nth char of each word
          const charPosition = nextRevealIndexRef.current;
          for (const [wordStart, wordEnd] of wordIndicesRef.current) {
            const index = wordStart + charPosition;
            if (index < wordEnd) {
              newLocked.add(index);
            }
          }
        } else {
          // Standard left-to-right: unlock next char
          newLocked.add(nextRevealIndexRef.current);
        }

        nextRevealIndexRef.current += 1;

        // All characters locked → animation complete
        if (newLocked.size === value.length && onComplete) {
          onComplete();
        }

        return newLocked;
      });
    }, revealInterval);
  }, [value.length, revealInterval, onComplete, decodeByWord]);

  /**
   * When `value` changes: reset animation state and restart.
   * This ensures new value animates from scratch.
   */
  useEffect(() => {
    // Reinitialize PRNG if seed changed
    if (seed !== undefined) {
      prngRef.current = new SeededRandom(seed);
    }

    // Build word indices for decodeByWord mode
    if (decodeByWord) {
      const words: number[][] = [];
      let i = 0;
      while (i < value.length) {
        if (value[i] !== ' ') {
          const start = i;
          while (i < value.length && value[i] !== ' ') {
            i++;
          }
          words.push([start, i]);
        } else {
          i++;
        }
      }
      wordIndicesRef.current = words;
    }

    // Generate initial display with random characters
    const initialDisplay = value
      .split('')
      .map((char) => {
        // Preserve spaces if enabled
        if (preserveSpaces && char === ' ') {
          return ' ';
        }
        const randomIdx = Math.floor(
          prngRef.current.next() * pool.length
        );
        return pool[randomIdx];
      })
      .join('');

    setDisplay(initialDisplay);
    // Start with NO positions locked so reveal can unlock them left-to-right
    setLockedIndices(new Set());
    nextRevealIndexRef.current = 0;
    revealStartedRef.current = false;

    // Cleanup old timers
    if (shuffleTimerRef.current !== null) {
      cancelAnimationFrame(shuffleTimerRef.current);
    }
    if (revealTimerRef.current !== null) {
      clearInterval(revealTimerRef.current);
    }
    if (delayTimerRef.current !== null) {
      clearTimeout(delayTimerRef.current);
    }

    // Start animation only if running
    if (running && value.length > 0) {
      // Start shuffling immediately
      startShuffling();
      
      // Delay reveal by initialDelay
      if (initialDelay > 0) {
        delayTimerRef.current = setTimeout(() => {
          // Reset reveal index right before starting reveal
          nextRevealIndexRef.current = 0;
          revealStartedRef.current = true;
          startRevealing();
        }, initialDelay);
      } else {
        revealStartedRef.current = true;
        startRevealing();
      }
    }

    return () => {
      if (shuffleTimerRef.current !== null) {
        cancelAnimationFrame(shuffleTimerRef.current);
      }
      if (revealTimerRef.current !== null) {
        clearInterval(revealTimerRef.current);
      }
      if (delayTimerRef.current !== null) {
        clearTimeout(delayTimerRef.current);
      }
    };
  }, [value, seed, initialDelay, running, startShuffling, startRevealing, decodeByWord]);

  /**
   * Handle pause/resume without resetting.
   * If paused and resumed, animation continues from where it stopped.
   */
  useEffect(() => {
    // Clean up any existing timers
    if (shuffleTimerRef.current !== null) {
      cancelAnimationFrame(shuffleTimerRef.current);
    }
    if (revealTimerRef.current !== null) {
      clearInterval(revealTimerRef.current);
    }

    // Only start if running and value exists
    if (running && value.length > 0) {
      startShuffling();
      // Only restart reveal if it has already started (past initialDelay)
      if (revealStartedRef.current) {
        startRevealing();
      }
    }
  }, [running, value.length, startShuffling, startRevealing]);

  // Handle empty value: immediately call onComplete
  useEffect(() => {
    if (value.length === 0 && lockedIndices.size === 0 && onComplete) {
      onComplete();
    }
  }, [value.length, lockedIndices.size, onComplete]);

  return (
    <span
      className={className}
      aria-label={value}
      role="status"
    >
      {display.split('').map((char, idx) => (
        <span
          key={idx}
          data-locked={lockedIndices.has(idx) ? 'true' : 'false'}
          style={{
            // Optional: CSS transitions for smooth character locking
            transition: 'color 0.2s ease-out',
            color: lockedIndices.has(idx) ? 'currentColor' : 'gray',
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default DecodeText;
