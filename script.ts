async function generate() {
    const inputWord = (<HTMLInputElement>document.getElementById('inputWord')).value;
    const rhymingWordsList = <HTMLUListElement>document.getElementById('rhymingWordsList');
    const synonymsList = <HTMLUListElement>document.getElementById('synonymsList');
    const rhymingSynonymsList = <HTMLUListElement>document.getElementById('rhymingSynonymsList');
    const antonymsList = <HTMLUListElement>document.getElementById('antonymsList');
    const rhymingAntonymsList = <HTMLUListElement>document.getElementById('rhymingAntonymsList');

    try {
        // Fetch synonyms, antonyms, and rhyming words asynchronously
        const { synonyms, antonyms, rhymingWords } = await getSynonymsAntonymsAndRhymingWords(inputWord);

        // Clear the previous lists
        clearList(synonymsList);
        clearList(antonymsList);
        clearList(rhymingWordsList);
        clearList(rhymingSynonymsList);
        clearList(rhymingAntonymsList);

        // Display the synonyms
        displayWordsInList(synonyms, synonymsList);

        // Display the antonyms
        displayWordsInList(antonyms, antonymsList);

        // Display the rhyming words
        displayWordsInList(rhymingWords, rhymingWordsList);

        // Display the words that are both synonyms and rhymes
        displayCommonWordsInList(synonyms, rhymingWords, rhymingSynonymsList);

        // Display the words that are both antonyms and rhymes
        displayCommonWordsInList(antonyms, rhymingWords, rhymingAntonymsList);

    } catch (error) {
        console.error('Error generating synonyms, antonyms, and rhyming words:', error);
    }
}
async function getSynonymsAntonymsAndRhymingWords(word: string): Promise<{ synonyms: string[], antonyms: string[], rhymingWords: string[] }> {
    const synonymsApiUrl = `https://api.datamuse.com/words?rel_syn=${word}`;
    const antonymsApiUrl = `https://api.datamuse.com/words?rel_ant=${word}`;
    const rhymingWordsApiUrl = `https://api.datamuse.com/words?rel_rhy=${word}`;

    try {
        const [synonymsResponse, antonymsResponse, rhymingWordsResponse] = await Promise.all([
            fetch(synonymsApiUrl),
            fetch(antonymsApiUrl),
            fetch(rhymingWordsApiUrl)
        ]);

        const [synonymsData, antonymsData, rhymingWordsData] = await Promise.all([
            synonymsResponse.json(),
            antonymsResponse.json(),
            rhymingWordsResponse.json()
        ]);

        // Extract the words from the responses
        const synonyms = synonymsData.map((entry: { word: string }) => entry.word);
        const antonyms = antonymsData.map((entry: { word: string }) => entry.word);
        const rhymingWords = rhymingWordsData.map((entry: { word: string }) => entry.word);

        return { synonyms, antonyms, rhymingWords };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to be caught in the calling function
    }
}

function clearList(list: HTMLUListElement): void {
    list.innerHTML = '';
}

function displayWordsInList(words: string[], list: HTMLUListElement): void {    
    words.forEach(word => {
        const listItem = document.createElement('li');
        listItem.textContent = word;
        list.appendChild(listItem);
    });
}

function displayCommonWordsInList(words1: string[], words2: string[], list: HTMLUListElement): void {
    const commonWords = words1.filter(word => words2.includes(word));
    displayWordsInList(commonWords, list);
}


document.addEventListener('DOMContentLoaded', function () {
    const inputWord = document.getElementById('inputWord') as HTMLInputElement;
    const rhymingWordsList = document.getElementById('rhymingWordsList') as HTMLUListElement;
    const synonymsList = document.getElementById('synonymsList') as HTMLUListElement;
    const rhymingSynonymsList = document.getElementById('rhymingSynonymsList') as HTMLUListElement;
    const antonymsList = document.getElementById('antonymsList') as HTMLUListElement;
    const rhymingAntonymsList = document.getElementById('rhymingAntonymsList') as HTMLUListElement;

    // Event delegation for click events on lists
    [rhymingWordsList, synonymsList, rhymingSynonymsList, antonymsList, rhymingAntonymsList].forEach(list => {
        list.addEventListener('click', function (event) {
            const clickedListItem = (event.target as HTMLElement).closest('li');
            if (clickedListItem) {
                inputWord.value = clickedListItem.textContent?.trim() || '';
                generate();
            }
        });
    });
});

// Add this code in your script.ts file
const inputWordElement = document.getElementById('inputWord') as HTMLInputElement;

inputWordElement.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        generate();
        event.preventDefault();  // Prevent the default behavior of the 'Enter' key in forms
    }
});
