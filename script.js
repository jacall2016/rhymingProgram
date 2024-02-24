var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function generate() {
    return __awaiter(this, void 0, void 0, function () {
        var inputWord, rhymingWordsList, synonymsList, rhymingSynonymsList, antonymsList, rhymingAntonymsList, _a, synonyms, antonyms, rhymingWords, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inputWord = document.getElementById('inputWord').value;
                    rhymingWordsList = document.getElementById('rhymingWordsList');
                    synonymsList = document.getElementById('synonymsList');
                    rhymingSynonymsList = document.getElementById('rhymingSynonymsList');
                    antonymsList = document.getElementById('antonymsList');
                    rhymingAntonymsList = document.getElementById('rhymingAntonymsList');
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, getSynonymsAntonymsAndRhymingWords(inputWord)];
                case 2:
                    _a = _b.sent(), synonyms = _a.synonyms, antonyms = _a.antonyms, rhymingWords = _a.rhymingWords;
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
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error('Error generating synonyms, antonyms, and rhyming words:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getSynonymsAntonymsAndRhymingWords(word) {
    return __awaiter(this, void 0, void 0, function () {
        var synonymsApiUrl, antonymsApiUrl, rhymingWordsApiUrl, _a, synonymsResponse, antonymsResponse, rhymingWordsResponse, _b, synonymsData, antonymsData, rhymingWordsData, synonyms, antonyms, rhymingWords, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    synonymsApiUrl = "https://api.datamuse.com/words?rel_syn=".concat(word);
                    antonymsApiUrl = "https://api.datamuse.com/words?rel_ant=".concat(word);
                    rhymingWordsApiUrl = "https://api.datamuse.com/words?rel_rhy=".concat(word);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, Promise.all([
                            fetch(synonymsApiUrl),
                            fetch(antonymsApiUrl),
                            fetch(rhymingWordsApiUrl)
                        ])];
                case 2:
                    _a = _c.sent(), synonymsResponse = _a[0], antonymsResponse = _a[1], rhymingWordsResponse = _a[2];
                    return [4 /*yield*/, Promise.all([
                            synonymsResponse.json(),
                            antonymsResponse.json(),
                            rhymingWordsResponse.json()
                        ])];
                case 3:
                    _b = _c.sent(), synonymsData = _b[0], antonymsData = _b[1], rhymingWordsData = _b[2];
                    synonyms = synonymsData.map(function (entry) { return entry.word; });
                    antonyms = antonymsData.map(function (entry) { return entry.word; });
                    rhymingWords = rhymingWordsData.map(function (entry) { return entry.word; });
                    return [2 /*return*/, { synonyms: synonyms, antonyms: antonyms, rhymingWords: rhymingWords }];
                case 4:
                    error_2 = _c.sent();
                    console.error('Error fetching data:', error_2);
                    throw error_2; // Rethrow the error to be caught in the calling function
                case 5: return [2 /*return*/];
            }
        });
    });
}
function clearList(list) {
    list.innerHTML = '';
}
function displayWordsInList(words, list) {
    words.forEach(function (word) {
        var listItem = document.createElement('li');
        listItem.textContent = word;
        list.appendChild(listItem);
    });
}
function displayCommonWordsInList(words1, words2, list) {
    var commonWords = words1.filter(function (word) { return words2.includes(word); });
    displayWordsInList(commonWords, list);
}
document.addEventListener('DOMContentLoaded', function () {
    var inputWord = document.getElementById('inputWord');
    var rhymingWordsList = document.getElementById('rhymingWordsList');
    var synonymsList = document.getElementById('synonymsList');
    var rhymingSynonymsList = document.getElementById('rhymingSynonymsList');
    var antonymsList = document.getElementById('antonymsList');
    var rhymingAntonymsList = document.getElementById('rhymingAntonymsList');
    // Event delegation for click events on lists
    [rhymingWordsList, synonymsList, rhymingSynonymsList, antonymsList, rhymingAntonymsList].forEach(function (list) {
        list.addEventListener('click', function (event) {
            var _a;
            var clickedListItem = event.target.closest('li');
            if (clickedListItem) {
                inputWord.value = ((_a = clickedListItem.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
                generate();
            }
        });
    });
});
// Add this code in your script.ts file
var inputWordElement = document.getElementById('inputWord');
inputWordElement.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        generate();
        event.preventDefault(); // Prevent the default behavior of the 'Enter' key in forms
    }
});
