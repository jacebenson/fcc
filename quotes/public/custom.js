var GLOBAL = {};
GLOBAL.quoteUsed = '';
GLOBAL.quote = '';
GLOBAL.authorsArray = [];
GLOBAL.authors = {
  "The Flash (DC Universe)": [
    "Life doesn't give us purpose.  We give life purpose."
  ],
  "Olaf (Frozen)": [
    "Some people are woth melting for."
  ],
  "Merida (Brave)": [
    "Our fate lives within us, you only have to be brave enough to see it."
  ],
  "Spongebob SquarePants (Spongebob SquarePants)": [
    "I'm Ready! I'm Ready! I'm Ready!"
  ],
  "The Blue Fairy (Pinocchio)": [
    "Always let conscience be your guide"
  ],
  "Meowth (Pokemon)": [
    "We do have a lot in common, the same earth, the same air, the same sky.  Maybe if we started looking at what's the same instead of always looking at what's different... well, who knows?"
  ],
  "Cookie Monster (Sesame Street)": [
    "Friend something better than chocolate ice cream... maybe friend somebody you give up last cookie for."
  ],
  "Pocahontas (Pocahontas)": [
    "How high does a sycamore grow? If you cut it down, then you'll never know."
  ],
  "Sophie (Howl's Moving Castle)": [
    "They say the best blaze burns the brightest, when the circumstances are at their worst."
  ],
  "Fa Zhou (Mulan)": [
    "My, what beautiful blossoms we have this year.  But look, this one's late.  But I'll bet that when it blooms, it will be the most beautiful of all."
  ],
  "Patrick Star (Spongebob SquarePants)": [
    "Sometimes we have to go dep inside ourselves to solve our problems."
  ],
  "Iroh (Avatar: The Last Airbender)": [
    "In the darkest times, home is something you give yourself.  That is the meaning of inner strength."
  ],
  "The Emporer of China (Mulan)": [
    "The flower that blooms in adversity is the most rare and beautiful of all."
  ],
  "Snow White (Snow White and the Seven Drawfs)": [
    "You are never to old to be young."
  ],
  "Edna Mode (The Incredibles)": [
    "I never look back darling.  It distracts from the now."
  ],
  "Jake (Adventure Time)": [
    "Sucking at something is the first step to becoming sorta good at something."
  ],
  "Dory (Finding Nemo)": [
    "Just keep swimming."
  ],
  "Action Hank (Dexter's Laboratory)": [
    "It's not the beard on the outside that counts, it's the beard on INSIDE."
  ],
  "Stitch (Lilo & Stich)": [
    "Ohana means family.  Family means nobody gets left behind, or forgotten."
  ],
  "Mewtwo (Pokemon)": [
    "I see now that the circumstances of one's birth are irrevant; it is what you do with the gift of life that determines who you are."
  ],
  "Wreck-It Ralph (Wreck-It Ralph)": [
    "There's no one I'd rather be than me."
  ],
  "Chef G (Ratatouille)": [
    "You must not let anyone define your limits because of where you come from.  Your only limit is your soul."
  ],
  "Alice (Alice in Wonderland)": [
    "I can't go back to yesterday - because I was a different person then."
  ],
  "Elsa (Frozen)": [
    "Let it go, let it go."
  ],
  "Zeus (Hercules)": [
    "A true hero isn't measured by the size of his strength, but the strength of his heart."
  ],
  "Jack Skellington (The Nightmare Before Christmas)": [
    "Just because I cannot see it, doesn't mean I can't believe it."
  ],
  "Rafiki (The Lion King)": [
    "Oh yea, the past can hurt.  But, you can either run from it or learn from it."
  ],
  "Elasticgirl (The Incredibles)": [
    "Your identity is your most valuable possession.  Protect it."
  ],
  "Gerald Johanssen (Hey Arnold!)": [
    "It's real life.  Any in real life, you can't always win."
  ],
  "Phineas (Phineas and Ferb)": [
    "The only thing that is impossible, is impossibility."
  ],
  "The Fairy Godmother (Cinderella)": [
    "Even miracles take a little time."
  ],
  "BMO (Adventure Time)": [
    "When bad thing happen, I know you want to believe they are joke, but sometimes life is scary and dark.  That is why we must find the light."
  ],
  "Rapunzel (Tangled)": [
    "Venture outside your comfort zone.  The rewards are worth it."
  ],
  "Winnie the Pooh (Winnie-the-Pooh)": [
    "The things that make me different are the things that make me."
  ],
  "Master Splinter (Teenage Mutant Ninja Turtles)": [
    "There is not a monster more dangerous than a lack of compassion."
  ],
  "Tiana (Princess and the Frog)": [
    "Fairy tales can come true.  Your gotta make them happen, it all depends on you."
  ],
  "Quasimodo (The Hunchback of Notre Dame)": [
    "Today is a good day to try."
  ],
  "Mickey Mouse (Mickey Mouse)": [
    "To laugh at yourself is to love yourself."
  ],
  "Lois Foutley (As Told By Ginger)": [
    "Being in a relationship just for the sake of being in a relationship is plain crazy.  You gotta let your heart lead the way."
  ],
  "Chuckie Finster (Rugrats)": [
    "A baby's gotta do what a baby's gotta do!"
  ],
  "Jack (Samurai Jack)": [
    "The shell of an oyster only hides the pearl inside."
  ],
  "Dumbledore (Harry Potter and the Sorcerer's Stone)": [
    "It takes a great deal of bravery to stand up to your brave enemies, but a great deal more to stand up to your friends."
  ],
  "Master Shifu (Kung Fu Panda)": [
    "Anything is possible when you have inner peace"
  ],
  "Raven (Teen Titans)": [
    "I don't do fear."
  ],
  "Martian Manhunter (DC Universe)": [
    "The future is worth it.  All the pain.  All the tears.  The future is worth the fight."
  ],
  "Eeyore (Winnie-the-Pooh)": [
    "A little consideration, a little thought for others, makes all the differnce."
  ],
  "Mary Poppins (Mary Poppins)": [
    "In every job that must be done there is an element of fun."
  ],
  "Anna (Frozen)": [
    "Love is an open door."
  ],
  "Buzz Lightyear (Toy Story)": [
    "To infinity and beyond!"
  ],
  "Ellie (Up)": [
    "Adventure is out there."
  ]
}
for (var author in GLOBAL.authors) {
  if (GLOBAL.authors.hasOwnProperty(author)) {
    GLOBAL.authorsArray.push(author);
  }
};
//https://www.aaastateofplay.com/life-advice-from-50-beloved-characters-in-kids-entertainment/
function getRandomQuote() {
  // pick a new author
  var newAuthor = GLOBAL.authorsArray[Math.floor(Math.random() * (GLOBAL.authorsArray.length - 0) + 0)];
  //if the newauthor is the same as the last author, get some one else.
  if (GLOBAL.authorUsed == newAuthor) {
    while (GLOBAL.authorUsed == newAuthor) {
      newAuthor = GLOBAL.authorsArray[Math.floor(Math.random() * (GLOBAL.authorsArray.length - 0) + 0)]
    }
  }
  GLOBAL.authorUsed = newAuthor;
  var quotes = GLOBAL.authors[newAuthor];
  var randomQuote = quotes[Math.floor(Math.random() * quotes.length - 0) + 0];
  var quote = {
    text: randomQuote,
    author: GLOBAL.authorUsed
  };
  GLOBAL.quote = quote.text;
  return quote;
}
$(function () {
  var loadedQuote = getRandomQuote();
  $('#text').text(loadedQuote.text);
  $('#author').text(loadedQuote.author);
  $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hastags=quotes&related=freecodecamp&text=' + loadedQuote.text);
  $('#newquote').click(function () {
    lastQuote = GLOBAL.quoteUsed.toString();
    var newQuote = getRandomQuote();
    //$('#text').text(getRandomQuote(quotes));
    $('#text').text(newQuote.text);
    $('#author').text(newQuote.author);
    $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hastags=quotes&related=freecodecamp&text=' + newQuote.text);
  });
  /*$('#tweet').click(function () {
    var hrefForTweeting = 'https://twitter.com/intent/tweet?hastags=quotes&related=freecodecamp&text=';
    window.open(hrefForTweeting + GLOBAL.quote);
  });*/
})