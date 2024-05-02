export const bibleBooks = [
    "Genesis",
    "Exodus",
    "Leviticus",
    "Numbers",
    "Deuteronomy",
    "Joshua",
    "Judges",
    "Ruth",
    "1 Samuel",
    "2 Samuel",
    "1 Kings",
    "2 Kings",
    "1 Chronicles",
    "2 Chronicles",
    "Ezra",
    "Nehemiah",
    "Esther",
    "Job",
    "Psalms",
    "Proverbs",
    "Ecclesiastes",
    "Song of Solomon",
    "Isaiah",
    "Jeremiah",
    "Lamentations",
    "Ezekiel",
    "Daniel",
    "Hosea",
    "Joel",
    "Amos",
    "Obadiah",
    "Jonah",
    "Micah",
    "Nahum",
    "Habakkuk",
    "Zephaniah",
    "Haggai",
    "Zechariah",
    "Malachi",
    "Matthew",
    "Mark",
    "Luke",
    "John",
    "Acts",
    "Romans",
    "1 Corinthians",
    "2 Corinthians",
    "Galatians",
    "Ephesians",
    "Philippians",
    "Colossians",
    "1 Thessalonians",
    "2 Thessalonians",
    "1 Timothy",
    "2 Timothy",
    "Titus",
    "Philemon",
    "Hebrews",
    "James",
    "1 Peter",
    "2 Peter",
    "1 John",
    "2 John",
    "3 John",
    "Jude",
    "Revelation"
]

export interface guessType {
    guess: string;
    percentage: number;
    icon: string;
}

export const percentageToColors = (percentage : number) => {
    const colorSquares = [];
    const numberOfTens = Math.floor(percentage / 20);

    for (let i = 0; i < numberOfTens; i++) {
        colorSquares.push("#7DC884");
    }

    if (percentage % 20 >= 5) {
        colorSquares.push("#B59F3B");
    } 
    
    const remainingSquares = 5 - colorSquares.length;
    for (let i = 0; i < remainingSquares; i++) {
        colorSquares.push("#3A3A3C");
    }

    return colorSquares;
}
