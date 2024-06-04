import { SimpleDeasciifier } from "./SimpleDeasciifier";
import { NGram } from "nlptoolkit-ngram/dist/NGram";
import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import { Sentence } from "nlptoolkit-corpus/dist/Sentence";
export declare class NGramDeasciifier extends SimpleDeasciifier {
    private nGram;
    private rootNGram;
    private threshold;
    private asciifiedSame;
    /**
     * A constructor of {@link NGramDeasciifier} class which takes an {@link FsmMorphologicalAnalyzer} and an {@link NGram}
     * as inputs. It first calls it super class {@link SimpleDeasciifier} with given {@link FsmMorphologicalAnalyzer} input
     * then initializes nGram variable with given {@link NGram} input.
     *
     * @param fsm   {@link FsmMorphologicalAnalyzer} type input.
     * @param nGram {@link NGram} type input.
     * @param rootNGram True if the NGram have been constructed for the root words, false otherwise.
     */
    constructor(fsm: FsmMorphologicalAnalyzer, nGram: NGram<string>, rootNGram: boolean);
    /**
     * Checks the morphological analysis of the given word in the given index. If there is no misspelling, it returns
     * the longest root word of the possible analyses.
     * @param sentence Sentence to be analyzed.
     * @param index Index of the word
     * @return If the word is misspelled, null; otherwise the longest root word of the possible analyses.
     */
    private checkAnalysisAndSetRoot;
    /**
     * Sets minimum N-Gram probability threshold for replacement candidates.
     * @param threshold New N-Gram probability threshold
     */
    setThreshold(threshold: number): void;
    /**
     * Returns the bi-gram probability P(word2 | word1) for the given bigram consisting of two words.
     * @param word1 First word in bi-gram
     * @param word2 Second word in bi-gram
     * @return Bi-gram probability P(word2 | word1)
     */
    private getProbability;
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
    deasciify(sentence: Sentence): Sentence;
    /**
     * Loads asciified same word list. Asciified same words are the words whose asciified versions are also
     * valid Turkish words. For example, ascified version of 'ekşi' is 'eksi', ascified version of 'fön' is 'fon'.
     */
    loadAsciifiedSameList(): void;
}
