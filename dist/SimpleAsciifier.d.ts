import { Asciifier } from "./Asciifier";
import { Sentence } from "nlptoolkit-corpus/dist/Sentence";
import { Word } from "nlptoolkit-dictionary/dist/Dictionary/Word";
export declare class SimpleAsciifier implements Asciifier {
    /**
     * Another asciify method which takes a {@link Sentence} as an input. It loops i times where i ranges form 0 to number of
     * words in the given sentence. First it gets each word and calls asciify with current word and creates {@link Word}
     * with returned String. At the and, adds each newly created ascified words to the result {@link Sentence}.
     *
     * @param sentence {@link Sentence} type input.
     * @return Sentence output which is asciified.
     */
    asciify(sentence: Sentence): Sentence;
    /**
     * The asciify method takes a {@link Word} as an input and converts it to a char {@link Array}. Then,
     * loops i times where i ranges from 0 to length of the char {@link Array} and substitutes Turkish
     * characters with their corresponding Latin versions and returns it as a new {@link String}.
     *
     * @param word {@link Word} type input to asciify.
     * @return String output which is asciified.
     */
    asciifyWord(word: Word): string;
}
