import { Input } from '@/components/ui/input';

type Props = {
    id?: string;
    name?: string;
    length: number;
    disabled?: boolean;
    autoFocus?: boolean;
};

/**
 * A single input for a numeric one-time code.
 *
 * Deliberately one field rather than one box per digit: a single input pastes correctly
 * from an SMS, works with autofill (`autoComplete="one-time-code"`), and does not trap
 * screen readers in a sequence of unlabelled boxes.
 *
 * `inputMode="numeric"` raises the number pad on mobile without the spinner arrows and
 * scroll-to-change behaviour that `type="number"` brings.
 */
export default function OtpInput({
    id = 'code',
    name = 'code',
    length,
    disabled,
    autoFocus,
}: Props) {
    return (
        <Input
            id={id}
            name={name}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="one-time-code"
            maxLength={length}
            required
            disabled={disabled}
            autoFocus={autoFocus}
            placeholder={'0'.repeat(length)}
            className="text-center font-mono text-2xl tracking-[0.5em]"
        />
    );
}
