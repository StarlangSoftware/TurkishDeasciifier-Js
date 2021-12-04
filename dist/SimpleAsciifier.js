(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-corpus/dist/Sentence", "nlptoolkit-dictionary/dist/Dictionary/Word"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SimpleAsciifier = void 0;
    const Sentence_1 = require("nlptoolkit-corpus/dist/Sentence");
    const Word_1 = require("nlptoolkit-dictionary/dist/Dictionary/Word");
    class SimpleAsciifier {
        /**
         * Another asciify method which takes a {@link Sentence} as an input. It loops i times where i ranges form 0 to number of
         * words in the given sentence. First it gets each word and calls asciify with current word and creates {@link Word}
         * with returned String. At the and, adds each newly created ascified words to the result {@link Sentence}.
         *
         * @param sentence {@link Sentence} type input.
         * @return Sentence output which is asciified.
         */
        asciify(sentence) {
            let result = new Sentence_1.Sentence();
            for (let i = 0; i < sentence.wordCount(); i++) {
                let word = sentence.getWord(i);
                let newWord = new Word_1.Word(this.asciifyWord(word));
                result.addWord(newWord);
            }
            return result;
        }
        /**
         * The asciify method takes a {@link Word} as an input and converts it to a char {@link Array}. Then,
         * loops i times where i ranges from 0 to length of the char {@link Array} and substitutes Turkish
         * characters with their corresponding Latin versions and returns it as a new {@link String}.
         *
         * @param word {@link Word} type input to asciify.
         * @return String output which is asciified.
         */
        asciifyWord(word) {
            let modified = word.getName();
            let result = "";
            for (let i = 0; i < modified.length; i++) {
                switch (modified[i]) {
                    case '\u00e7':
                        result += 'c';
                        break;
                    case '\u00f6':
                        result += 'o';
                        break;
                    case '\u011f':
                        result += 'g';
                        break;
                    case '\u00fc':
                        result += 'u';
                        break;
                    case '\u015f':
                        result += 's';
                        break;
                    case '\u0131':
                        result += 'i';
                        break;
                    case '\u00c7':
                        result += 'C';
                        break;
                    case '\u00d6':
                        result += 'O';
                        break;
                    case '\u011e':
                        result += 'G';
                        break;
                    case '\u00dc':
                        result += 'U';
                        break;
                    case '\u015e':
                        result += 'S';
                        break;
                    case '\u0130':
                        result += 'I';
                        break;
                    default:
                        result += modified[i];
                        break;
                }
            }
            return result;
        }
    }
    exports.SimpleAsciifier = SimpleAsciifier;
});
//# sourceMappingURL=SimpleAsciifier.js.map