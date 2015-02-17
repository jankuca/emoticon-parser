var expect = require('expect.js');

var EmoticonParser = require('../lib/emo-parser');


describe('EmoticonParser', function() {
    var parser;

    beforeEach(function() {
        // Parser
        parser = new EmoticonParser({
            debug: false,
            emoticons: {
                zzz: {
                    emos: [':~']
                }
            },
            emoticon_html: '<{EMOTICON}/>'
        });
    });


    describe("Emoticon Parser Tests", function() {
        it("test built-in symbol emo", function() {
            expect(parser.parseText('test :)'))
                    .to.be('test <happy/>');
        });
        it("test built-in name wink", function() {
            expect(parser.parseText('test (wink)'))
                    .to.be('test <wink/>');
        });
        it("test user-defined symbol emo", function() {
            expect(parser.parseText('test :~'))
                    .to.be('test <zzz/>');
        });
        it("test user-defined symbol emo", function() {
            expect(parser.parseText('test (zzz)'))
                    .to.be('test <zzz/>');
        });
        it("test several symbols", function() {
            expect(parser.parseText('test :) :( '))
                    .to.be('test <happy/> <sad/>');
        });
        it("test new line 1", function() {
            expect(parser.parseText('test :)\n:( '))
                    .to.be('test <happy/>\n <sad/>');
        });
    });


    describe("Emoticon List Results", function() {
        it("test built-in symbol emo", function() {
            expect(parser.listEmoticonsInText('test :)'))
                    .to.eql([ 'happy' ]);
        });
        it("test built-in name wink", function() {
            expect(parser.listEmoticonsInText('test (wink)'))
                    .to.eql([ 'wink' ]);
        });
        it("test user-defined symbol emo", function() {
            expect(parser.listEmoticonsInText('test :~'))
                    .to.eql([ 'zzz' ]);
        });
        it("test user-defined symbol emo", function() {
            expect(parser.listEmoticonsInText('test (zzz)'))
                    .to.eql([ 'zzz' ]);
        });
        it("test several symbols", function() {
            expect(parser.listEmoticonsInText('test :) :( '))
                    .to.eql([ 'happy', 'sad' ]);
        });
        it("test new line 1", function() {
            expect(parser.listEmoticonsInText('test :)\n:( '))
                    .to.eql([ 'happy', 'sad' ]);
        });
    });
});
