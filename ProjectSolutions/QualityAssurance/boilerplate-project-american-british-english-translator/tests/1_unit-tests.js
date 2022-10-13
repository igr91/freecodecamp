const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {

    // American to British English

    test('Translate "Mangoes are my favorite fruit." to British English', () => {
        const text = "Mangoes are my favorite fruit.";
        const translation = "Mangoes are my favourite fruit.";
        const translatedString = translator.removeSpan(translator.americanToBritish(text));
        assert.equal(translatedString, translation);
    });

    test('Translate "I ate yogurt for breakfast." to British English', () => {
        const text = "I ate yogurt for breakfast.";
        const translation = "I ate yoghurt for breakfast.";
        const translatedString = translator.removeSpan(translator.americanToBritish(text));
        assert.equal(translatedString, translation);
    });

    test('Translate "We had a party at my friend\'s condo." to British English', () => {
        const text = "We had a party at my friend's condo.";
        const translation = "We had a party at my friend's flat.";
        const translatedString = translator.removeSpan(translator.americanToBritish(text));
        assert.equal(translatedString, translation);
    });

    test('Translate "Can you toss this in the trashcan for me?" to British English', () => {
        const text = "Can you toss this in the trashcan for me?";
        const translation = "Can you toss this in the rubbish can for me?";
			        console.log(translator.americanToBritish(text));
        const translatedString = translator.removeSpan(translator.americanToBritish(text));
        assert.equal(translatedString, translation);
    });

    test('Translate "The parking lot was full." to British English', () => {
        const text = "The parking lot was full.";
        const translation = "The car park was full.";
        const translatedString = translator.removeSpan(translator.americanToBritish(text));
        assert.equal(translatedString, translation);
    });

    test('Translate "Like a high tech Rube Goldberg machine." to British English', () => {
        const text = "Like a high tech Rube Goldberg machine.";
        const translation = "Everything looks good to me!";
        const translatedString = translator.removeSpan(translator.americanToBritish(text));
        assert.equal(translatedString, translation);
    });

    test('Translate "To play hooky means to skip class or work." to British English', () => {
        const text = "To play hooky means to skip class or work.";
        const translation = "To bunk off means to skip class or work.";
        const translatedString = translator.removeSpan(translator.americanToBritish(text));
        assert.equal(translatedString, translation);
    });

    test('Translate "No Mr. Bond, I expect you to die." to British English', () => {
        const text = "No Mr. Bond, I expect you to die.";
        const translation = "No Mr Bond, I expect you to die.";
        const translatedString = translator.removeSpan(translator.americanToBritish(text));
        assert.equal(translatedString, translation);
    });

    test('Translate "Dr. Grosh will see you now." to British English', () => {
        const text = "Dr. Grosh will see you now.";
        const translation = "Dr Grosh will see you now.";
        const translatedString = translator.removeSpan(translator.americanToBritish(text));
        assert.equal(translatedString, translation);
    });

    test('Translate "Lunch is at 12:15 today." to British English', () => {
        const text = "Lunch is at 12:15 today.";
        const translation = "Lunch is at 12.15 today.";
        const translatedString = translator.removeSpan(translator.americanToBritish(text));
        assert.equal(translatedString, translation);
    });

    // British to American English

    test('Translate "We watched the footie match for a while." to American English', () => {
        const text = "We watched the footie match for a while.";
        const translation = "Everything looks good to me!";
        const translatedString = translator.removeSpan(translator.britishToAmerican(text));
        assert.equal(translatedString, translation);
    });

    test('Translate "Paracetamol takes up to an hour to work." to American English', () => {
        const text = "Paracetamol takes up to an hour to work.";
        const translation = "Everything looks good to me!";
        const translatedString = translator.removeSpan(translator.britishToAmerican(text));
        assert.equal(translatedString, translation);
    });

    test('Translate "First, caramelise the onions." to American English', () => {
        const text = "First, caramelise the onions.";
        const translation = "First, caramelize the onions.";
        const translatedString = translator.removeSpan(translator.britishToAmerican(text));
        assert.equal(translatedString, translation);
    });

    test('Translate "I spent the bank holiday at the funfair." to American English', () => {
        const text = "I spent the bank holiday at the funfair.";
        const translation = "I spent the public holiday at the funfair.";
        const translatedString = translator.removeSpan(translator.britishToAmerican(text));
        assert.equal(translatedString, translation);
    });

    test('Translate "I had a bicky then went to the chippy." to American English', () => {
        const text = "I had a bicky then went to the chippy.";
        const translation = "Everything looks good to me!";
        const translatedString = translator.removeSpan(translator.britishToAmerican(text));
        assert.equal(translatedString, translation);
    });

    test('Translate "I\'ve just got bits and bobs in my bum bag." to American English', () => {
        const text = "I've just got bits and bobs in my bum bag.";
        const translation = "I've just got bits and bobs in my fanny pack.";
        const translatedString = translator.removeSpan(translator.britishToAmerican(text));
        assert.equal(translatedString, translation);
    });

    test('Translate "The car boot sale at Boxted Airfield was called off." to American English', () => {
        const text = "The car boot sale at Boxted Airfield was called off.";
        const translation = "The swap meet at Boxted Airfield was called off.";
        const translatedString = translator.removeSpan(translator.britishToAmerican(text));
        assert.equal(translatedString, translation);
    });

    test('Translate "Have you met Mrs Kalyani?" to American English', () => {
        const text = "Have you met Mrs Kalyani?";
        const translation = "Have you met Mrs Kalyani?";
        const translatedString = translator.removeSpan(translator.britishToAmerican(text));
        assert.equal(translatedString, translation);
    });

    test('Translate "Prof Joyner of King\'s College, London." to American English', () => {
        const text = "Prof Joyner of King's College, London.";
        const translation = "Prof. Joyner of King's College, London."
        const translatedString = translator.removeSpan(translator.britishToAmerican(text));
        assert.equal(translatedString, translation);
    });

    test('Translate "Tea time is usually around 4 or 4.30." to American English', () => {
        const text = "Tea time is usually around 4 or 4.30.";
        const translation = "Tea time is usually around 4 or 4:30.";
        const translatedString = translator.removeSpan(translator.britishToAmerican(text));
        assert.equal(translatedString, translation);
    });

    // Highlight translation

    test('Highlight translation in "Mangoes are my favorite fruit."', () => {
        const text = "Mangoes are my favorite fruit.";
        const translation = "Mangoes are my <span class=\"highlight\">favourite</span> fruit.";
        const translatedString = translator.americanToBritish(text);
        assert.equal(translatedString, translation);
    });

    test('Highlight translation in "I ate yogurt for breakfast."', () => {
        const text = "I ate yogurt for breakfast.";
        const translation = "I ate <span class=\"highlight\">yoghurt</span> for breakfast.";
        const translatedString = translator.americanToBritish(text);
        assert.equal(translatedString, translation);
    });

    test('Highlight translation in "We watched the footie match for a while."', () => {
        const text = "We watched the footie match for a while.";
        const translation = "Everything looks good to me!";
        const translatedString = translator.britishToAmerican(text);
        assert.equal(translatedString, translation);
    });

    test('Highlight translation in "Paracetamol takes up to an hour to work."', () => {
        const text = "Paracetamol takes up to an hour to work.";
        const translation = "Everything looks good to me!";
        const translatedString = translator.britishToAmerican(text);
        assert.equal(translatedString, translation);
    });
});
