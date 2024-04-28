gsap.registerPlugin(ScrollTrigger);

const items = document.querySelectorAll(".work--grid");

items.forEach((item) => {
  gsap.from(item.querySelector(".article"), {
    autoAlpha: 0,
    y: 140,
    ease: "none",
    scrollTrigger: {
      trigger: item,
      
      start: "top bottom-=70",
      end: "+=1",
      toggleActions: "play none reverse none"
    }
  });

  gsap.to(item.querySelector(".article"), {
    autoAlpha: 0,
    y: -70,
    ease: "none",
    immediateRender: false,
    scrollTrigger: {
      trigger: item,
      markers: true,
      start: "bottom 140px",
      end: "+=1",
      toggleActions: "play play none reverse"
    }
  });
});

const menu_items = document.querySelector('.navigation__list');
gsap.from(menu_items.children, {
  opacity: 0,
  x: 0,
  duration: 1,
  delay: 1.5,
  stagger: {
    amount: 1
  }
});

gsap.utils.toArray('.star').forEach(star => {
  gsap.fromTo(star, {
    rotation: 450,
    opacity: 0,
    y: 100
  }, {
    rotation: 0,
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 1.5,
    scrollTrigger: star
  });
});

gsap.utils.toArray('.title').forEach(title => {
  gsap.fromTo(title, {
    letterSpacing: '10px',
    opacity: 0,
    x: 300,
    skewX: 65
  }, {
    letterSpacing: '0',
    opacity: 1,
    x: 0,
    skewX: 0,
    duration: 1,
    delay: .5,
    scrollTrigger: title
  });
});

const list_items = document.querySelectorAll('.skill-li');
list_items.forEach((item, index) => {
  gsap.fromTo(item, {
    opacity: 0,
    y: 300,
    skewX: 65
  }, {
    opacity: 1,
    y: 0,
    skewX: 0,
    duration: 1,
    delay: .25 + index * .25,
    scrollTrigger: item
  });
});

gsap.utils.toArray('.course_list').forEach(course_list => {
  gsap.fromTo(course_list, {
    opacity: 0,
    x: 150,
    skewX: 30
  }, {
    opacity: 1,
    x: 0,
    skewX: 0,
    duration: 1,
    delay: .25,
    scrollTrigger: course_list
  });
});

gsap.utils.toArray('p').forEach(p => {
  gsap.fromTo(p, {
    opacity: 0,
    x: 150,
    skewX: 30
  }, {
    opacity: 1,
    x: 0,
    skewX: 0,
    duration: 1,
    delay: .25,
    scrollTrigger: p
  });
});

gsap.utils.toArray('h3').forEach(h3 => {
  gsap.fromTo(h3, {
    opacity: 0,
    y: 150,
    skewX: 30
  }, {
    opacity: 1,
    y: 0,
    skewX: 0,
    duration: 1,
    delay: .25,
    scrollTrigger: h3
  });
});

gsap.utils.toArray('span').forEach(span => {
  gsap.fromTo(span, {
    opacity: 0,
    y: 150,
    skewX: 30
  }, {
    opacity: 1,
    y: 0,
    skewX: 0,
    duration: 1,
    delay: .25,
    scrollTrigger: span
  });
});

gsap.utils.toArray('h4').forEach(h4 => {
  gsap.fromTo(h4, {
    opacity: 0,
    x: 150,
    skewX: 30
  }, {
    opacity: 1,
    x: 0,
    skewX: 0,
    duration: 1,
    delay: .25,
    scrollTrigger: h4
  });
});

gsap.utils.toArray('.twitter').forEach(twitter => {
  gsap.fromTo(twitter, {
    opacity: 0,
    x: 150,
    skewX: 30
  }, {
    opacity: 0.5,
    x: 0,
    skewX: 0,
    duration: 1,
    delay: .25,
    scrollTrigger: twitter
  });
});

gsap.utils.toArray('.instagram').forEach(instagram => {
  gsap.fromTo(instagram, {
    opacity: 0,
    x: 150,
    skewX: 30
  }, {
    opacity: 0.5,
    x: 0,
    skewX: 0,
    duration: 1,
    delay: .25,
    scrollTrigger: instagram
  });
});

gsap.utils.toArray('small').forEach(small => {
  gsap.fromTo(small, {
    opacity: 0,
    x: -150,
    skewX: 30
  }, {
    opacity: 1,
    x: 0,
    skewX: 0,
    duration: 1,
    delay: .25,
    scrollTrigger: small
  });
});

gsap.utils.toArray('button').forEach(button => {
  gsap.fromTo(button, {
    opacity: 0,
  }, {
    opacity: 1,
    duration: 1,
    delay: 0.5,
    scrollTrigger: button
  });
});

gsap.from('.pyramid', {
  opacity: 0,
  scale: .5,
  duration: 1,
  delay: .25
});

gsap.fromTo('.hand', {
  scale: .2,
  opacity: 0,
  skewY: 30
}, {
  scale: 1,
  opacity: 1,
  skewY: 0,
  duration: 1,
  delay: .25,
  scrollTrigger: '.hand'
});

gsap.utils.toArray('.line').forEach(line => {
  gsap.fromTo(line, {
    opacity: 0,
    width: '0%'
  }, {
    opacity: 1,
    width: '100%',
    duration: 1,
    delay: 0.5,
    scrollTrigger: line
  });
});

gsap.utils.toArray('.rotation').forEach(rotate => {
  gsap.fromTo(rotate, {
    opacity: 0,
    rotation: 350,
    scale: .2
  }, {
    opacity: 1,
    rotation: 0,
    scale: 1,
    duration: 1,
    delay: 0.5,
    scrollTrigger: rotate
  });
});

gsap.fromTo('.card', {
  opacity: 0,
  scale: .1,
}, {
  opacity: 1,
  scale: 1,
  duration: 1,
  delay: .25,
  stagger: {
    amount: 1
  },
  scrollTrigger: '.card'
});

const menu = document.querySelector('.menu');

gsap.from(menu.children, {
  opacity: 0,
  x: 50,
  duration: 1,
  delay: .25,
  stagger: {
    amount: 1
  },
  scrollTrigger: {
    trigger: menu.children
  }
});

const notesData = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "<h3>The Power of Tiny Changes</h3><p>At its core, Atomic Habits is about the power of tiny, incremental changes. The central argument is that real, lasting change comes not from focusing on massive, sweeping transformations, but from zeroing in on the small, day-to-day habits and systems that shape our lives.</p><p>Clear makes a compelling case that we've been approaching behavior change all wrong. Most people fixate on outcomes and results - losing 20 pounds, writing a best-selling book, winning a championship. But this focus on goals is misplaced. <blockquote>&quot;You do not rise to the level of your goals. You fall to the level of your systems.&quot;</blockquote> In other words, it's the daily habits and processes that determine success or failure, not the end goal.</p><h3>The Habit Loop</h3><p>The key to understanding habits is the four-step feedback loop that underlies all behavior: cue, craving, response, reward. Some cue or trigger (like a notification on your phone) leads to a craving or desire (wanting to see the message), which motivates a response (checking the phone), which provides a reward (temporarily alleviating boredom or FOMO). Understanding this loop is essential to building good habits and breaking bad ones.</p><h3>Identity-Based Habits</h3><p>But where do you start when trying to change habits? Clear outlines three levels of behavior change: outcomes (changing results), processes (changing habits and systems), and identity (changing beliefs, worldview, judgments about yourself and others). Most people start with outcomes, but the most effective approach is to begin with identity. Figure out the type of person you want to be, then prove it to yourself with small wins. <blockquote>&quot;Every action you take is a vote for the type of person you wish to become.&quot;</blockquote></p><h3>The Four Laws of Behavior Change</h3><p>The book then lays out the &quot;Four Laws of Behavior Change,&quot; a simple set of rules for creating good habits and breaking bad ones. Each law comes with specific strategies you can implement:</p><ol><li><strong>Make it obvious.</strong> Use the Habits Scorecard to become aware of your current habits. Use implementation intentions (&quot;I will [BEHAVIOR] at [TIME] in [LOCATION]&quot;) to give your habits a time and place. Use habit stacking to tie a new habit to an existing one. And design your environment to make cues for good habits obvious and visible.</li><li><strong>Make it attractive.</strong> Use temptation bundling to make habits more appealing by linking them to something you enjoy. Join a culture or group where your desired behavior is the normal behavior. And create a motivational ritual by doing something you enjoy immediately before a difficult habit.</li><li><strong>Make it easy.</strong> Reduce friction by decreasing the number of steps between you and your good habits. Prime your environment to make future actions easier. Master the decisive moment - optimize the small choices that deliver outsized impact. Use the Two-Minute Rule to downscale habits until they can be done in two minutes or less. And automate your habits wherever possible.</li><li><strong>Make it satisfying.</strong> Give yourself an immediate reward when you complete your habit. When avoiding a bad habit, design a way to see the benefits. Use a habit tracker to keep your streak going and &quot;don't break the chain.&quot; Try to get back on track immediately when you slip up.</li></ol><h3>Environment is Everything</h3><p><img src='img/atomh1.png' width='800' height='800' alt='Notebook with habit tracker'></p><p>Throughout the book, Clear emphasizes the importance of environment. Habits are easier to build when they fit into the flow of your life, and you're far more likely to maintain good habits in a conducive environment. The inverse is also true - bad habits can often be eliminated simply by removing the cues that trigger them.</p><h3>Motivation and Craving</h3><p>Motivation and craving also play a key role in habit formation. Contrary to popular belief, dopamine is released not only when you experience pleasure, but also when you anticipate it. It's the anticipation of a reward - not the fulfillment of it - that gets us to take action. This is why temptation bundling and motivational rituals can be so effective.</p><h3>The Power of Repetition</h3><p>Another key insight is the power of repetition. Habits form based on frequency, not time. It doesn't matter how long your habit streak is; what matters is the number of times you've performed the behavior. That's why the best way to form a habit is to start with repetition, not perfection. <blockquote>&quot;Habits are the compound interest of self-improvement.&quot;</blockquote> The effects of your habits multiply as you repeat them, which means small habits can lead to remarkable results over time.</p><h3>Habits are Sticky</h3><p>Of course, the flip side of this is that once a habit becomes automatic, it can be hard to shake. Clear warns that habits are sticky - they persist even when we know they're not serving us. The key is to update them with small wins, one at a time. And to maintain good habits for the long haul, it's crucial to find a balance between the thrill of novelty and the comfort of familiarity. We need to keep habits interesting by following the Goldilocks Rule and seeking challenges of &quot;just manageable difficulty&quot;.</p><h3>A Powerful Guide to Behavior Change</h3><p>In the end, Atomic Habits is a powerful guide to behavior change. It takes complex psychological theories and distills them down to a simple set of rules that anyone can apply to build good habits and break bad ones. Armed with these insights, we can design our habits and our environment to deliver remarkable results - one tiny change at a time.</p>",
      category: "Productivity"
    },
    {
      title: "On Writing Well",
      author: "William Zinsser",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "<h3>To write well, write simply.</h3><p>At its core, On Writing Well argues that the key to good writing is simplicity. Zinsser makes a compelling case that clear, concise writing is the result of clear, disciplined thinking. <blockquote>&quot;Clear thinking becomes clear writing; one can't exist without the other.&quot;</blockquote> The secret to achieving clarity is to ruthlessly eliminate clutter and unnecessary words, stripping every sentence down to its cleanest, most essential components. By organizing thoughts logically and expressing them in the simplest possible terms, anyone can learn to write effectively.</p><p>Zinsser warns against the common tendency to overwrite, to use complex words and convoluted sentences in an attempt to sound impressive. In reality, this only makes writing harder to read and less engaging. <blockquote>&quot;The secret of good writing is to strip every sentence to its cleanest components.&quot;</blockquote> He advises questioning every word and cutting any that don't contribute meaning or serve the larger purpose of the piece. Rewriting and revising are essential to this process of refinement and simplification.</p><h3>The secret to writing with style is finding your authentic voice.</h3><p>While simplicity is paramount, Zinsser also emphasizes the importance of style - the unique voice and personality that each writer brings to the page. Rather than imitating others, writers must develop their own authentic style by writing naturally, as they would speak. <blockquote>&quot;Sell yourself, and your subject will exert its own appeal. Believe in your own identity and your own opinions.&quot;</blockquote> This means trusting your own instincts, experiences and perspective, and allowing your individuality to come through in your writing.</p><p>One way to cultivate a natural, conversational writing voice is to use the first person whenever possible. Writing in the first person (&quot;I,&quot; &quot;me,&quot; &quot;my&quot;) can help writers loosen up and connect more intimately with the reader. It allows for a casual, approachable tone and more freedom to express opinions, emotions and personality. Of course, the first person isn't appropriate for every context, like news reporting or certain academic writing. But for personal essays, memoir, travel writing, opinion pieces and other less formal genres, it's an invaluable tool for revealing the person behind the words.</p><h3>Words are a writer's tools, so consider word choices carefully.</h3><p>Just as a carpenter carefully selects the right tool for each task, a skillful writer chooses words thoughtfully and precisely. Zinsser urges writers to use simple, concrete language and to avoid cliches, jargon and trendy phrases that add bulk without enhancing meaning. While it's fine to occasionally use a long or complex word, too many of these can come across as pretentious and make the writing less readable. It's generally better to opt for short, clear words that get the point across with a minimum of fuss.</p><p>Using a thesaurus can help writers find the perfect word, but it's important not to simply swap in the longest or most impressive-sounding synonym. The connotation and tone of a word matters just as much as its literal definition. Zinsser advises reading work aloud to get a sense of the rhythm and flow of the language. If a word sounds awkward or unnatural in speech, it's probably not the right choice. <blockquote>&quot;The reader is someone with an attention span of about 30 seconds. If the reader realizes that a sentence is too long or a word's meaning is obscure, the writer has lost that reader.&quot;</blockquote> By using clear, familiar words and crafting elegant, rhythmic sentences, writers can better hold the reader's attention.</p><h3>Keep it focused and keep it consistent.</h3><p>Good writing requires focus and consistency of purpose. Before putting pen to paper or fingers to keyboard, writers should clearly define their audience, their core message and the desired style and tone of the piece. Every paragraph, every sentence, should then relate back to and support that central theme or point. Meandering off topic or indulging in irrelevant asides will only frustrate and confuse readers.</p><p>Consistency of style and tone is equally important to maintain throughout a piece of writing. If a writer opens with a breezy, humorous voice, then suddenly shifts to dense, jargon-filled prose halfway through, the reader will be justifiably baffled. <blockquote>&quot;Readers want the person who is talking to them to sound genuine. Therefore a fundamental rule is: be yourself.&quot;</blockquote> While some variety in rhythm and pacing is valuable, wild stylistic swings are not. Once a writer establishes a particular voice, the reader comes to expect and trust that voice will continue in a consistent way.</p><p>Of course, this doesn't mean writers can never break from their established style when the content demands it. Sometimes a tonal shift is needed to properly address a weighty subject or to deliver a powerful emotional punch. But such deviations should be intentional and carefully considered, not the result of carelessness or poor planning. In general, it's best to pick a lane and stay in it from start to finish.</p><h3>Want to engage your reader? Make your beginnings and endings count.</h3><p>The opening and closing of any piece of writing are crucial for hooking the reader's interest and leaving a lasting impression. Zinsser stresses the importance of crafting a strong, engaging lead that immediately draws the reader into the story or argument. <blockquote>&quot;The most important sentence in any article is the first one. If it doesn't induce the reader to proceed to the second sentence, your article is dead.&quot;</blockquote> Whether it's through a vivid anecdote, a surprising fact, a provocative question or a intriguing turn of phrase, the lead must give readers a reason to care and to keep reading.</p><p>Equally important is ending with a powerful, resonant conclusion that ties together the threads of the piece and lingers in the reader's mind. Rather than blandly restating the central point, the best endings often approach it from an unexpected angle, zooming out to a wider context or zeroing in on a telling detail. They might evoke a vivid image, a humorous or ironic twist, a poignant emotional note, or a call to action. But whatever approach they take, they should feel satisfying and inevitable, as if the entire piece has been building to that final thought.</p><p>To craft effective beginnings and endings, Zinsser advises writers to constantly question what's in it for the reader. What burning question or curiosity will pull them into the piece? What memorable insight or feeling should they take away? By framing the piece with the reader's desires and reactions in mind, writers are more likely to produce compelling work that delivers on the promise of the premise.</p><h3>Skilled writers generally polish their prose and avoid common pitfalls.</h3><p>Writing is hard work, and even the most talented writers rarely get it right on the first try. Producing polished, publishable prose requires diligence, discipline and a willingness to revise exhaustively. <blockquote>&quot;Rewriting is the essence of writing. I pointed out that professional writers rewrite their sentences over and over and then rewrite what they have rewritten.&quot;</blockquote> Zinsser stresses that this isn't just a matter of fixing grammar and punctuation, but of continually refining one's thoughts and improving how they're expressed on the page.</p><p>One key to more powerful writing is to use active voice whenever possible. In active constructions, the subject of the sentence performs the action (&quot;Joe saw the dog&quot;), while in passive voice, the subject receives the action (&quot;The dog was seen by Joe&quot;). Active voice tends to be more direct, concise and engaging, while passive often feels weak or evasive. It's also usually better to select punchy, precise verbs that render adverbs unnecessary. Rather than &quot;ferociously grab,&quot; just &quot;seize;&quot; don't &quot;run quickly,&quot; &quot;sprint.&quot;</p><p>Adjectives and qualifiers should also be used judiciously. Too many of these can clutter a sentence and weaken its impact. It's better to carefully choose words that do the desired work on their own, without an excess of modifiers. <blockquote>&quot;Most adjectives are also unnecessary. Like adverbs, they are sprinkled into sentences by writers who don't stop to think that the concept is already in the noun.&quot;</blockquote></p><p>By polishing each sentence down to its most potent, unadorned form, writers can produce clearer, more forceful prose that better connects with readers. And by learning to identify and weed out common writing pitfalls - like cliches, jargon, redundancy and awkward constructions - writers can elevate their work to a higher professional standard, even if they don't consider themselves literary artistes.</p><h3>If you want to inspire your reader, start by inspiring yourself.</h3><p>Perhaps the single most important factor in producing compelling writing is the writer's own passion and inspiration. Zinsser urges aspiring writers to tackle subjects that deeply fascinate and excite them, even if those topics seem quirky or highly specific. Genuine enthusiasm is contagious, and it can make even the most niche subject accessible and interesting to a general reader.</p><p>That's not to say writers should be blatantly promotional or blindly uncritical. But choosing to write about something you care about and believe in lends an energy and authenticity to the work that can't be faked. <blockquote>&quot;To write well about your life, you only have to be true to yourself. If you're faking it or composing to please someone else or writing to hook a market, nobody else will care.&quot;</blockquote> Readers can sense when a writer is going through the motions or pushing an agenda they don't fully support.</p><p>Of course, professional writers can't always choose their assignments. A journalist on the City Hall beat probably doesn't wake up every day burning with passion to cover zoning board meetings. But even when handed a seemingly dull subject, good writers find an angle that intrigues them, an element that rekindles their sense of curiosity and discovery. They might delve into the human drama behind the bureaucracy, or take a big picture view of how small decisions shape the community over time. The key is to unearth a spark of real interest, something that makes the writer care enough to dig deep.</p><p>And the quest for inspiration shouldn't end on the page. Zinsser encourages writers to actively pursue new experiences, meet interesting people and explore unfamiliar places. <blockquote>&quot;Living is the fuel that makes good writing possible. No topic is too specialized or too quirky if you make an honest connection with it.&quot;</blockquote> The broader and richer a writer's base of knowledge, the more raw material they have to work with. Combined with an open, inquisitive mind and a dedication to the craft, a lifetime of learning lays the foundation for inspired - and inspiring - writing.</p><h3>Don't fixate on the finished product – embrace the process of writing!</h3><p>Perhaps the most liberating piece of wisdom Zinsser offers is that good writing isn't a matter of innate talent or lightning-bolt inspiration, but the result of a deliberate, replicable process. While some writers may produce utterly transcendent prose in one draft, for most the path to powerful writing is paved with false starts, tough revisions and a whole lot of elbow grease. Accepting that reality is immensely freeing.</p> <p><blockquote>&quot;You won't write well until you understand that writing is an evolving process, not a finished product. Nobody expects you to get it right the first time, or even the second time.&quot;</blockquote> Letting go of the expectation of instant perfection allows writers to explore, experiment and make mistakes. It shifts the focus from an imagined flawless final draft to the imperfect, but essential, process of discovery and refinement.</p><p>Zinsser's antidote to perfectionist paralysis is to establish a regular writing routine in which you commit to producing a certain number of words per day or week. Sticking to this ritual, even when you don't feel particularly motivated or inspired, builds the discipline and stamina needed to bring major projects to fruition. And it reinforces the crucial lesson that writing is an active practice, not a divine visitation.</p><p>Of course, all that writing is just the raw material, not the finished product. Once you have a complete first draft, the real work begins - the painstaking process of reworking and refining those initial words and ideas. While Zinsser warns against getting so attached to a particular turn of phrase or clever conceit that you can't bear to cut it, he firmly believes that revision is where good writing becomes great. Rewriting is a chance to re-evaluate the content and structure of a piece, to sharpen the focus, strengthen transitions and hack away unnecessary verbiage.</p><p>Ultimately, this process of drafting, rewriting, and editing is about getting closer to the core of what you really want to say. It's about peeling back the layers of fluff and ornament to reveal the essential truth and beauty at the heart of your message. While that grueling process of refinement is rarely fun in the moment, the end result - a piece of writing that is unmistakably your own, that expresses your vision with clarity and force - is truly rewarding. Embrace the unglamorous day-to-day labor of the writing life, and in time it will yield work you can be proud of.</p>",
      category: "Writing"
    },
    {
      title: "The Lean Startup",
      author: "Eric Ries",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "<h3>The purpose of a start-up is to find a sustainable business model.</h3><p>The primary goal of any start-up is to discover a business model that is both profitable and sustainable in the long run. Even the most intricate plans, efficient execution, or media attention won't help if the underlying business model isn't viable. To be more than just a temporary project, a start-up must figure out how to acquire customers and generate revenue by serving their needs. <blockquote>The one and only goal for your start-up is to find a sustainable business model, one that works today and can work in the future as well.</blockquote> This means identifying the products potential customers want and determining how to convert that demand into a steady stream of income. Management's main responsibility is to align the entire company's daily efforts toward achieving this critical objective. The quicker a start-up validates its business model, the higher its chances of success.</p><h3>Find your sustainable business model through validated learning.</h3><p>To discover a sustainable business model, start-ups need to uncover what customers want and how to monetize it. This requires finding the right product-market fit and understanding how to sell to the target audience. Rather than starting with a perfect master plan, start-ups should engage in a process of continuous validated learning - testing hypotheses through a scientific approach.</p><p>Begin by formulating hypotheses about whether certain products will succeed in a given market, such as &quot;US customers will buy shoes online.&quot; Test these fundamental assumptions by talking to real customers in realistic scenarios, not through surveys or fictional personas. <blockquote>The most reliable way to find out whether people will buy your product is to offer it to them and see how they respond.</blockquote> Zappos famously validated demand for online shoe sales by photographing store inventory and gauging customer interest through a mock website. Only once hypotheses are confirmed through direct customer interaction can a start-up know it's moving in the right direction.</p><h3>The leap-of-faith assumptions: test your value and growth hypotheses.</h3><p>Developing a new product requires a leap of faith - the founder believes it will succeed even without hard proof. To quickly bridge the gap between belief and knowledge, every founder should define and test two core assumptions:</p><p>The value hypothesis proposes that the product will deliver real value, with early adopters eagerly embracing it. The growth hypothesis states that the product will expand beyond early adopters to capture a larger market. Both must be validated ASAP, as they determine if the effort of building the product is worthwhile.</p><p>Facebook masterfully confirmed its value and growth potential in the early days with just a few users. Over half of members logged in daily, proving the value hypothesis. Activation rates were also outstanding - 3/4 of students signed up within a month of launch with zero marketing spend, validating the growth hypothesis. <blockquote>Such impressive data made investors strong believers in the future success of this new social network, leading them to invest millions at a very early stage.</blockquote> Testing these leap-of-faith assumptions from the start is crucial for any start-up.</p><h3>Develop a minimal viable product to test your idea in the market.</h3><p>Many founders spend too much time developing products in isolation without validating actual customer demand. To build a sustainable business, you must determine as quickly as possible if the market desires what you're creating. The fastest way to get real customer feedback is by launching a minimal viable product (MVP) - the simplest possible version that provides a genuine user experience.</p><p>An MVP could be a basic prototype or even a &quot;smoke test&quot; that mimics the product, like Dropbox's intro video or Zappos' mock website. <blockquote>Similarly, every start-up should first find out whether there's an actual demand for their product before they start building it.</blockquote> By presenting the core concept to potential users in a relatable way, start-ups can gauge interest and refine their idea accordingly before investing heavily in development. Customer validation must come before committing significant resources to bring a complete product to life.</p><h3>Build, measure, learn – as fast and as often as possible.</h3><p>For a start-up to find a sustainable model, the top priority is learning - figuring out which products to create and how to profit from them. This learning can't occur in isolation; it requires constantly engaging customers, gathering feedback, and iterating. The build-measure-learn (BML) feedback loop facilitates this process.</p><p>First, build a basic version like a prototype or smoke test. Then, introduce this MVP to the actual market and collect quantitative data on customer reactions, such as how many tried to complete a purchase. Go beyond the raw numbers by speaking directly with customers to glean qualitative insights as well. <blockquote>What you learn in one cycle should then be used to conceptualize and build a new, optimized product, which brings you into the next BML cycle.</blockquote> Repeat this loop until you converge on a viable business model. Velocity is key, as each iteration refines the product and reveals valuable information about customer preferences. Maximizing the number of BML loops heightens the odds of success.</p><h3>Use split-tests to optimize your product.</h3><p>In developing products, start-ups must differentiate value from waste - identifying the features customers appreciate versus those they don't. Valuable features help attract users or boost revenue, while wasteful ones fail to do either, even if the internal team adores them. Split testing offers a powerful way to separate value from waste.</p><p>Whenever considering a new feature or change, create two product versions - one with the modification, one without. Test both variations to determine which customers prefer, just as mail order companies have long done with catalog layouts to optimize orders. <blockquote>Any change you wish to make to your product should be tested with this semi-scientific approach before you actually implement it.</blockquote> Want to see if a red or blue website converts better? Run a multivariate test directing traffic to two different page variations and compare click-through rates. Rigorously split test every potential product tweak to constantly enhance the user experience and business results.</p><h3>To find the right business model for your company, you usually have to pivot.</h3><p>A pervasive start-up myth is that relentless perseverance in executing an initial vision is the key to success. In reality, this stubborn adherence to a plan often leads start-ups to the &quot;land of the living dead&quot; - robotically plugging away at selling a product the market simply doesn't want. To dodge this fate, continually evaluate if you need to fundamentally alter your product to improve it or help it find its audience - a process known as pivoting.</p><p>Pivots come in many forms: redefining your product's core value, targeting a different customer segment, revamping the revenue model, switching to an alternate sales channel, etc. What they share is a major shift in the start-up's underlying assumptions, which then kicks off a new round of hypothesis testing. <blockquote>Deciding to pivot can be tough, and hence start-ups will often avoid and postpone making this decision.</blockquote> Instituting monthly &quot;pivot or persevere&quot; meetings to honestly assess the data and zombie potential can help. Many iconic start-ups, from Groupon to Instagram, pivoted multiple times before arriving at the right formula. Course correcting is usually a when, not an if, for finding a model that works.</p><h3>Every start-up should initially focus on one engine of growth.</h3><p>A core component of any business model is the engine of growth that allows the company to rapidly scale. The three primary growth engines are: sticky, viral, and paid. The sticky engine relies on retaining customers who already produce recurring revenue, not by attracting new users through marketing, but by adding features and delivering excellent service that increases usage of the existing base.</p> <p>With the viral engine, customers voluntarily spread awareness about the product through word of mouth, allowing the company to save considerably on advertising, à la Hotmail's classic email signature promotion. The paid engine centers on purchasing marketing, like Google Ads, which only works if the revenue from each new customer exceeds the cost to acquire them.</p><p>While all three engines can be used simultaneously, it's often prudent to concentrate on a single one at the outset to reach maximum velocity. <blockquote>Focusing on one engine of growth also makes it easier to assess the success of new features: if they help the growth engine gain speed, they're valuable; if not, they're waste.</blockquote> Achieving fast, sustainable growth requires identifying and fueling the right engine for your particular business.</p><h3>Vanity metrics are often flattering but misleading – they won't help you find a sustainable business model.</h3><p>To find a sustainable business model, start-ups must periodically pause for navigation. This guidance comes from carefully examining the right data points to gauge progress toward long-term objectives. Unfortunately, many start-ups succumb to tracking vanity metrics - flattering but ultimately empty stats that create an illusion of success without actually bringing the company closer to its goals.</p><p>Start-ups hooked on vanity metrics are staring into a &quot;slimming mirror&quot; that conceals real problems and impedes fixing them. Racking up media mentions, social media followers, or hours clocked coding can stroke the ego, but has little bearing on a venture's underlying health. <blockquote>To be successful, you must find a sustainable business model and grow a base of customers who use your product – and you can do neither if you're fixated on the wrong metrics.</blockquote> Vanity metrics are at best a distraction, and at worst blinders that cause start-ups to drive off a cliff. Resisting their siren song in favor of actionable data is vital.</p><h3>Every start-up has to define its core metrics and analyze them properly.</h3><p>Defining and diligently monitoring the right metrics is essential for any start-up. Only by watching the needle move on KPIs that reflect concrete business results will you know you're advancing toward the ultimate goal of a sustainable model. While each start-up's core metrics differ, common ones include growth in paying customers, average revenue per user, customer lifetime value, and viral coefficient.</p><p>Identifying the metrics that truly matter and regularly taking their pulse is how start-ups set priorities and measure genuine success. When analyzing this data, cohort analysis can yield additional insight by comparing the behavior of new versus existing customers. <blockquote>By comparing cohorts (in this case, groups of users who signed up at different times) and their respective recommendation rates, you can see whether you're advancing towards your goal.</blockquote> Slicing data in creative ways surfaces important trends and learning opportunities. Rigorous, consistent metrics definition and analysis is a start-up's compass for navigating the path to profitability.</p>",
      category: "Entrepreneurship"
    },
    {
      title: "Deep Work",
      author: "Cal Newport",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "<h3>Deep work is professional work that requires intense focus and concentration.</h3><p>Deep work refers to professional activities performed in a state of distraction-free concentration that push your cognitive abilities to their limit. This type of work is essential for mastering complex topics quickly and producing high-quality results in today's knowledge-based economy. In contrast, shallow work consists of logistical-style tasks that are often performed while distracted and tend not to create much new value.</p><p>The author argues that the ability to perform deep work is becoming increasingly rare at a time when it is more valuable than ever. <blockquote>To succeed with deep work you must rewire your brain to be comfortable resisting distracting stimuli.</blockquote> The book provides strategies and tips for arranging your life to support periods of intense, uninterrupted focus and to minimize distractions. By cultivating a deep work ethic, individuals can produce at an elite level and thrive professionally.</p><h3>Deep work is necessary for mastering complex topics more quickly.</h3><p>In an information economy, two core abilities are critical for thriving: 1) Quickly mastering hard things, and 2) Producing at an elite level in terms of quality and speed. Both of these abilities depend on your capacity for deep work. To learn hard things quickly, you must focus intensely without distraction. To produce at your peak level, you must work for extended periods with full concentration on a single task.</p><p><blockquote>Deep work is necessary to wring every last drop of value out of your current intellectual capacity.</blockquote> High-quality work produced equals time spent times intensity of focus. If you can increase your ability to focus intensely, you'll get more done in less time. Additionally, &quot;attention residue&quot; from constantly switching between tasks can significantly reduce cognitive performance. The common habit of working in a state of distraction is deeply suboptimal.</p><h3>Deep work promotes a sense of flow, meaning and sacredness.</h3><p>Beyond just being economically valuable, deep work is also meaningful on a personal level. Psychologically, the focused attention and challenge of deep work often induces a flow state - an enjoyable sense of full immersion and losing oneself in the activity. Deep work can generate a sense of sacred meaningfulness as well.</p><p>In the book <i>All Things Shining</i>, the authors argue that craftsmanship, in which one immerses fully in a task, allows individuals today to reclaim sacredness that was more readily available in past eras. <blockquote>Deep work is an activity well suited to generate a flow state... and flow generates happiness.</blockquote> By pursuing depth over superficiality, we give our minds something meaningful to latch onto and can derive greater satisfaction from our efforts.</p><h3>Evaluate your habits and actions to structure your time to protect deep work.</h3><p>To make deep work a regular part of your life, you must treat it as a priority and be proactive in designing your time. The book outlines several philosophies for integrating deep work into your schedule, including:</p><ul><li>Monastic - eliminating or radically minimizing shallow obligations</li><li>Bimodal - dedicating stretches of time exclusively for depth and leaving the rest open</li> <li>Rhythmic - consistently engaging in deep work sessions at a specific time each day</li><li>Journalistic - taking any unexpected free time to do deep work</li></ul><p>Whichever approach you choose, the key is to <blockquote>give every minute of your workday a job... Decide in advance what you will do with every minute of your workday.</blockquote> Structure blocks of uninterrupted time for intense focus. Don't just let your schedule fill up with shallow tasks by default. Eliminating shallow work takes discipline but pays major dividends.</p><h3>Some people integrate deep work daily; others periodically withdraw for complete focus.</h3><p>There is no one-size-fits-all formula for deep work. Some people, like the author, reserve a few hours at the same time every day for uninterrupted concentration. They make deep work a firm part of their daily routine. This works well for those who can regularly carve out chunks of time for depth.</p><p>Others take a more bimodal approach, alternating between periods of open time and periods that are exclusively for depth. They may spend one season doing primarily deep work while leaving other seasons more open. <blockquote>Without structure, it's easy to allow your time to devolve into the shallow – email, social media, web surfing.</blockquote> People with less consistent schedules may have an easier time scheduling depth in bigger chunks. A classic example is Bill Gates famously taking &quot;Think Weeks&quot; where he would isolate himself to do nothing but read and think big thoughts.</p><h3>To promote deep work, &quot;embrace boredom,&quot; &quot;quit social media,&quot; and &quot;drain the shallows&quot;.</h3><p>The author provides several specific tips to make deep work easier and more productive:<ol><li><b>Embrace boredom.</b> Don't reflexively turn to distractions when you feel bored. Practice resisting the urge to entertain yourself at the slightest hint of boredom. <blockquote>Instead of scheduling the occasional break from distraction so you can focus, you should instead schedule the occasional break from focus to give in to distraction.</blockquote></li><li><b>Quit social media.</b> Scrutinize the digital tools you use to see if their true benefits outweigh their negatives. Consider quitting social media entirely for 30 days to see if it has a net positive impact on your life. Most people find it's not as vital as they thought.</li><li><b>Drain the shallows.</b> Minimize the time you spend on shallow work like emails, meetings, etc. Be extremely selective about these obligations. Batch them together. Become hard to reach. Say no by default. <blockquote>Shallow work is inevitable, but you must keep it confined to a point where it doesn't impede your ability to take full advantage of the deeper efforts that ultimately determine your impact.</blockquote></li></ol></p><p>By putting these strategies into practice, you progressively intensify your deep work muscle and make concentrating for long periods of time easier. What seems challenging at first soon becomes natural, even enjoyable. Deep work is a skill that must be trained. But for those willing to put in the effort, the payoffs of increased productivity and meaning are immense.</p>",
      category: "Productivity"
    },
    {
      title: "The Power of Habit",
      author: "Charles Duhigg",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "<h3>Habits are simple cue-routine-reward loops that save effort.</h3><p>Habits allow our brains to work more efficiently by automating common tasks into an unthinking &quot;chunking&quot; process. MIT researchers discovered that as mice learned to navigate a maze and find chocolate, their brain activity decreased as their route became habitual. <blockquote>As many as 40 percent of the actions we perform each day are based on habit.</blockquote></p><p>Every habit follows a simple neurological loop: a cue (like your alarm ringing) tells your brain to go into automatic mode and prompts a routine (getting ready for work), which delivers a reward (a minty-fresh mouth from brushing your teeth). This loop become increasingly automatic as it is repeated. Habits are so resilient that they persist even in cases of significant brain damage.</p><h3>Habits stick because they create craving.</h3><p>We develop habits because the brain craves the rewards they provide. Experiments with monkeys showed that once a habit forms, the mere anticipation of the reward at the end of the habit loop causes a neurological craving and spike in brain activity. <blockquote>This anticipation is the neurological basis of craving and helps explain why habits are so powerful.</blockquote></p><p>Both &quot;good&quot; and &quot;bad&quot; habits work this way. People who exercise habitually actually crave the endorphin rush or sense of accomplishment. Companies like Pepsodent deliberately design products to provide tangible rewards, like that satisfying minty tingle, that consumers then start craving.</p><h3>To change a habit, substitute the routine for another and believe in the change.</h3><p>The golden rule for changing any habit is to keep the same cues and rewards but change the routine in between. For example, studies show smokers can identify their cues and rewards around smoking, like stress relief or social connection, and then replace cigarettes with a different routine that provides similar payoffs with less downside.</p><p>However, just altering the routine is often not enough, especially for deeply ingrained habits. <blockquote>For habits to permanently change, people must believe that change is feasible.</blockquote> Groups like AA succeed by providing habit replacements while also encouraging members to believe in their own capability for change. Practices that cement belief, whether religious or secular, help solidify new routines in the face of old habit loops.</p><h3>Change can be achieved by focusing on keystone habits and achieving small wins.</h3><p>Not all habits are created equal - some keystone habits spark chain reactions that help other good habits take hold. For example, when the new CEO of Alcoa made workplace safety his overriding priority, it caused managers to rethink and streamline the entire manufacturing process, resulting in huge productivity and profitability gains.</p><p><blockquote>Keystone habits work by providing small wins – that is, early successes that are fairly easy to attain.</blockquote> These small victories fuel transformative changes by leveraging tiny advantages into patterns that convince people bigger achievements are possible. Focusing on developing one or two keystone habits, like keeping a food journal, can naturally lead to other positive behaviors in many areas of life.</p><h3>Willpower is the most important keystone habit.</h3><p>Studies like Stanford's famous &quot;marshmallow test&quot; with preschoolers have demonstrated that willpower - the ability to delay gratification - is a pivotal keystone habit that predicts success throughout life. Children who resisted eating a marshmallow for 15 minutes in order to receive an extra treat later ended up with better grades, healthier relationships, and fewer substance abuse problems as adults.</p><p>More recent research confirms that willpower functions like a muscle: it can be exhausted by overuse but can also be strengthened through practice. <blockquote>By engaging in habits that demand resolution – say, adhering to a strict diet – you can actually strengthen your willpower.</blockquote> Building willpower through small but regular acts of self-control creates a foundation for life-changing breakthroughs.</p><h3>Organizational habits can be dangerous, but a crisis can change them.</h3><p>Just like individuals, organizations develop collective habits that shape how they function. These routines are often based on rivalries and politics rather than overall effectiveness. <blockquote>Under the surface, most organizations are battlegrounds on which individuals clamor for power and rewards.</blockquote> Destructive institutional habits, like the strict siloing that contributed to the deadly 1987 fire at London's King's Cross station, can have catastrophic results.</p><p>However, crises also provide organizations with opportunities to reform calcified habits and reshape collective priorities. Savvy leaders use a sense of urgency to implement new routines and break old patterns. Special investigator Desmond Fennel used the media circus around the London Underground investigation to push through safety reforms that had previously been resisted for years.</p><h3>Companies take advantage of habits in their marketing.</h3><p>Retailers and marketers take advantage of shoppers' habits, often subconsciously. Stores place the most profitable items to the right of the entrance since most people automatically turn right when they enter. They stock healthy items like produce at the front because customers who start by filling their carts with &quot;good&quot; choices are more likely to make guilty pleasure purchases later.</p><p>But while these one-size-fits-all tactics are effective, savvy companies now personalize their marketing based on consumers' individual habits. <blockquote>Target's analysis worked so well that it marketed to a pregnant teenage girl who hadn't yet told her family about her situation.</blockquote> To avoid backlash, Target disguised its targeted baby coupons among unrelated offers. New habits and products take hold more readily when they feel familiar.</p><h3>Movements are born from strong ties, peer pressure and new habits.</h3><p>Social habits play a huge role in successful grassroots movements. When Rosa Parks was arrested for refusing to give up her bus seat to a white passenger in 1955, her strong, diverse social ties across Montgomery's black community turned her case into a cause célèbre and provided the foundation for a sustained bus boycott.</p><p>However, close friendships alone would not have been enough. The boycott was also fueled by peer pressure from a broader network of acquaintances. <blockquote>When a person's larger network of friends and acquaintances support a movement, it is harder to opt out.</blockquote> Finally, the nonviolent protest habits advocated by Dr. Martin Luther King Jr. created a self-sustaining force for change after initial enthusiasm waned.</p><h3>We bear the responsibility for changing our habits.</h3><p>Habits can lead us to do things with little conscious thought, but that doesn't mean we aren't responsible for the consequences. In two high-profile court cases, defendants argued their crimes occurred because of overpowering subconscious habit loops:</p><p>Brian Thomas, who strangled his wife while experiencing a &quot;sleep terror,&quot; claimed an unconscious protective instinct took over when he mistakenly thought an intruder was attacking her. Angie Bachman said her compulsive gambling, which led her to lose over $1 million and accrue massive debts, was triggered by irresistible marketing from casinos who knew her psychological weaknesses.</p><p>While Thomas was acquitted and Bachman found liable, the diverging verdicts came down to awareness and agency. <blockquote>Once we become aware of a harmful habit, it becomes our responsibility to address and change it.</blockquote> Thomas had no reason to think he was putting his wife in danger. But Bachman knew she was a gambling addict and could have taken available steps to restrict casinos' access to her. Habit loops may be powerful, but we have the power to shape them.</p>",
      category: "Productivity"
    },
    {
      title: "The War of Art",
      author: "Steven Pressfield",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "<h3>A mental force called resistance opposes all our endeavors, and affects everyone.</h3><p>Whenever we try to pursue a calling or embark on a creative venture, we feel an internal force holding us back - this is resistance. Resistance is the negative voice that fills us with self-doubt and urges us to procrastinate whenever we try to break out of our routines. <blockquote>Resistance is impersonal and universal, and it affects anyone and everyone.</blockquote> It doesn't discriminate between interests - you'll feel it whether you're trying to start a diet, write a novel, or launch a business. Even accomplished professionals feel resistance's effects, like actor Henry Fonda throwing up before every performance. Resistance is a natural part of the creative process that we must learn to recognize and overcome.</p><h3>Resistance keeps us from becoming who we're meant to be, unless we use it to our advantage.</h3><p>We each have two lives - the &quot;lived&quot; life we experience every day and an &quot;unlived&quot; life where we harbor an unrealized dream or calling. Fear and self-doubt, which are manifestations of resistance, prevent us from fully embracing this unlived potential. However, <blockquote>instead of letting resistance stop you, use it to your advantage.</blockquote> The presence of fear actually indicates that a pursuit is meaningful and worth chasing. Hollywood actors often intentionally choose roles that scare them because they understand fear signifies a passion that will push them to do their best work. By reframing resistance as a compass pointing us toward what we care about most, we can harness it as motivation.</p><h3>The best way to fight resistance is to be a professional, and treat your dream like a full-time job.</h3><p>Instead of just working on your calling here and there, immerse yourself in it as if it were a career. Use your time creatively - Quentin Tarantino watched films while working at a video store and used &quot;free time&quot; to direct, learning more than he would have in film school. <blockquote>A person like Tarantino who is dedicated and does not give up when faced with a setback is a &quot;professional.&quot;</blockquote> You can apply skills from your day job, like discipline and focus, to your dream. Pursuing a calling requires showing up consistently, even when you don't feel inspired, as author Somerset Maugham illustrated with his quip about writing only when inspiration struck - at 9am sharp each day.</p><h3>Being a professional means knowing yourself and your craft.</h3><p>Since resistance never goes away completely, you must constantly combat it by understanding your strengths, limitations and field. Learn what you do best and where you need help. Surround yourself with other professionals who expand your abilities. <blockquote>A great director must know the limits of his craft, so he can know which areas would benefit the most from the contributions of others.</blockquote> Ask for guidance and never stop developing mastery of your domain. Even at the height of his golfing prowess, Tiger Woods still worked with a coach. Madonna's enduring pop stardom stems from constantly reinventing her style and sound. True professionals stay in a posture of continuous learning.</p><h3>A professional defeats resistance by being organized, patient and boldly facing adversity.</h3><p>Persistence and organization can weaken resistance's grip over time. Pace yourself for the long haul with sustainable habits rather than herculean sprints - focus on the process, not the end goal. <blockquote>Focusing on the process instead of trying to achieve the goal as quickly as possible will help weaken resistance.</blockquote> Expect and embrace adversity as an inevitable part of the journey. When Oprah Winfrey launched a show focused on guests' emotions, critics doubted a black woman could succeed in a white male-dominated field. But Oprah's commitment to her vision quickly made hers the #1 daytime talk show and pioneered discussing previously taboo topics. Resistance can actually refine our work if we persevere.</p><h3>There are positive mental forces we can use to counteract resistance.</h3><p>While resistance pushes against creativity, other forces pull us forward. The ancient Greeks spoke of Muses - nine goddesses who inspired artists and helped them overcome obstacles. <blockquote>We, too, need to try to &quot;invoke&quot; our muses to tap into forces around and thus defeat resistance.</blockquote> Hard work opens us up to sudden fits of &quot;madness&quot; or super-charged inspiration that can shake us out of complacency and habits. These positive influences are always available to support our efforts, but we must do the labor to attract them. An active dedication to our craft is the best way to enlist allies in the ongoing battle against resistance.</p><h3>Professionals battle against hierarchies to achieve their goals.</h3><p>Social hierarchies in workplaces, industries and institutions always oppose change and box people into limited roles. Focusing too much on your &quot;place&quot; leads to conforming your work to please others, seeing people as stepping stones, and fearing risks that could challenge the pecking order. <blockquote>Professionals do not define themselves by their place in a hierarchy. Rather, professionals battle hierarchies by remaining true to their craft, and working for themselves rather than for an audience.</blockquote> Steve Jobs refused to compromise his product vision and revolutionized multiple industries. Reiner Maria Rilke advised a young poet to write to please himself, not the critics. Serving your own creative standards produces more powerful work than chasing status within rigid power structures.</p><h3>Professionals commit themselves to a certain territory where they work to achieve their goal.</h3><p>Each person has their own &quot;territory&quot; - the place or domain where they practice their calling. For bodybuilder-turned-actor Arnold Schwarzenegger, it was the gym. Your territory is where you find sustenance - satisfaction and growth. <blockquote>Your territory is an endless resource. The only limit to how much your territory can give you back for your work is determined by how much you put into it.</blockquote> Claiming your territory requires showing up day after day, as filmmaker Woody Allen has done in writing over 70 screenplays and directing nearly 50 films. Staking out your territory doesn't just improve your craft - it can transform the field, as Bill Gates and Steve Jobs did by making computing accessible to the masses. Relentless devotion to your territory is the mark of a professional.</p>",
      category: "Self-Help"
    },
    {
      title: "The Artist's Way",
      author: "Julia Cameron",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "",
      category: "Self-Help"
    },
    {
      title: "The 4-Hour Workweek",
      author: "Tim Ferriss",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "<h3>For the New Rich, wealth means luxury in the here and now.</h3><p>The main goal is to become a member of the &quot;New Rich&quot; - a subculture characterized by mobility and financial freedom. They've realized that the right moment to truly live your life is now, not in some distant retirement. <blockquote>Basically, you only need two things to accomplish this: you more freedom and more free time.</blockquote> What most associate with millionaires - extensive travel, extravagant hobbies - essentially boils down to having freedom and free time. You can have those things without millions in the bank. The author accidentally discovered this when burnout forced him to take a break, during which he realized he could run a profitable business from anywhere with minimal effort. He joined the New Rich not through some magic formula, but by prioritizing freedom and free time over wealth accumulation.</p><h3>Redefine wealth and happiness.</h3><p>The DEAL formula for achieving the New Rich lifestyle starts with Definition. Redefine wealth not as having tons of money, but as the ability to do what people with money do - travel, pursue hobbies, spend time with family. <blockquote>To truly be happy, you should dedicate your time to doing things that excite you.</blockquote> Most people say their goal is happiness, but the author argues the opposite of happiness is boredom, not sadness. So the best definition of happiness is excitement. Buying a house or retiring with a hefty nest egg won't make you happy if you're not excited about how you spend your days. With wealth and happiness redefined, the question becomes how to free up time to do what excites you, not how to earn the most money possible.</p><h3>Save time by applying the 80/20 principle and eliminating time wasters.</h3><p>The E in DEAL stands for Elimination. About 80% of productivity comes from 20% of efforts, but this is hidden by the standard 8-hour workday. <blockquote>What you have to do is pinpoint and then prioritize the 20 percent of tasks that will yield 80 percent of results.</blockquote> Go through your to-do list and ask if you'd be satisfied if each task was the only thing you accomplished that day. If not, eliminate it. Cut out time wasters and interruptions that don't contribute to top priorities. Deal with email in batches once or twice a day instead of checking constantly. Explain to others that you're limiting email to serve them better. Let small tasks accumulate so you can handle them all at once. These approaches boost productivity and free up time for what matters most.</p><h3>Regular office employees can also live the New Rich lifestyle.</h3><p>Employees must liberate themselves from the office to achieve a 4-hour workweek, so the DEAL formula becomes DELA. Here's how:<ol><li>Increase your value to the company through training or taking on more responsibilities</li><li>Prove increased output when working remotely by tracking productivity on &quot;sick&quot; days</li><li>Quantify the business benefit of remote work using data</li>  <li>Propose a trial period of partial remote work</li><li>Expand remote work time if the trial demonstrates success</li></ol></p><p>By following these steps strategically, an employee like Sherwood, who wants to dedicate time to a side business, can slowly increase at-home days until working fully remotely. <blockquote>On these days, he keeps track of how much work he does with quantifiable records and an email trail – and he purposely doubles his work output, which is easy because there aren't any office-related distractions.</blockquote> Making yourself indispensable, showing proof of productivity, and framing remote work as a win for your boss is the path out of the office.</p><h3>Build a business that functions on autopilot without any work on your part.</h3><p>Automation, the A in DEAL, is key to detaching time spent working from money earned. The goal is <blockquote>to establish automated sources of income that can be maintained from anywhere in the world.</blockquote> Your business should basically run itself while you read reports and interject only when needed. Hire virtual assistants to handle responsibilities. Give them autonomy to communicate and solve problems independently. Consider affordable VAs from places like India. It may take trial and error to find the right people but the time and freedom gained is worth it. With the right automated architecture in place, you generate income without being consumed by work.</p><h3>You need a muse for your automated income.</h3><p>Your product, or &quot;muse&quot;, is the foundation of your automated income stream. Reselling existing products means slimmer margins, so design your own. <blockquote>The best place to look for a muse is in a niche that doesn't require you to invest much time or money up front to get started.</blockquote> Brainstorm ideas in markets you know. Establish expertise through credentials or self-education. You don't have to be the world's top expert, just better than competitors at convincing customers. Test market demand before going all in. Start small and scale up as sales increase. With a profitable muse, you can step back and let the automated business work for you.</p><h3>Test the market before making your product.</h3><p>The only way to know if your muse will succeed is to see if people actually buy. Before investing in inventory, Sherwood offered sailor shirts on eBay with a &quot;backordered&quot; note to gauge interest. He slowly increased orders as demand grew. Johanna, a yoga teacher, had a hunch climbers would like a specialized yoga DVD. She built a website, ran Google ads, and analyzed click data to validate the idea before producing the DVD. <blockquote>Once she'd collected all this information and was relatively sure that her muse would be a success, she produced the DVD and started distributing it – and sales were better than expected.</blockquote> Testing the market prior to a full product launch is essential for minimizing risk and ensuring your muse has real profit potential.</p><h3>Set a premium price point and make a big promise.</h3><p>To optimize your muse:<ul><li>Explain its purpose in one clear sentence</li>  <li>Limit options to make purchasing easy</li><li>Set a premium $50-$200 price for margins and attracting the right customers</li>  <li>Make a big promise and deliver on it</li></ul></p><p><blockquote>Your product should make a big promise – and deliver on that promise.</blockquote> Domino's 30-minutes-or-less guarantee and the author's 110% results assurance for BodyQUICK show customers you stand behind your muse. Bold promises, simple options, and premium positioning inspire confidence in your product. Combined with an automated sales architecture, you can transform a niche idea into a lucrative source of hands-off income to fund your New Rich life.</p>",
      category: "Entrepreneurship"
    },
    {
      title: "The $100 Startup",
      author: "Chris Guillebeau",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "<h3>Passion is not enough for business success; you also need customers and the right skills.</h3><p>Most people dream of turning their passions into a livelihood, but there's a catch - unless someone is willing to pay for it, your passion &quot;business&quot; is just a hobby. <blockquote>The true recipe for success is to find the sweet spot where your passions, your skills and the needs of others meet.</blockquote> The most important part of any business is providing value to customers. You may not be able to monetize your passion directly, but rather need to work in an adjacent field helping others pursue that passion. For example, a travel enthusiast started a business using his expertise to book amazing trips for others using their air miles. If you lack specific skills, rely on related ones and learn as you go, transforming your skillset along the way.</p><h3>Understand your customers' deepest needs and craft your offering accordingly.</h3><p>To provide value, you must know your customers intimately. Go beyond surface demographics and uncover their personality, passions, skills and values. <blockquote>Do they have any other problems you could solve or tweak your product to address?</blockquote> Survey potential buyers to gauge interest before creating your product. An even safer approach is to advertise first, sell to those who order, and only then produce what's been pre-sold. Keep in mind that stated and actual customer needs can differ. Wedding photographers know to take some traditional shots even when couples say they don't want any. Uncovering spoken and unspoken needs is key to crafting an irresistible offer.</p><h3>Get creative with your marketing, and focus on the benefits that your product provides.</h3><p>Great marketing provides value by highlighting benefits, not just features. Connect with customers' emotions - you're not selling horse rides, you're offering freedom. With a limited budget, get creative and hustle. <blockquote>Hustling means getting creative with marketing (e.g., connecting with journalists, collaborating with other companies, writing guest posts for blogs) rather than paying for advertising.</blockquote> Strategic giving, where you help others or give away products, can generate priceless word-of-mouth buzz. An unemployed architect gave 5-cent advice at a farmers market, impressing customers who later hired him for full-price projects and generating media coverage. Focus on providing value and the marketing takes care of itself.</p><h3>Successful launches rely on thorough preparation and instilling a sense of urgency.</h3><p>Entrepreneurs' worst nightmare is launching to crickets after months of development. Successful launches are the product of meticulous planning and building anticipation, like a Hollywood premiere. <blockquote>Engage them in good time before the launch; build up their anticipation by proactively telling them about the project you're working on, why it will be valuable to them and how the launch will unfold.</blockquote> Create urgency with limited-time offers and bonuses, reminding prospects as the deadline approaches. One online course made over $100K in 24 hours using a compelling story of a cross-country train trip as the launch deadline. When preparation meets urgency, sales skyrocket.</p><h3>A business needs to make money, so stay focused on your costs and income.</h3><p>No matter how passionate you are, your business must be profitable to survive. Many startups need little funding beyond a laptop and website. Keep costs low by only investing in what directly drives sales. Proactively develop new products and fix longstanding issues; don't just fight fires. <blockquote>Take time to think about developing your business and your offering.</blockquote> Track key metrics like daily sales and average order value to stay focused on cash flow. Creative funding options like crowdfunding can help if traditional loans aren't available. Passion may fuel you, but profit keeps your business engine running.</p><h3>Get paid more than once, price your product ambitiously and use small tweaks to make a big impact in profits.</h3><p>To maximize profitability, aim for recurring revenue with subscription models. Just 400 subscribers at $20/month yields nearly $100K annually. Price based on value provided, not production cost. A travel consultant charges the same $350 whether a booking takes 5 minutes or 5 hours. <blockquote>Quite often customers react far more positively than you'd suspect, the tone being, &quot;It's about time. You're worth much more than you charge!&quot;</blockquote> Offer a limited range of prices, including premium options. Continuously experiment with website traffic, visitor-to-sale conversion, and average sale price. Small tweaks to these core metrics compound into huge profit gains.</p><h3>Make your business as big as you want: stay small or grow by bringing in other people.</h3><p>Your growth ambitions may vary, and that's okay. Expand vertically by offering more to existing customers, or horizontally by serving new audiences. <blockquote>One website designer found that her customized designs were too expensive for some people, so she made some standard &quot;themes&quot; which she sold at a cheaper flat rate to more frugal customers.</blockquote> Outsource tasks that drain your time as you grow. But beware - if your business revolves around personal relationships or you're a control freak, outsourcing may do more harm than good. To sell your company someday, ensure it's scalable by being teachable to expand capacity and valuable to attract more customers.</p><h3>Keep plans simple so you can focus on the action.</h3><p>Overthinking and overplanning are the enemies of execution. Keep your business plan to one page, tersely outlining what you'll sell, to whom, why they'll buy, and how you'll get paid. Note marketing plans and key metrics. <blockquote>Finally, set yourself a deadline: &quot;I will launch this project no later than XX.&quot; This vital addition helps ensure your plan turns into action.</blockquote> Boil your mission statement down to a tweetable 140 characters, like &quot;I help busy, health-savvy people plan their workouts so they can feel good and keep fit.&quot; Ignore unhelpful advice, trust your judgment, and just get started. Nothing beats the feeling of that first sale.</p>",
      category: "Entrepreneurship"
    },
    {
      title: "The E-Myth Revisited",
      author: "Michael E. Gerber",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "<h3>A heroic entrepreneur with a great idea and technical know-how succeeding in business quickly? That's a myth.</h3><p>Most small businesses fail because of a fundamental misunderstanding called the &quot;E-Myth&quot; or entrepreneurial myth - the notion that having a good idea and technical skill is enough for business success. People start businesses because they excel at a certain craft, then suffer an &quot;entrepreneurial seizure&quot;, believing working for themselves will be better. <blockquote>You've made the fatal assumption, the mistaken belief that knowing how to do technical work means you know how to run a business.</blockquote> In reality, technical work and running a business require completely different skill sets. The barista who opens her own cafe assuming her coffee expertise is sufficient quickly becomes overwhelmed by the demands of management, hiring, and growth.</p><h3>Usually an entrepreneur's business won't survive past adolescence.</h3><p>Businesses go through stages like people - infancy, adolescence, and maturity. In infancy, the owner does everything. It feels liberating at first, but as success brings more customers and production, the work becomes unmanageable. Hiring help moves the business into adolescence, which also starts positively as the owner gains freedom. But <blockquote>most adolescent business owners enjoy freedom too much and manage by abdication instead of delegation,</blockquote> leaving tasks to others without proper oversight. Quality and control slip away. The owner must be pushed past their comfort zone where they controlled everything themselves for the business to mature. Most companies fail to make this transition.</p><h3>To nurture your business beyond the adolescent stage, you have to plan ahead from the start.</h3><p>Businesses that reach maturity are founded on an &quot;entrepreneurial perspective&quot; - a broader vision of how the company should look and operate without depending on the owner's constant presence. From day one, ask &quot;How will the business work?&quot; not just &quot;What work must be done?&quot; This entrepreneurial perspective informs an entrepreneurial model - <blockquote>a plan for your business that satisfies potential customers' needs in an innovative way.</blockquote> It defines your market opportunity, ideal customer, and product delivery strategy. Closing temporarily to gain this perspective and retool your business model can save an adolescent venture teetering on the edge of failure.</p><h3>Inside, everyone has many different business personalities.</h3><p>We each contain an Entrepreneur, Manager and Technician with competing drives. The Entrepreneur is a restless visionary chasing new opportunities. The Manager craves order and strives to make the Entrepreneur's ideas a predictable reality. The Technician just wants to do the hands-on work without interference from the other two. <blockquote>Although the three personalities inside us seem to be totally at odds with each other, we must utilize the strengths of each to run a successful business.</blockquote> The average small business owner is 10% Entrepreneur, 20% Manager and 70% Technician. All three must be balanced and leveraged for a company to succeed long-term.</p><h3>There's an ongoing revolution in small business that provides a path to success.</h3><p>The &quot;turn-key revolution&quot; is changing small business by building companies that could be handed to anyone to operate successfully. These &quot;business format franchises&quot; <blockquote>create a model that works perfectly, provides a predictable product to the customer with every purchase and can be replicated without the owner's presence.</blockquote> While 80% of regular small businesses fail in 5 years, 75% of franchises succeed by focusing on creating a replicable system rather than just delivering a product. McDonald's revolutionized the industry by engineering processes to deliver the same customer experience every time, viewing the franchisee as the true customer. Thinking of your business as a prototype to franchise forces you to make it sustainable.</p><h3>Imagine your small business will one day be a national chain; now, build the very first store.</h3><p>Your franchise prototype must deliver value to customers in a way that is systems-dependent, not expert-dependent. Design processes so simple and efficient, they no longer rely on you or any technical experts. <blockquote>If you don't document how your business works, how will someone be able to run it without you?</blockquote> Write an operations manual detailing every single process. Provide consistent, predictable service 100% of the time. No one will buy a franchise, or even frequent a business, if quality is erratic. View your company as the first store in a future franchise chain and build it accordingly from the ground up.</p><h3>Start a business to satisfy your personal aim in life.</h3><p>Your business should serve your life goals, not the other way around. Start by defining your Primary Aim - what kind of life you want in terms of money, impact, freedom, etc. Then craft a Strategic Objective for your business - a list of what the company must achieve to enable your Primary Aim, including financial targets, opportunity size, customer definition, etc. <blockquote>If you don't know what it'll help you achieve, how can you know what kind of business to build?</blockquote> Make your Primary Aim the guiding light of your business strategy so it enhances rather than consumes your life.</p><h3>Organizational charts are crucial for your business's growth and establishing accountability.</h3><p>An Organizational Strategy defines who will do what in the company. Even solopreneurs must plan an org chart for growth, determining what roles are needed. For each position, create a Position Contract specifying to whom they report, their responsibilities, and how performance will be measured. <blockquote>As the business grows, she'll need to know exactly how many people and for which positions she has to hire for her business to run successfully.</blockquote> Having one person wear many hats at first is fine, but document best practices for each role to ease eventual hiring. With clear functions and expectations, any employee can be held accountable for their piece of the machine.</p><h3>To manage your employees, don't rely on great people – rely on a great people-management system.</h3><p>Your Management System is a marketing tool because how you treat employees directly impacts the customer experience. Connect each person's work to the greater purpose. An inspired baker allowed to experiment will produce better cakes than one chained to routine. <blockquote>If your employees understand the meaning of the work they're doing, they're more likely to want to work to help the business reach its goals.</blockquote> Constantly test employees against clearly defined standards. Creative freedom comes with responsibility to achieve concrete objectives. With the right Management System, ordinary people can produce extraordinary results. You're not held hostage by the whims of &quot;stars&quot;.</p><h3>Next, forget everything and think only about the customer.</h3><p>Understanding your customers is so important, you should tune out everything else to focus solely on them. Learn their demographics and psychographics - not just who they are, but why they buy. <blockquote>With this information, the barista can present her products according to her customers' profiles, and they'll be more likely to buy.</blockquote> Appeal powerfully to their tastes and attitudes through products, branding, advertising, etc. As your clientele changes, your marketing must evolve. Use data to optimize relentlessly. Prototyping a predictable, scalable business requires marketing to customers as scientifically as possible.</p><h3>In the end, you'll have a business made up of fully functional systems.</h3><p>A mature business is a complex web of systems - hard, soft, and information - that interact to accomplish your Aims. <blockquote>To succeed, all these systems have to work together. You can't work on any one part of the business without considering all the other parts.</blockquote> People and equipment (hard systems) must collaborate smoothly, guided by the right attitudes and ideas (soft systems). Metrics (information systems) reveal what's working and what must change. Harmonizing systems is an ongoing balancing act. No component exists in isolation. Consider the whole when tinkering with the parts.</p><h3>This process of planning and implementing never stops.</h3><p>Entrepreneurship is a fluid, iterative Business Development Process of Innovation, Quantification, and Orchestration. Innovation means more than new products - it's asking &quot;What's the best way to do this?&quot; and improving the business itself. <blockquote>The Business Development Process never ends, because your business will constantly be creating new innovations, orchestrating them into real life and measuring the results.</blockquote> Quantification tracks how innovations perform in the real world to determine what sticks. Orchestration puts ideas into practice to see how they play with customers and employees. Plan, do, check, adjust, repeat - it's the pulse of a living business from startup through maturity.</p>",
      category: "Entrepreneurship"
    },
    {
      title: "The Personal MBA",
      author: "Josh Kaufman",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "<h3>Business school: Not only is it extremely expensive – chances are, it won't pay off.</h3><p>MBA programs at top business schools can cost over $300,000 when you factor in tuition, fees, loan interest, living expenses, and lost wages. Even lower-tier programs leave graduates with an average debt of nearly $42,000. Despite this huge investment, <blockquote>researchers from Stanford University and the University of Washington conducted an extensive study into the matter. Analyzing 40 years' worth of data, they found that there is no correlation between long-term career success and possessing an MBA.</blockquote> You can learn more effectively through experience, self-directed research, and resources like this book. An MBA is an unnecessary and overpriced credential that provides little tangible ROI in terms of career outcomes.</p><h3>The perfect business idea balances money and passion.</h3><p>Chasing a hot industry you hate is a recipe for misery and failure. You need genuine passion to power through the hard work of starting a business. <blockquote>If you know a certain amount about the specific market you're entering, you'll be able to make sound decisions, develop an attractive product and tackle the competition.</blockquote> However, rose-colored glasses can also blind you to a bad business idea. Loving expressionist art won't magically create demand for an expressionist museum in a small town. The key is finding a niche you're knowledgeable and excited about that also has real profit potential. Let your interests guide you, but vet your ideas with clear-eyed market research.</p><h3>Leveraging your investments can be rewarding, but it's also risky.</h3><p>Leverage means using borrowed money to amplify your potential gains. If you buy property with mostly loans and it doubles in value, you could make a 20x return on your small initial investment. <blockquote>But if the idea that borrowing more always means earning more seems a little too good to be true, well, you're right. Leverage can be risky because it also amplifies your losses.</blockquote> If that same leveraged property lost half its value instead, you'd lose 10x your starting capital. The 2008 financial crisis showed the catastrophic downside of excessive leverage. Used prudently, other people's money can jumpstart your business, but debt is always a double-edged sword.</p><h3>We've all got needs, and a product that satisfies them will sell.</h3><p>Good products fail all the time because they don't tap into core human drives. According to Harvard research, those key needs are: <ol><li>The desire to acquire and collect things</li><li>The drive to bond with others and feel valued</li>  <li>The urge to learn and satisfy curiosity</li><li>The motivation to protect ourselves and our loved ones</li></ol><blockquote>Any successful business fulfills one or more of its customers' needs,</blockquote> whether that's status-seeking through luxury goods, connecting on dating apps, or buying home security systems. Like a life-saving bottle of water to a lost desert hiker, your offer must quench a burning thirst. Evaluate how your product fits into this framework of fundamental human needs.</p><h3>A great product deserves great marketing.</h3><p>With so much noise and information overload today, you need a remarkable message delivered in a memorable way to grab customers' attention. Generic mass emails get ignored, but a personalized FedEx mailer stands out and shows effort, even if it costs more. <blockquote>A great way to highlight your product's end result is through testimonials, in a statement made by an ordinary person who overcame adversity, all thanks to your product.</blockquote> Remember, people don't buy products - they buy better versions of themselves. Tap into that aspiration with vivid storytelling that paints a picture of the results they desire. Invest in quality, targeted marketing materials that speak to people's deeper drives.</p><h3>Even when clients are reluctant, there are ways to make a sale.</h3><p>Fear of making the wrong choice causes customer hesitation. A retail salesperson can use &quot;puppy dog close&quot; tactics to get hesitant buyers to commit, like letting them take an item home and get attached before deciding. <blockquote>To encourage prospects to buy something, salespersons shoulder the risk of a bad transaction – by allowing the customer to return that cute puppy if things don't work out.</blockquote> Identify and proactively address the major barriers and objections that could derail the sale. If it's price, bundle in more value. If it's timing, create urgency and scarcity. If it's relevance, reframe why they need it now. Get inside the customer's head, calm their fears, and make saying yes feel safe and easy.</p><h3>To strike a great deal, it helps to prepare.</h3><p>The hardest work in a negotiation happens before you ever sit down at the table. First, set the stage: get the right person, choose the venue where you're most convincing, etc. Second, creatively craft the terms of your offer, anticipating objections and deciding what compromises you'll accept. <blockquote>Consider how attractive your offers will be to the other party, and in every case, search for ways to make the offer even more desirable.</blockquote> With the proper framing and strategy, the final step of actually haggling becomes much easier. Don't &quot;wing it&quot; in a high-stakes deal - put in the prep work to get what you want.</p><h3>A good leader is a good communicator.</h3><p>Employees can't execute well if you just bark orders at them. Explaining why a task matters and how it fits into the larger goal empowers them to take initiative and adapt to changing circumstances. Belittling people's ideas shuts them down, while an open dialogue keeps them engaged. <blockquote>Yet it's surprising how often we find ourselves dismissing our coworkers' comments. It might make you feel superior but it gets you nowhere.</blockquote> Never underestimate the power of simply communicating the plan clearly and respectfully. If your team understands the mission and feels psychologically safe, you won't have to micromanage - they'll figure out how to get it done.</p><h3>Use your day more effectively by listening to your body.</h3><p>Productivity isn't just about the sheer number of hours you put in. Your brain has a limited capacity, and overloading it with too many simultaneous tasks leads to dropped balls and costly mistakes. Personal energy also ebbs and flows in natural cycles, with most people peaking in the morning and experiencing 90-minute bursts throughout the day. <blockquote>If you're aware of these natural fluctuations, you can take advantage of the times when you feel energized. And more importantly, you can recognize when you're crashing and take a well-needed break.</blockquote> By aligning your work with your innate rhythms and bandwidth, you conserve willpower and get more done in less time. Tune into your body's signals to maintain sustainable peak performance for the long haul.</p>",
      category: "Entrepreneurship"
    },
    {
      title: "The 7 Habits of Highly Effective People",
      author: "Stephen R. Covey",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "<h3>In order to succeed, we must cultivate habits aligned with good principles.</h3><p>There are two main paradigms for success: the Personality Ethic, which focuses on superficial tricks and techniques, and the Character Ethic, which is based on developing inner character through adherence to universal principles. <blockquote>If we align our inner character with these rules, we'll achieve lasting results.</blockquote> Making changes based on character requires habitually perceiving and approaching the world in a principled way. Highly effective people make a habit of aligning their actions with deep, unchanging truths rather than chasing quick fixes. They work on themselves from the inside out, improving their character to improve their results.</p><h3>Take proactive control of your response to the world.</h3><p>A key difference between humans and animals is self-awareness - the ability to examine our programming and decide how to respond. Proactive people take responsibility for their reactions to external stimuli rather than being controlled by circumstances. <blockquote>When you're proactive, you have the freedom to choose how to engage with the world around you and the opportunity to determine your own destiny.</blockquote> Viktor Frankl survived concentration camps by choosing to imagine a positive future no matter his suffering. We can't always control what happens to us, but we can control our attitude and response. Focus your energy on your circle of influence - what you can actually change - instead of your circle of concern - what you can merely worry about.</p><h3>Begin every task with a desired outcome.</h3><p>Before taking action, imagine the ideal end result. Having a clear destination makes it easier to plot the right course. <blockquote>Whenever you perform an action, whether big or small, you're actually doing it twice. You see, before you physically carry out a process, you must first imagine it by conjuring up a plan.</blockquote> For short-term projects, flesh out schedules and goals ahead of time. For the long-term, craft a personal mission statement that articulates what you hope to achieve, what values you want to uphold, and what success truly means to you. Use this as a decision-making guide. When your mental blueprint is clear, you avoid wasted effort and costly mistakes. Begin with the end in mind.</p><h3>Put first things first.</h3><p>Even with clear goals, it's difficult to know what to prioritize when everything feels urgent. Use a time management matrix to classify tasks by urgency and importance. Quadrant I is urgent and important (crises), Quadrant II is important but not urgent (long-term projects), Quadrant III is urgent but not important (distractions), and Quadrant IV is neither urgent nor important (time wasters). <blockquote>While the items in Quadrant I are important, it's really the jobs in Quadrant II that deserve special attention.</blockquote> Quadrant II tasks are easy to neglect because they don't feel pressing, but investing in them prevents future Quadrant I emergencies. Focus on important tasks before they become urgent. Delegate anything that doesn't require your personal touch.</p><h3>Always look for the win-win scenario.</h3><p>Many see life as a zero-sum game - for me to win, you must lose. This scarcity mindset breeds competition and distrust. But with an abundance mentality, you realize there are enough resources and success to go around. <blockquote>When you realize there's always more value to be had, it's easier to look for ways to collaborate on attaining it.</blockquote> Seek win-win solutions that benefit all parties. In business, this could mean tying group bonuses to everyone hitting individual goals, fostering teamwork. With loved ones, it means balancing your needs with theirs. Win-win thinking turns adversaries into partners and unlocks creative cooperation. There's plenty of success to share.</p><h3>Build stronger relationships by truly understanding others.</h3><p>Strong relationships are based on mutual understanding, but we often focus more on being understood than on understanding. Highly effective people seek first to understand, then to be understood. <blockquote>To really cultivate personal connections, you must also understand. And to truly understand someone, you must learn to listen.</blockquote> Practice empathetic listening - grasp the thoughts and feelings behind someone's words before formulating your response. Reflect their emotions to show you're tuned in. When people feel heard, they reciprocate with openness and respect. It takes sincere effort, but empathy is the key that unlocks meaningful, productive relationships.</p><h3>Create powerful synergy by fostering the open exchange of ideas.</h3><p>Synergy is the creative cooperation that emerges when different people work together harmoniously. Each individual has unique strengths that, when combined, enhance the whole team's abilities. <blockquote>When groups work together, they can actually reinforce each other's positive attributes while mitigating their negative ones.</blockquote> To encourage synergy, create an environment of psychological safety where everyone can share ideas without fear of judgment. Build on each other's input to elevate the discussion beyond what any one person could produce alone. Like a diverse ecosystem thrives on interconnections, the most effective teams leverage their differences to spark new solutions. Foster trust and openness to unleash creative collaboration.</p><h3>Make the time to take care of yourself.</h3><p>In the pursuit of external achievement, it's easy to neglect your own well-being. But you can't be effective if you're running on empty. Highly effective people take the time to renew themselves across four dimensions: physical (healthy habits), spiritual (connecting with your values), mental (continuous learning), and social/emotional (building relationships). <blockquote>If you make a commitment to renew each of these dimensions, you'll continually reap the rewards.</blockquote> Exercise, sleep well, eat right. Meditate, pray, appreciate beauty. Read, discuss ideas, pick up new skills. Socialize, empathize, spread joy. When your personal foundation is strong, you're better equipped to execute in every other arena. Sharpen the saw to avoid dulling your most precious tool - yourself.</p>",
      category: "Self-Help"
    },
    {
      title: "The Stuff of Thought",
      author: "Steven Pinker",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "<h3>Even the most tragic events can spur linguistic debates, and words have more practical importance than we think.</h3><p>Language shapes how we perceive and respond to the world, even in the midst of tragedy. After 9/11, a semantic debate emerged over whether the attacks constituted one event or two separate ones. <blockquote>While such distinctions might seem insignificant, they're actually more important than people might believe. After all, words, and the details around them, have a great deal of practical importance in daily life.</blockquote> In this case, the one-versus-two debate held $3.5 billion in insurance payouts in the balance. The leaseholder would receive double the compensation if the attacks were considered distinct events. Beyond intellectual curiosity, linguistic nuances carry real-world weight, especially in legal and financial realms.</p><h3>Babies don't learn how to speak through imitation, but must instead master the abstract structures of language.</h3><p>While imitation helps infants learn basic words, it's insufficient for acquiring complex grammar. Language contains too many exceptions and quirks to memorize individually. <blockquote>Babies have to learn the rules behind grammatical constructions.</blockquote> For example, you can say &quot;I poured wine into the glass&quot; but not &quot;I filled wine into the glass.&quot; The latter construction only works with verbs that change the state of the container, like &quot;fill.&quot; All languages have such hidden intricacies. Babies must deduce the underlying logic rather than just parroting phrases.</p><h3>Some people believe that words are elemental and innate, but a closer look shows that they are complex and learned.</h3><p>Extreme nativists like philosopher Jerry Fodor argue that words are indivisible concepts that can't be defined in simpler terms. By this logic, &quot;to kill&quot; can't mean &quot;cause to become not alive&quot; because you can cause future death in the present. But a closer look reveals that most words are built from more fundamental ideas. <blockquote>More elemental concepts are essential in explaining and distinguishing similar words.</blockquote> &quot;Hit,&quot; &quot;cut,&quot; &quot;break&quot; and &quot;touch&quot; all involve motion, contact and effect in different ways. &quot;Hit&quot; requires motion, while &quot;break&quot; implies a result without movement. Words are complex structures combining basic mental building blocks, not irreducible innate units.</p><h3>Simple linguistic devices can be used to many ends, creating ambiguity and getting people into trouble.</h3><p>Even the seemingly straightforward present tense has multiple functions that can lead to confusion. It can describe an action happening now (&quot;He shoots, he scores!&quot;) or a general tendency (&quot;Shawn runs every day&quot;). <blockquote>While playing with words can be fun, it can also get you into trouble.</blockquote> During the Lewinsky scandal, Bill Clinton's lawyer stated &quot;there is no sex of any kind&quot; between the president and intern in the present tense. When past affairs came to light, Clinton argued the statement was still technically true when uttered. This linguistic loophole did little to repair his reputation. Subtle grammatical choices can have far-reaching consequences.</p><h3>A clever use of language can produce inconsistencies in human behavior.</h3><p>Framing an issue through word choice can dramatically sway opinions. The 2003 US attack on Iraq was alternately an &quot;invasion&quot; or &quot;liberation&quot; depending on the speaker's view. Experiments show people make illogical choices based on linguistic presentation. <blockquote>Subtle changes in language can have profound effects.</blockquote> In a famous study, doctors picked a riskier treatment option when potential losses were emphasized over equivalent gains. They avoided the &quot;loss&quot; of 400 deaths but not the mathematically identical missed chance to save 200 lives. Human behavior is easily manipulated by strategic phrasing.</p><h3>Names tend to carry a lot of meaning about a person, but they actually point to something much more basic.</h3><p>We imbue names with immense biographical significance, as if a famous figure's accomplishments define who they are. The name &quot;Paul McCartney&quot; conjures a particular British musician born in 1942 who played in The Beatles and wrote iconic songs with John Lennon. <blockquote>When broken down, proper nouns point to something much more core to humans than their accomplishments.</blockquote> If a conspiracy theory claimed McCartney died in 1966 and was replaced by a lookalike, we'd still consider the pre-1966 man the &quot;real&quot; McCartney, even stripped of his musical legacy. Names refer to a person's basic existence, not their accolades or traits.</p><h3>Words are dynamic, which means their social acceptability varies over time.</h3><p>Words can gain and lose taboo status across eras. Once-clinical terms like &quot;cunt&quot; now sound vulgar, while former profanities like &quot;pissabed&quot; and &quot;windfucker&quot; evolved into innocent words for plants and birds. When &quot;Pygmalion&quot; premiered in 1913, Eliza Doolittle saying &quot;not bloody likely&quot; scandalized theatergoers. Modern audiences find it quaint. <blockquote>Words can both lose their taboo and acquire it over time.</blockquote> The &quot;bloody&quot; line had to be replaced by &quot;move your bloomin' arse&quot; in the 1956 musical remake to maintain its provocative punch. Even seemingly innocuous words like &quot;sucker,&quot; &quot;jerk,&quot; and &quot;scumbag&quot; have X-rated roots that would shock some parents who scold kids for using &quot;suck&quot; and &quot;blow.&quot; Linguistic propriety is ever-shifting.</p><h3>Politeness is about speaking indirectly and the effects of such speech change as they become common.</h3><p>Polite requests use wordiness and apology to soften demands and provide an &quot;out.&quot; Rather than directly asking someone to pass the salt, we might say, &quot;If you would pass me the salt, that would be fantastic.&quot; <blockquote>Politeness is a great way to state the obvious and superfluous.</blockquote> The requester clearly lacks salt and noting its presence at the other end of the table violates conversational maxims. But couching the request as a hypothetical compliment leaves room for refusal. However, stock &quot;polite&quot; phrases like &quot;Can you hand me the salt?&quot; have lost their indirectness through overuse. To sound truly courteous, requests must seem novel and oblique, like remarking &quot;These potatoes are bland, aren't they?&quot; Linguistic politeness is an ever-evolving arms race.</p>",
      category: "Writing"
    },
    {
      title: "The Elements of Style",
      author: "William Strunk Jr. and E.B. White",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "",
      category: "Writing"
    },
    {
      title: "Bird by Bird",
      author: "Anne Lamott",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "",
      category: "Writing"
    },
    {
      title: "Mastery",
      author: "Robert Greene",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "",
      category: "Productivity"
    },
    {
      title: "Triggers",
      author: "Marshall Goldsmith",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "",
      category: "Productivity"
    },
    {
      title: "The Little Book of Change",
      author: "William Bridges",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "",
      category: "Productivity"
    },


  ];
  
  function renderNotes(notes, isMovingRight) {
    const notesSection = document.getElementById("notes");
    notesSection.innerHTML = ""; // Clear existing notes
  
    notes.forEach(note => {
      const noteElement = document.createElement("div");
      noteElement.classList.add("note-item");
      noteElement.innerHTML = `
        <div class="note-content">
          <h3>${note.title}</h3>
          <p>${note.author}</p>
        </div>
        <div class="note-image">
          <img src="${note.image}" alt="Icon">
        </div>
      `;
      noteElement.addEventListener("click", () => showNotePopup(note));
      notesSection.appendChild(noteElement);
    });
  }
  
  let currentShadingElement = null;
let menuContainer = document.querySelector(".menu-wrapper");

function updateShadingPosition() {
  if (currentShadingElement) {
    const activeLink = document.querySelector(".menu a.active");
    const activeLinkRect = activeLink.getBoundingClientRect();
    const menuContainerRect = menuContainer.getBoundingClientRect();
    const scrollLeft = menuContainer.scrollLeft;
    const containerWidth = menuContainerRect.width;
    const linkLeft = activeLinkRect.left - menuContainerRect.left;
    const linkWidth = activeLinkRect.width;

    // Calculate the new left position of the shading element
    let newLeft = linkLeft - scrollLeft;

    // Ensure the shading element stays within the menu container
    if (newLeft < 0) {
      newLeft = 0;
    } else if (newLeft + linkWidth > containerWidth) {
      newLeft = containerWidth - linkWidth;

    }

    currentShadingElement.style.left = `${newLeft}px`;
  }
}

// Define the desired order of categories
const categoryOrder = [
  "all",
  "Writing",
  "Productivity",
  "Personal Finance",
  "Fitness",
  "Nutrition",
  "Psychology",
  "Philosophy",
  "Emerging Technologies",
  "Investing",
  "History",
  "Biography",
  "Leadership",
  "Physics",
  "Self-Help",
  "Management",
  "Marketing",
  "Design",
  "Entreprenuership",
  "Artificial Intelligence"
];

function filterNotesByCategory(category) {
  const currentCategory = document.querySelector(".menu a.active");
  const currentNotes = document.querySelectorAll(".note-item");
  const filteredNotes = category === "all"
    ? notesData
    : notesData.filter(note => note.category === category);

  const selectedLink = document.querySelector(`.menu a[data-category="${category}"]`);
  const currentCategoryIndex = categoryOrder.indexOf(currentCategory.getAttribute("data-category"));
  const selectedCategoryIndex = categoryOrder.indexOf(category);
  const isMovingRight = selectedCategoryIndex > currentCategoryIndex;

  const notesContainer = document.getElementById("notes");
  const notesContainerRect = notesContainer.getBoundingClientRect();
  const screenWidth = window.innerWidth;

  gsap.to(currentNotes, {
    duration: 0.5,
    x: isMovingRight ? -screenWidth : screenWidth,
    onComplete: () => {
      renderNotes(filteredNotes, isMovingRight);
      gsap.fromTo(".note-item", {
        x: isMovingRight ? screenWidth : -screenWidth
      }, {
        duration: 0.5,
        x: 0,
        ease: "power2.out",
        stagger: {
          each: 0,
          from: isMovingRight ? "right" : "left"
        }
      });
    }
  });

  // Remove active class from all category links
  const categoryLinks = document.querySelectorAll(".menu a");
  categoryLinks.forEach(link => link.classList.remove("active"));

  // Add active class to the selected category link
  selectedLink.classList.add("active");

  // Animate the shading effect
  const activeLink = document.querySelector(".menu a.active");
  const activeLinkRect = activeLink.getBoundingClientRect();
  const menuContainerRect = menuContainer.getBoundingClientRect();

  if (!currentShadingElement) {
    // Create a new shading element if it doesn't exist
    currentShadingElement = document.createElement("div");
    currentShadingElement.classList.add("shading");
    currentShadingElement.style.position = "absolute";
    currentShadingElement.style.backgroundColor = "rgba(36, 36, 36, 0.1)";
    currentShadingElement.style.borderRadius = "12px";
    currentShadingElement.style.transition = "all 0.3s ease";
    currentShadingElement.style.pointerEvents = "none";
    menuContainer.appendChild(currentShadingElement);
  }

  // Set the position and dimensions of the shading element
  currentShadingElement.style.top = `${activeLinkRect.top - menuContainerRect.top}px`;
  currentShadingElement.style.width = `${activeLinkRect.width}px`;
  currentShadingElement.style.height = `${activeLinkRect.height}px`;

  // Update the shading position immediately
  updateShadingPosition();
}
  
  const categoryLinks = document.querySelectorAll(".menu a");
  categoryLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const category = event.target.getAttribute("data-category");
      filterNotesByCategory(category);
    });
  });

  
// Update shading position when the menu container is scrolled
menuContainer.addEventListener("scroll", updateShadingPosition);
  
  // Popup animation
  const notePop = gsap.timeline({ paused: true });
  
  notePop.to(".note-popup", {
    duration: 0.8,
    opacity: 1,
    y: 0,
    scale: 1,
    ease: Power4.easeOut
  });
  
  notePop.from(".popup-content h2, .popup-content p, .popup-image", {
    duration: 0.5,
    opacity: 0,
    y: 15,
    stagger: {
      amount: 0.4
    }
  }, "-=.3");
  
  function showNotePopup(note) {
    const popupContent = document.querySelector('.popup-content');
    popupContent.querySelector('h1').textContent = note.title;
    popupContent.querySelector('h2').textContent = note.author;
  
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = note.content;
  
    const existingContent = popupContent.querySelector('.popup-text');
    if (existingContent) {
      popupContent.removeChild(existingContent);
    }
  
    contentDiv.classList.add('popup-text');
    popupContent.appendChild(contentDiv);
  
    const popup = document.querySelector('.note-popup');
    popup.addEventListener('wheel', handlePopupScroll);
  
    document.body.style.overflow = 'hidden'; // Prevent page scrolling
  
    notePop.play();
  }
  
  function closeNotePopup(closeButton) {
    const popup = closeButton.closest('.note-popup');
    popup.removeEventListener('wheel', handlePopupScroll);
    
    notePop.reverse();


      //reset page scrolling 
    document.body.style.overflow = 'auto';

    
  }

  

  let isAtTop = false;
let isDeliberateScroll = false;
let scrollTimer = null;
const deliberateScrollDelay = 500; // Adjust this value as needed
const scrollThreshold = 20; // Adjust this value as needed

function handlePopupScroll(event) {
  const popup = event.currentTarget;
  const popupContent = popup.querySelector('.popup-content');
  const scrollTop = popupContent.scrollTop;

  if (scrollTop === 0) {
    isAtTop = true;
  } else {
    isAtTop = false;
    isDeliberateScroll = false;
  }

  if (isAtTop && event.deltaY < -scrollThreshold) {
    if (!isDeliberateScroll) {
      isDeliberateScroll = true;
      scrollTimer = setTimeout(() => {
        isDeliberateScroll = false;
      }, deliberateScrollDelay);
    } else {
      clearTimeout(scrollTimer);
      closeNotePopup(popup.querySelector('.popup-close'));
    }
  }
}
  
// Select the "all" category by default when the page loads
document.addEventListener("DOMContentLoaded", function() {
  const allCategoryLink = document.querySelector('.menu a[data-category="all"]');
  allCategoryLink.classList.add("active");
  filterNotesByCategory("all");
});
  renderNotes(notesData);