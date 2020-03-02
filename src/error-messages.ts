export function errInvalidArgTypeMsg(
    name: string,
    expected: string,
    actual: string
): string {
    return `The "${name}" argument must be of type ${expected}. Recieved type ${actual}`;
}

export function errOutOfRangeMsg(
    expected: string,
    received: string | number
): string {
    return `The value of "offset" is out of range. It must be ${expected}. Received ${received}`;
}

export function boundsErrorMsg(value: number, length: number): string {
    if (Math.floor(value) !== value) {
        return errOutOfRangeMsg("an integer", value);
    }

    if (length < 0) return "Attempt to access memory outside buffer bounds";

    return errOutOfRangeMsg(`>= 0 and <=${length}`, value);
}
