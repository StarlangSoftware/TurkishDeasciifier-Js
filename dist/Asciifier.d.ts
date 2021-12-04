import { Sentence } from "nlptoolkit-corpus/dist/Sentence";
export interface Asciifier {
    /**
     * The asciify method which takes a {@link Sentence} as an input and also returns a {@link Sentence} as the output.
     *
     * @param sentence {@link Sentence} type input.
     * @return Sentence result.
     */
    asciify(sentence: Sentence): Sentence;
}
