
// var config = require('../config/config');
var positiveWords = {
    "A": ["absolutely", "adorable", "accepted", "acclaimed", "accomplish", "accomplishment", "achievement", "action", "active", "admire", "adventure", "affirm", "affirmative", "affluent", "agree", "agreeable", "amazing", "angelic", "appealing", "approve", "aptitude", "attractive", "awesome", "able", "acceptance", "accepting", "activate", "add", "addition", "advantage", "aid", "aim", "accuracy", "abundance", "appreciate", "appreciative", "assertive", "assertiveness", "audacity", "aware", "awareness", "authentic", "accountable", "accountability", "acknowledgement", "adventure", "adventurous", "adaptability", "agility", "alertness", "affection", "affectionate", "ambition", "amazed", "attentiveness", "anticipation", "authenticity", "animated", "awe", "awed", "adore", "awesomeness", "amusing", "astonished", "angel", "admirable", "altruism", "absolutely", "advantageous", "affinity", "amazement", "approval", "applaud", "attitude", "altitude", "ardor", "accolade", "admirer", "amicable", "accommodating", "awake", "awaken", "amplify", "aligned", "alignment", "assured", "articulate", "astounding", "approachable", "amiable", "alert", "adept", "alluring",],
    "B": ["beaming", "beautiful", "believe", "beneficial", "bliss", "bountiful", "bounty", "brave", "bravo", "bubbly", "blessing", "blessed", "blissful", "bloom", "balance", "blossom", "balanced", "brilliant", "beloved", "best", "better", "bold", "boldness", "bright", "brightness", "breezy", "brilliance", "bravery", "belonging", "breathtaking", "blazing", "beauty", "benevolent",],
    "C": ["calm", "celebrated", "certain", "champ", "champion", "charming", "cheery", "choice", "classic", "clean", "commend", "composed", "congratulations", "constant", "cool", "creative", "cute", "care", "caring", "create", "charm", "charming", "capable", "creativity", "celebration", "certainty", "charity", "cuddle", "comfort", "comfortable", "clean", "cuddly", "cheerful", "clarity", "commitment", "collaboration", "curiosity", "conscious", "change", "challenge", "communication", "community", "compassion", "connection", "connected", "centered", "courage", "courageous", "conviction", "competent", "consistent", "contribution", "courtesy", "cooperation", "closeness", "curiosity", "consideration", "communion", "collected", "conquer", "charisma", "congruence", "companionship", "consistency", "cordial", "cozy", "content", "compliment", "carefree", "credible", "clever", "contemplative", "congenial", "compassionate", "considerate", "cautious", "captivating", "confident", "courteous", "curious", "constructive", "committed",],
    "D": ["dazzling", "delight", "delightful", "distinguished", "divine", "direction", "delicious", "dream", "do", "dreamy", "daring", "decisive", "delighted", "dreamy", "dynamic", "delicate", "deserving", "decent", "desire", "devotion", "dignity", "dazzled", "devoted", "drive", "diversity", "dependability", "dedication", "discovery", "deep", "determined", "diligent", "dedicated", "detailed", "discreet", "direct", "decorous", "debonair", "dependable", "diplomatic",],
    "E": ["earnest", "easy", "ecstatic", "effective", "effervescent", "efficient", "effortless", "electrifying", "elegant", "enchanting", "encouraging", "endorsed", "energetic", "energized", "engaging", "essential", "esteemed", "ethical", "excellent", "excellence", "exciting", "exquisite", "empathy", "empathic", "ease", "easily", "education", "empowered", "encouraged", "enable", "elated", "encouragement", "engaged", "energy", "educated", "elegance", "effective", "excited", "excitement", "enjoy", "endurance", "experience", "expertise", "enjoyment", "eager", "elevate", "evolve", "expression", "empowering", "enchanted", "exhilarating", "enthusiastic", "ecstatic", "equality", "exemplary", "enlivened", "extraordinary", "expectant", "earnest", "enduring", "expansive", "exalted", "effortless", "easy", "going", "exuberant ", "entertaining", "endearing", "enterprising",],
    "F": ["fabulous", "fair", "familiar", "fantastic", "favorable", "fitting", "free", "fresh", "flourishing", "fortunate", "friendly", "fun", "funny", "flowing", "faith", "faithful", "favorite", "family", "flexibility", "focus", "fulfilled", "forgiving", "fascinating", "fancy", "fearless", "festive", "fit", "fortitude", "freedom", "frank",],
    "G": ["generous", "genius", "genuine", "giving", "glamorous", "glow", "glowing", "good", "gorgeous", "graceful", "great", "grin", "growing", "generosity", "genius", "gift", "genial", "generate", "giddy", "glad", "growth", "guidance", "guide", "give", "giving", "good", "goodness", "God", "grand", "great", "goddess", "gorgeous", "grounded", "glory", "grow", "gratitude", "gratefulness", "gratitude", "goodwill", "gentle",],
    "H": ["happy", "harmonious", "healing", "healthy", "heartwarming", "heartfelt", "heart", "hearty", "heavenly", "honest", "honorable", "honored", "hug", "hope", "humble", "happily", "human", "honesty", "harmony", "health", "hopeful", "hope", "healthy", "humor", "hero", "holy", "harness", "holiness", "honor", "hospitality", "helpful", "holistic", "hot", "humorous", "handsome", "hard", "working", "hilarious",],
    "I": ["idea", "ideal", "imaginative", "imagine", "imagination", "impressive", "independent", "innovate", "innovative", "instant", "instinctive", "intuitive", "intellectual", "intelligent", "inventive", "inspired", "inspiration", "interesting", "improvement", "influence", "inner peace", "insight", "integrity", "invigorating", "involvement", "intention", "intentional", "illumination", "intrepid", "innocence", "intense", "intimacy", "investment", "incomparable", "invincible", "interconnected", "incredible", "ingenious", "insightful", "inspiring", "inquisitive", "introspective", "industrious", "impartial",],
    "J": ["jovial", "joy", "jubilant", "joyful", "joyous", "jolly", "justice", "just",],
    "K": ["kind", "kindness", "knowing", "knowledgeable", "kiss", "keen",],
    "L": ["laugh", "light", "legendary", "learned", "lively", "lovely", "lucid", "lucky", "luminous", "like", "love", "leader", "loving", "liberty", "luxury", "life", "longevity", "lesson", "logical", "lovable", "loyal",],
    "M": ["marvelous", "masterful", "meaningful", "merit", "meritorious", "miraculous", "motivating", "moving", "meaningful", "meaning", "more", "magnificent", "mastery", "modesty", "motivation", "mercy", "mindfulness", "mindful", "miracle", "magic", "maturity", "meditation", "mastermind", "magnetism", "movement", "memorable", "mesmerizing", "majestic", "methodical", "motivated", "magnetic", "modest",],
    "N": ["natural", "nice", "now", "nurturing", "nutritious", "noble", "namaste", "nourishment", "neat", "nirvana", "nourish", "new",],
    "O": ["one", "open", "optimistic", "onwards", "openly", "outstanding", "order", "overcome", "oneness", "outgoing", "organized", "opportunity", "original", "open", "minded", "objective", "observant", "outspoken",],
    "P": ["positive", "paradise", "phenomenal", "pleasurable", "plentiful", "pleasant", "poised", "polished", "powerful", "prepared", "principled", "productive", "progress", "prominent", "protected", "proud", "passion", "persistent", "peace", "prosperity", "prosper", "persistence", "precision", "proactive", "punctual", "patience", "power", "perseverance", "playful", "play", "playfulness", "pleased", "pleasing", "purpose", "prepared", "present", "polite", "possibility", "promptness", "priceless", "participant", "progress", "privacy", "privilege", "patient", "persuasive", "protective", "passionate",],
    "Q": ["quality", "quick", "quiet", "quickening", "queen", "queenly", "quietness",],
    "R": ["ready", "reassuring", "refined", "refreshing", "rejoice", "relaxed", "respect", "reliable", "remarkable", "resounding", "respected", "restored", "reward", "rewarding", "right", "robust", "recommend", "relieve", "relieved", "refreshed", "resourceful", "reliable", "responsible", "renewed", "resilient", "reverence", "romance", "rainbow", "risk", "relationship", "revived", "revelation", "rest", "rested", "righteous", "release", "resplendent", "respectful", "resolute", "reflective", "receptive",],
    "S": ["safe", "satisfactory", "secure", "simple", "simplicity", "simplify", "skilled", "skillful", "smile", "soulful", "sparkling", "special", "spirited", "spiritual", "stirring", "stupendous", "stunning", "success", "successful", "sunny", "super", "superb", "supporting", "surprising", "sacred", "selfless", "self", "esteem", "serene", "serenity", "security", "sustained", "soulful", "self", "love", "self", "compassion", "self", "care", "service", "stimulating", "satisfying", "still", "surprised", "soul", "shelter", "space", "save", "sincere", "sympathetic", "strive", "spontaneous", "splendid", "supreme", "smart", "spectacular", "shine", "sublime", "steadfastness", "sunny", "strong", "strength", "sentimental", "shift", "synchronicity", "synergy", "serendipity", "stretch", "stellar", "supercharged", "self", "assured", "supportive", "self", "reliant", "steadfast", "sensitive", "steady", "spunky", "sensible", "selective",],
    "T": ["terrific", "thorough", "thrilling", "thriving", "top", "tranquil", "transforming", "transformational", "trusting", "truthful", "true", "truth", "trust", "tact", "teaching", "teachable", "team", "thankful", "thankfulness", "truthfulness", "tolerance", "tranquility", "transparency", "tender", "touch", "thriving", "tenacity", "triumph", "tender", "tradition", "timely", "trustworthy", "timing", "thrill", "transformation", "tough", "tenacious", "talkative", "talented", "tolerant", "thoughtful",],
    "U": ["unleashed", "uplift", "unconditional", "ultimate", "unwavering", "up", "upbeat", "upright", "upstanding", "useful", "understanding", "unity", "unbelievable", "upleveled", "understood", "unparalleled", "uncompromising", "unbiased", "unique", "unconventional", "unassuming",],
    "V": ["valued", "vibrant", "victorious", "victory", "vigorous", "virtuous", "vitality", "vivacious", "vitality", "value", "valuable", "variety", "versatility", "vulnerable", "vulnerability", "validation", "virtue", "venturous", "versatile",],
    "W": ["wealthy", "welcome", "well", "whole ", "wholesome", "willing", "wonderful", "wondrous", "worthy", "wow", "warm", "wonder", "worthiness", "win", "willingness", "wellness", "wholehearted", "wise",],
    "X": ["xoxo",],
    "Y": ["yes", "yummy", "yay", "you",],
    "Z": ["zeal", "zealous", "zest", "zing", "zestful"],
};

var generatePassHint = (password) => {
    let Hint = '';
    for (const char of password.split('')) {
        if (!char.match(/[a-z]/i)) {
            Hint += `${char}`;
        } else {
            const arr = positiveWords[char.toUpperCase()];
            Hint += `${arr[Math.floor(Math.random() * arr.length)]} `;
        }
    }
    return Hint.replace(/ {2}/g, ' ');
};

const getNewId = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}



const arrayToObject = (array, keyField) =>
    array.reduce((obj, item) => {
        obj[item[keyField]] = item
        return obj
    }, {})


const validEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

module.exports = {
    getNewId,
    arrayToObject,
    validEmail,
    generatePassHint,
};
