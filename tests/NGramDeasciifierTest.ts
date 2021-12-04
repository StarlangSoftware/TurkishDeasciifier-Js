import * as assert from "assert";
import {Sentence} from "nlptoolkit-corpus/dist/Sentence";
import {FsmMorphologicalAnalyzer} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import {NGram} from "nlptoolkit-ngram/dist/NGram";
import {NoSmoothing} from "nlptoolkit-ngram/dist/NoSmoothing";
import {NGramDeasciifier} from "../dist/NGramDeasciifier";

describe('NGramDeasciifierTest', function() {
    describe('NGramDeasciifierTest', function() {
        let fsm = new FsmMorphologicalAnalyzer();
        let nGram = new NGram<string>("ngram.txt");
        nGram.calculateNGramProbabilitiesSimple(new NoSmoothing<string>());
        let nGramDeasciifier = new NGramDeasciifier(fsm, nGram, false);
        it('testSentenceDeasciify', function() {
            assert.strictEqual("noter hakkında", nGramDeasciifier.deasciify(new Sentence("noter hakkinda")).toString());
            assert.strictEqual("sandık medrese", nGramDeasciifier.deasciify(new Sentence("sandik medrese")).toString());
            assert.strictEqual("kuran'ı karşılıklı", nGramDeasciifier.deasciify(new Sentence("kuran'ı karsilikli")).toString());
        });
    });
});
