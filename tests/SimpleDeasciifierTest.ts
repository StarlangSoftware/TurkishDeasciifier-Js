import * as assert from "assert";
import {Sentence} from "nlptoolkit-corpus/dist/Sentence";
import {SimpleDeasciifier} from "../dist/SimpleDeasciifier";
import {FsmMorphologicalAnalyzer} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";

describe('SimpleDeasciifierTest', function() {
    describe('SimpleDeasciifierTest', function() {
        let fsm = new FsmMorphologicalAnalyzer();
        let simpleDeasciifier = new SimpleDeasciifier(fsm);
        it('testSentenceDeasciify', function() {
            assert.strictEqual(new Sentence("üçkağıtçılık akışkanlaştırıcılık").toString(), simpleDeasciifier.deasciify(new Sentence("uckagitcilik akiskanlastiricilik")).toString());
            assert.strictEqual(new Sentence("çıtçıtçılık düşkırıklığı yüzgörümlüğü").toString(), simpleDeasciifier.deasciify(new Sentence("citcitcilik duskirikligi yuzgorumlugu")).toString());
        });
    });
});
