import {SimpleDeasciifier} from "./SimpleDeasciifier";
import {NGram} from "nlptoolkit-ngram/dist/NGram"
import {FsmMorphologicalAnalyzer} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import {Sentence} from "nlptoolkit-corpus/dist/Sentence";
import {Word} from "nlptoolkit-dictionary/dist/Dictionary/Word";

export class NGramDeasciifier extends SimpleDeasciifier{

    private nGram: NGram<string>
    private rootNGram: boolean
    private threshold: number = 0.0

    /**
     * A constructor of {@link NGramDeasciifier} class which takes an {@link FsmMorphologicalAnalyzer} and an {@link NGram}
     * as inputs. It first calls it super class {@link SimpleDeasciifier} with given {@link FsmMorphologicalAnalyzer} input
     * then initializes nGram variable with given {@link NGram} input.
     *
     * @param fsm   {@link FsmMorphologicalAnalyzer} type input.
     * @param nGram {@link NGram} type input.
     * @param rootNGram True if the NGram have been constructed for the root words, false otherwise.
     */
    constructor(fsm: FsmMorphologicalAnalyzer, nGram: NGram<string>, rootNGram: boolean) {
        super(fsm);
        this.nGram = nGram
        this.rootNGram = rootNGram
    }

    /**
     * Checks the morphological analysis of the given word in the given index. If there is no misspelling, it returns
     * the longest root word of the possible analyses.
     * @param sentence Sentence to be analyzed.
     * @param index Index of the word
     * @return If the word is misspelled, null; otherwise the longest root word of the possible analyses.
     */
    private checkAnalysisAndSetRoot(sentence: Sentence, index: number): Word{
        if (index < sentence.wordCount()){
            let fsmParses = this.fsm.morphologicalAnalysis(sentence.getWord(index).getName());
            if (fsmParses.size() != 0){
                if (this.rootNGram){
                    return fsmParses.getParseWithLongestRootWord().getWord();
                } else {
                    return sentence.getWord(index);
                }
            }
        }
        return undefined;
    }

    setThreshold(threshold: number){
        this.threshold = threshold
    }

    private getProbability(word1: string, word2: string): number{
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
    deasciify(sentence: Sentence): Sentence {
        let previousRoot = undefined
        let result = new Sentence();
        let root = this.checkAnalysisAndSetRoot(sentence, 0);
        let nextRoot = this.checkAnalysisAndSetRoot(sentence, 1);
        for (let i = 0; i < sentence.wordCount(); i++) {
            let word = sentence.getWord(i);
            if (root == undefined){
                let candidates = this.candidateList(word);
                let bestCandidate = word.getName();
                let bestRoot = word;
                let bestProbability = this.threshold;
                for (let candidate of candidates) {
                    let fsmParses = this.fsm.morphologicalAnalysis(candidate);
                    if (this.rootNGram){
                        root = fsmParses.getParseWithLongestRootWord().getWord();
                    } else {
                        root = new Word(candidate);
                    }
                    let previousProbability
                    if (previousRoot != null) {
                        previousProbability = this.getProbability(previousRoot.getName(), root.getName());
                    } else {
                        previousProbability = 0.0;
                    }
                    let nextProbability
                    if (nextRoot != undefined) {
                        nextProbability = this.getProbability(root.getName(), nextRoot.getName());
                    } else {
                        nextProbability = 0.0;
                    }
                    if (Math.max(previousProbability, nextProbability) > bestProbability) {
                        bestCandidate = candidate;
                        bestRoot = root;
                        bestProbability = Math.max(previousProbability, nextProbability);
                    }
                }
                root = bestRoot;
                result.addWord(new Word(bestCandidate));
            } else {
                result.addWord(word);
            }
            previousRoot = root;
            root = nextRoot;
            nextRoot = this.checkAnalysisAndSetRoot(sentence, i + 2);
        }
        return result;
    }

}