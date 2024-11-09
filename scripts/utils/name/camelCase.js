export function camelCase(str) {
    // Remove special characters and split the string by non-alphabetic characters
    return str
        // Replace special characters with a space
        .replace(/[^a-zA-Z0-9]+/g, ' ')
        // Split the string into words
        .split(' ')
        // Iterate over each word
        .reduce((result, word, index) => {
            // Capitalize the first letter of each word except the first
            const lowerWord = word.toLowerCase();
            const capitalized = index > 0 ? lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1) : lowerWord;
            // Append the processed word to the result
            return result + capitalized;
        }, '');
}


// Usage examples
// console.log(camelCase('Foo Bar'));       // => 'fooBar'
// console.log(camelCase('--foo-bar--'));   // => 'fooBar'
// console.log(camelCase('__FOO_BAR__'));   // => 'fooBar'