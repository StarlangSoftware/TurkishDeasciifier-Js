import {Sentence} from "nlptoolkit-corpus/dist/Sentence";

export interface Desciifier {

    /**
     * The deasciify method which takes a {@link Sentence} as an input and also returns a {@link Sentence} as the output.
     *
     * @param sentence {@link Sentence} type input.
     * @return Sentence result.
     */
    deasciify(sentence: Sentence): Sentence
}