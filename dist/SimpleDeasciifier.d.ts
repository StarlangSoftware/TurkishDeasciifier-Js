import { Desciifier } from "./Desciifier";
import { Sentence } from "nlptoolkit-corpus/dist/Sentence";
import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import { Word } from "nlptoolkit-dictionary/dist/Dictionary/Word";
export declare class SimpleDeasciifier implements Desciifier {
    protected fsm: FsmMorphologicalAnalyzer;
    /**
     * A constructor of {@link SimpleDeasciifier} class which takes a {@link FsmMorphologicalAnalyzer} as an input and
     * initializes fsm variable with given {@link FsmMorphologicalAnalyzer} input.
     *
     * @param fsm {@link FsmMorphologicalAnalyzer} type input.
     */
    constructor(fsm: FsmMorphologicalAnalyzer);
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
    private generateCandidateList;
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
    candidateList(word: Word): Array<string>;
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
    deasciify(sentence: Sentence): Sentence;
}
