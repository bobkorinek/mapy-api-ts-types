export const parseSentence = (sentence: string) => {
    const rawText = sentence.trim();

    if (rawText.length <= 1) {
        return null;
    }

    const endingSign = rawText[rawText.length - 1];
    const hasEndingSign = ['.', '!', '?'].includes(endingSign);

    return rawText[0].toUpperCase() + rawText.slice(1, hasEndingSign ? rawText.length - 1 : rawText.length) + (hasEndingSign ? endingSign : '.');
}