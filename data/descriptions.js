/* this file holds sentence fragments with negative, neutral, and positive tones
corresponding to the numeric answers for all ten questions */

var descriptionsArray = [
    
    { //You'd rather be part of the ground team exploring an uncharted planet than monitoring safely from orbit.X
        questionNumber: "1",
        low: "More comfortable pulling strings from behind the scenes than being out in the fray, ",
        neutral: "Equally comfortable behind the scenes or out in the field",
        high: "More comfortable out getting their hands dirty than riding in the backseat"
    },
    { //You prefer clean, minimalist decorum without clutter or ostentatious adornments.X
        questionNumber: "2",
        low: "appreciate settings with an ornate, elaborate decor",
        neutral: "appreciate environments with an eclectic mix of minimalism and extravagance",
        high: "appreciate clean, minimalist modern design"
    },
    { //You'd rather be a rogue agent or work with a small crew than be part of a large, rulebound organization. X
        questionNumber: "3",
        low: "thrives when working with large organizations under clearly-structured rulesets",
        neutral: "thrives equally as a cog in a structured system or a maverick out on their own",
        high: "thrives as a maverick playing by their own rules"
    },
    { //You want to settle on one planet to call home for years to come. X
        questionNumber: "4",
        low: "is in no hurry to settle down on any one planet, preferring to explore the galaxy",
        neutral: "could see settling down if they find the right planet, but is happy to continue world-hopping around the galaxy until they do",
        high: "is eager to find that one special planet to call home for the forseeable future"
    },
    { //You have or enjoy strong sense of space-humor. X
        questionNumber: "5",
        low: "isn't always big on joking around",
        neutral: "enjoys a good laugh, but knows life can't always be jokes and japery",
        high: "loves comedy and feels humour is a big part of what makes the galaxy go round"
    },
    { //You'd choose a desk job over one that involves a lot of action or physicality.X
        questionNumber: "6",
        low: "dislikes the desk-job approach, preferring more physical or action-packed vocations",
        neutral: "is just as engaged by working problems at desk as they are tackling things on a physical level",
        high: "prefers working with their mind at a desk to the rigors of manual labour"
    },
    { //You prefer artistic and imaginative pursuits over cold science and hard data. X
        questionNumber: "7",
        low: "have a keenly scientific mind, with little interest in more subjective, unquantifiable pursuits",
        neutral: "approach life with both sides of their brain, valuing arts and science with even hands",
        high: "are a dreamer at heart, approaching life with a powerful streak of imagination"
    },
    { //You hold your own sense of right and wrong in higher regard than any official authority. X
        questionNumber: "8",
        low: "respect authority, acknowledging that rules are usually there for a purpose",
        neutral: "know when to follow the rules as often as when to break them",
        high: "have little inherent respect for authority, prefering to judge things for themselves"
    },
    { //You're tempted by the idea of abandoning Council Space for a life of lawless piracy or opportunism in the Terminus Systems. X
        questionNumber: "9",
        low: "find life within civilized space to be as good as it gets, enjoying the safety and co-opertism of the Council's rule",
        neutral: "enjoy the civilized regions of space, but sometimes imagines living life on the edge as a rugged adventurer in the lawless Terminus Systems",
        high: "often think of leaving Council Space behind to set out for an outlaw's life in the Terminus Systems, with nobody to answer to but themselves, and no laws to protect or hinder them."
    },
    { //You believe it's in every species' best interest to work together in achieving a strong, diverse galactic community.
        questionNumber: "10",
        low: "believes it's up to every species to act in their own self-interests and preserve their individual civilzations, rejecting reliance on a greater galactic community that could fall prey to cultural divisions and war.",
        neutral: "accepts the overall value of a diverse and cooperative galactic community, though is hesitant to fully accept the idea of 'one happy family' as opposed to distinct civilizations in a mutually beneficial relationship.",
        high: "is eager to embrace the idea of a galactic civilization greater than the sum of its different species, seeing us all as children of the Universe, forging a brighter future together as one."
    },
    
]

module.exports = descriptionsArray;

`${q1answer}, ${profile.name} 
${q6answer}. ${q7answer}, and tend to ${q2answer}.
${profile.name} ${q5answer}, and ${q3answer}. They ${q8answer},
and ${q9answer}. ${profile.name} is ${q4answer}, and ${q10answer}`


var q1answer = "";
var q2answer = "";
var q3answer = "";
var q4answer = "";
var q5answer = "";
var q6answer = "";
var q7answer = "";
var q8answer = "";
var q9answer = "";
var q10answer = "";


switch (matchProfile.scores[0]) { //evaluate their answer to survey question #1
    case 1 || 2: 
        q1answer = descriptionsArray[0].low 
        break;
    case 3: 
        q1answer = descriptionsArray[0].neutral
        break;
    case 4 || 5: 
        q1answer = descriptionsArray[0].high
        break;
}


