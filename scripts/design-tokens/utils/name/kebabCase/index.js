export function kebabCase(str) {
    // Remove leading and trailing non-word characters and convert underscores to hyphens
    return str
        // Replace capital letters in the middle of words with hyphen + lowercase letter
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        // Replace non-alphanumeric characters (except hyphens) with a space
        .replace(/[^a-zA-Z0-9-.]+/g, ' ')
        // Trim spaces at the start and end of the string
        .trim()
        // Replace spaces and consecutive hyphens with a single hyphen
        .replace(/[\s-]+/g, '-')
        // Convert to lowercase
        .toLowerCase();
}

// Usage examples
// console.log(kebabCase('Foo Bar'));      // => 'foo-bar'
// console.log(kebabCase('fooBar'));       // => 'foo-bar'
// console.log(kebabCase('__FOO_BAR__'));  // => 'foo-bar'
