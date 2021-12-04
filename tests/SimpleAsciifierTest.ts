import * as assert from "assert";
import {SimpleAsciifier} from "../dist/SimpleAsciifier";
import {Word} from "nlptoolkit-dictionary/dist/Dictionary/Word";
import {Sentence} from "nlptoolkit-corpus/dist/Sentence";

describe('SimpleAsciifierTest', function() {
    describe('SimpleAsciifierTest', function() {
        let simpleAsciifier = new SimpleAsciifier();
        it('testWordAsciify', function() {
            assert.strictEqual("cogusiCOGUSI", simpleAsciifier.asciifyWord(new Word("çöğüşıÇÖĞÜŞİ")));
            assert.strictEqual("sogus", simpleAsciifier.asciifyWord(new Word("söğüş")));
            assert.strictEqual("uckagitcilik", simpleAsciifier.asciifyWord(new Word("üçkağıtçılık")));
            assert.strictEqual("akiskanlistiricilik", simpleAsciifier.asciifyWord(new Word("akışkanlıştırıcılık")));
            assert.strictEqual("citcitcilik", simpleAsciifier.asciifyWord(new Word("çıtçıtçılık")));
            assert.strictEqual("duskirikligi", simpleAsciifier.asciifyWord(new Word("düşkırıklığı")));
            assert.strictEqual("yuzgorumlugu", simpleAsciifier.asciifyWord(new Word("yüzgörümlüğü")));
        });
        it('testSentenceAsciify', function() {
            assert.strictEqual(new Sentence("cogus iii COGUSI").toString(), simpleAsciifier.asciify(new Sentence("çöğüş ııı ÇÖĞÜŞİ")).toString());
            assert.strictEqual(new Sentence("uckagitcilik akiskanlistiricilik").toString(), simpleAsciifier.asciify(new Sentence("üçkağıtçılık akışkanlıştırıcılık")).toString());
            assert.strictEqual(new Sentence("citcitcilik duskirikligi yuzgorumlugu").toString(), simpleAsciifier.asciify(new Sentence("çıtçıtçılık düşkırıklığı yüzgörümlüğü")).toString());
        });
    });
});
