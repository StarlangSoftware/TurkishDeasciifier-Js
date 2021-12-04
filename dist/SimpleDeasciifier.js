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
    exports.SimpleDeasciifier = void 0;
    const Sentence_1 = require("nlptoolkit-corpus/dist/Sentence");
    const Word_1 = require("nlptoolkit-dictionary/dist/Dictionary/Word");
    class SimpleDeasciifier {
        /**
         * A constructor of {@link SimpleDeasciifier} class which takes a {@link FsmMorphologicalAnalyzer} as an input and
         * initializes fsm variable with given {@link FsmMorphologicalAnalyzer} input.
         *
         * @param fsm {@link FsmMorphologicalAnalyzer} type input.
         */
        constructor(fsm) {
            this.fsm = fsm;
        }
        /**
         * The generateCandidateList method takes an {@link Array} candidates, a {@link String}, and an integer index as inputs.
         * First, it creates a {@link String} which consists of corresponding Latin versions of special Turkish characters. If given index
         * is less than the length of given word and if the item of word's at given index is one of the chars of {@link String}, it loops
         * given candidates {@link Array}'s size times and substitutes Latin characters with their corresponding Turkish versions
         * and put them to newly created char {@link Array} modified. At the end, it adds each modified item to the candidates
         * {@link Array} as a {@link String} and recursively calls generateCandidateList with next index.
         *
         * @param candidates {@link ArrayList} type input.
         * @param word       {@link String} input.
         * @param index      {@link Integer} input.
         */
        generateCandidateList(candidates, word, index) {
            let s = "ıiougcsİIOUGCS";
            if (index < word.length) {
                if (s.indexOf(word.charAt(index)) != -1) {
                    let size = candidates.length;
                    for (let i = 0; i < size; i++) {
                        let modified = candidates[i];
                        switch (word.charAt(index)) {
                            case 'ı':
                                modified = modified.substring(0, index) + 'i' + modified.substring(index + 1);
                                break;
                            case 'i':
                                modified = modified.substring(0, index) + '\u0131' + modified.substring(index + 1);
                                break;
                            case 'o':
                                modified = modified.substring(0, index) + '\u00f6' + modified.substring(index + 1);
                                break;
                            case 'u':
                                modified = modified.substring(0, index) + '\u00fc' + modified.substring(index + 1);
                                break;
                            case 'g':
                                modified = modified.substring(0, index) + '\u011f' + modified.substring(index + 1);
                                break;
                            case 'c':
                                modified = modified.substring(0, index) + '\u00e7' + modified.substring(index + 1);
                                break;
                            case 's':
                                modified = modified.substring(0, index) + '\u015f' + modified.substring(index + 1);
                                break;
                            case 'I':
                                modified = modified.substring(0, index) + '\u0130' + modified.substring(index + 1);
                                break;
                            case 'İ':
                                modified = modified.substring(0, index) + 'I' + modified.substring(index + 1);
                                break;
                            case 'O':
                                modified = modified.substring(0, index) + '\u00d6' + modified.substring(index + 1);
                                break;
                            case 'U':
                                modified = modified.substring(0, index) + '\u00dc' + modified.substring(index + 1);
                                break;
                            case 'G':
                                modified = modified.substring(0, index) + '\u011e' + modified.substring(index + 1);
                                break;
                            case 'C':
                                modified = modified.substring(0, index) + '\u00c7' + modified.substring(index + 1);
                                break;
                            case 'S':
                                modified = modified.substring(0, index) + '\u015e' + modified.substring(index + 1);
                                break;
                        }
                        candidates.push(modified);
                    }
                }
                if (candidates.length < 10000) {
                    this.generateCandidateList(candidates, word, index + 1);
                }
            }
        }
        /**
         * The candidateList method takes a {@link Word} as an input and creates new candidates {@link Array}. First it
         * adds given word to this {@link Array} and calls generateCandidateList method with candidates, given word and
         * index 0. Then, loops i times where i ranges from 0 to size of candidates {@link Array} and calls morphologicalAnalysis
         * method with ith item of candidates {@link Array}. If it does not return any analysis for given item, it removes
         * the item from candidates {@link Array}.
         *
         * @param word {@link Word} type input.
         * @return ArrayList candidates.
         */
        candidateList(word) {
            let candidates = new Array();
            candidates.push(word.getName());
            this.generateCandidateList(candidates, word.getName(), 0);
            for (let i = 0; i < candidates.length; i++) {
                let fsmParseList = this.fsm.morphologicalAnalysis(candidates[i]);
                if (fsmParseList.size() == 0) {
                    candidates.splice(i, 1);
                    i--;
                }
            }
            return candidates;
        }
        /**
         * The deasciify method takes a {@link Sentence} as an input and loops i times where i ranges from 0 to number of
         * words in the given {@link Sentence}. First it gets ith word from given {@link Sentence} and calls candidateList with
         * ith word and assigns the returned {@link Array} to the newly created candidates {@link Array}. And if the size of
         * candidates {@link Array} is greater than 0, it generates a random number and gets the item of candidates {@link Array}
         * at the index of random number and assigns it as a newWord. If the size of candidates {@link Array} is 0, it then
         * directly assigns ith word as the newWord. At the end, it adds newWord to the result {@link Sentence}.
         *
         * @param sentence {@link Sentence} type input.
         * @return result {@link Sentence}.
         */
        deasciify(sentence) {
            let result = new Sentence_1.Sentence();
            for (let i = 0; i < sentence.wordCount(); i++) {
                let word = sentence.getWord(i);
                let fsmParseList = this.fsm.morphologicalAnalysis(word.getName());
                let newWord;
                if (fsmParseList.size() == 0) {
                    let candidates = this.candidateList(word);
                    if (candidates.length > 0) {
                        let randomCandidate = Math.floor(Math.random() * candidates.length);
                        newWord = new Word_1.Word(candidates[randomCandidate]);
                    }
                    else {
                        newWord = word;
                    }
                }
                else {
                    newWord = word;
                }
                result.addWord(newWord);
            }
            return result;
        }
    }
    exports.SimpleDeasciifier = SimpleDeasciifier;
});
//# sourceMappingURL=SimpleDeasciifier.js.map