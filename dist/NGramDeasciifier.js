(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SimpleDeasciifier", "nlptoolkit-corpus/dist/Sentence", "nlptoolkit-dictionary/dist/Dictionary/Word", "fs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NGramDeasciifier = void 0;
    const SimpleDeasciifier_1 = require("./SimpleDeasciifier");
    const Sentence_1 = require("nlptoolkit-corpus/dist/Sentence");
    const Word_1 = require("nlptoolkit-dictionary/dist/Dictionary/Word");
    const fs = require("fs");
    class NGramDeasciifier extends SimpleDeasciifier_1.SimpleDeasciifier {
        /**
         * A constructor of {@link NGramDeasciifier} class which takes an {@link FsmMorphologicalAnalyzer} and an {@link NGram}
         * as inputs. It first calls it super class {@link SimpleDeasciifier} with given {@link FsmMorphologicalAnalyzer} input
         * then initializes nGram variable with given {@link NGram} input.
         *
         * @param fsm   {@link FsmMorphologicalAnalyzer} type input.
         * @param nGram {@link NGram} type input.
         * @param rootNGram True if the NGram have been constructed for the root words, false otherwise.
         */
        constructor(fsm, nGram, rootNGram) {
            super(fsm);
            this.threshold = 0.0;
            this.nGram = nGram;
            this.rootNGram = rootNGram;
            this.asciifiedSame = new Map();
            this.loadAsciifiedSameList();
        }
        /**
         * Checks the morphological analysis of the given word in the given index. If there is no misspelling, it returns
         * the longest root word of the possible analyses.
         * @param sentence Sentence to be analyzed.
         * @param index Index of the word
         * @return If the word is misspelled, null; otherwise the longest root word of the possible analyses.
         */
        checkAnalysisAndSetRoot(sentence, index) {
            if (index < sentence.wordCount()) {
                let fsmParses = this.fsm.morphologicalAnalysis(sentence.getWord(index).getName());
                if (fsmParses.size() != 0) {
                    if (this.rootNGram) {
                        return fsmParses.getParseWithLongestRootWord().getWord();
                    }
                    else {
                        return sentence.getWord(index);
                    }
                }
            }
            return undefined;
        }
        setThreshold(threshold) {
            this.threshold = threshold;
        }
        getProbability(word1, word2) {
            return this.nGram.getProbability(word1, word2);
        }
        /**
         * The deasciify method takes a {@link Sentence} as an input. First it creates a String {@link Array} as candidates,
         * and a {@link Sentence} result. Then, loops i times where i ranges from 0 to words size of given sentence. It gets the
         * current word and generates a candidateList with this current word then, it loops through the candidateList. First it
         * calls morphologicalAnalysis method with current candidate and gets the first item as root word. If it is the first root,
         * it gets its N-gram probability, if there are also other roots, it gets probability of these roots and finds out the
         * best candidate, best root and the best probability. At the nd, it adds the bestCandidate to the bestCandidate {@link Array}.
         *
         * @param sentence {@link Sentence} type input.
         * @return Sentence result as output.
         */
        deasciify(sentence) {
            var candidates;
            var isAsciifiedSame;
            let previousRoot = undefined;
            let result = new Sentence_1.Sentence();
            let root = this.checkAnalysisAndSetRoot(sentence, 0);
            let nextRoot = this.checkAnalysisAndSetRoot(sentence, 1);
            for (let repeat = 0; repeat < 2; repeat++) {
                for (let i = 0; i < sentence.wordCount(); i++) {
                    candidates = new Array();
                    isAsciifiedSame = false;
                    let word = sentence.getWord(i);
                    if (this.asciifiedSame.has(word.getName())) {
                        candidates.push(word.getName());
                        candidates.push(this.asciifiedSame.get(word.getName()));
                        isAsciifiedSame = true;
                    }
                    if (root == undefined || isAsciifiedSame) {
                        if (!isAsciifiedSame) {
                            candidates = this.candidateList(word);
                        }
                        let bestCandidate = word.getName();
                        let bestRoot = word;
                        let bestProbability = this.threshold;
                        for (let candidate of candidates) {
                            let fsmParses = this.fsm.morphologicalAnalysis(candidate);
                            if (this.rootNGram && !isAsciifiedSame) {
                                root = fsmParses.getParseWithLongestRootWord().getWord();
                            }
                            else {
                                root = new Word_1.Word(candidate);
                            }
                            let previousProbability;
                            if (previousRoot != null) {
                                previousProbability = this.getProbability(previousRoot.getName(), root.getName());
                            }
                            else {
                                previousProbability = 0.0;
                            }
                            let nextProbability;
                            if (nextRoot != undefined) {
                                nextProbability = this.getProbability(root.getName(), nextRoot.getName());
                            }
                            else {
                                nextProbability = 0.0;
                            }
                            if (Math.max(previousProbability, nextProbability) > bestProbability) {
                                bestCandidate = candidate;
                                bestRoot = root;
                                bestProbability = Math.max(previousProbability, nextProbability);
                            }
                        }
                        root = bestRoot;
                        result.addWord(new Word_1.Word(bestCandidate));
                    }
                    else {
                        result.addWord(word);
                    }
                    previousRoot = root;
                    root = nextRoot;
                    nextRoot = this.checkAnalysisAndSetRoot(sentence, i + 2);
                }
                sentence = result;
                if (repeat < 1) {
                    result = new Sentence_1.Sentence();
                    previousRoot = undefined;
                    root = this.checkAnalysisAndSetRoot(sentence, 0);
                    nextRoot = this.checkAnalysisAndSetRoot(sentence, 1);
                }
            }
            return result;
        }
        loadAsciifiedSameList() {
            let data = fs.readFileSync("asciified-same.txt", 'utf8');
            let lines = data.split("\n");
            for (let line of lines) {
                let list = line.split(" ");
                this.asciifiedSame.set(list[0], list[1]);
            }
        }
    }
    exports.NGramDeasciifier = NGramDeasciifier;
});
//# sourceMappingURL=NGramDeasciifier.js.map