import * as assert from "assert";
import {Sentence} from "nlptoolkit-corpus/dist/Sentence";
import {FsmMorphologicalAnalyzer} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import {NGram} from "nlptoolkit-ngram/dist/NGram";
import {NoSmoothing} from "nlptoolkit-ngram/dist/NoSmoothing";
import {NGramDeasciifier} from "../dist/NGramDeasciifier";
import {LaplaceSmoothing} from "nlptoolkit-ngram/dist/LaplaceSmoothing";

describe('NGramDeasciifierTest', function() {
    let fsm = new FsmMorphologicalAnalyzer();
    let nGram = new NGram<string>("ngram.txt");
    describe('NGramDeasciifierTest', function() {
        nGram.calculateNGramProbabilitiesSimple(new NoSmoothing<string>());
        let nGramDeasciifier = new NGramDeasciifier(fsm, nGram, false);
        it('testSentenceDeasciify', function() {
            assert.strictEqual("noter hakkında", nGramDeasciifier.deasciify(new Sentence("noter hakkinda")).toString());
            assert.strictEqual("sandık medrese", nGramDeasciifier.deasciify(new Sentence("sandik medrese")).toString());
            assert.strictEqual("kuran'ı karşılıklı", nGramDeasciifier.deasciify(new Sentence("kuran'ı karsilikli")).toString());
        });
    });
    describe('NGramDeasciifierTest2', function() {
        nGram.calculateNGramProbabilitiesSimple(new LaplaceSmoothing<string>());
        let nGramDeasciifier = new NGramDeasciifier(fsm, nGram, true);
        it('testSentenceDeasciify2', function() {
            assert.strictEqual("dün akşam yeni aldığımız çam ağacını süsledik", nGramDeasciifier.deasciify(new Sentence("dün aksam yenı aldıgımız cam agacini susledık")).toString());
            assert.strictEqual("ünlü sanatçı tartışmalı konu hakkında demeç vermekten kaçındı", nGramDeasciifier.deasciify(new Sentence("unlu sanatci tartismali konu hakkinda demec vermekten kacindi")).toString());
            assert.strictEqual("köylü de durumdan oldukça şikayetçiydi", nGramDeasciifier.deasciify(new Sentence("koylu de durumdan oldukca şikayetciydi")).toString());
        });
    });
});
