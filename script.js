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

gsap.fromTo('.notes--intro h1', {
  opacity: 0,
  y: 150,
  skewX: 30
}, {
  opacity: 1,
  y: 0,
  skewX: 0,
  duration: 1,
  delay: .25,
  scrollTrigger: '.notes--intro h1'
});

gsap.fromTo('.skill h2', {
  opacity: 0,
  y: 150,
  skewX: 30
}, {
  opacity: 1,
  y: 0,
  skewX: 0,
  duration: 1,
  delay: .25,
  scrollTrigger: '.skill h2'
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
      image: {
        light: "img/ahabits.svg",
        dark: "img/ahabits-dark.svg"
      },
      desc: "Book Summary",
      content: "<h3> The Power of Tiny Changes </h3> <p> At its core, Atomic Habits is about the power of tiny, incremental changes. The central argument is that real, lasting change comes not from focusing on massive, sweeping transformations, but from zeroing in on the small, day-to-day habits and systems that shape our lives.<br><br> Clear makes a compelling case that we've been approaching behavior change all wrong. Most people fixate on outcomes and results - losing 20 pounds, writing a best-selling book, winning a championship. But this focus on goals is misplaced.</p> <p> It is the daily habits and processes that determine success or failure, not the end goal. Your daily routine represents your identity. Small habits are a bit like compound interest. The initial effect is small, but as it is repeated again and again the result is massive. This is detrimental for both good and bad habits. We don’t see the long-term rewards of our good habits immediately, so we get demotivated and stop. Conversely, we don’t see the long-term consequences of our bad habits immediately, so we continue them. Hence, it is important to focus on our current trajectory rather than current results. Changing your life is not about making revolutionary changes to everything you do. It’s about building a consistent system of habits that deliver remarkable results. </p> <div class='video-container'> <video src='img/ahabits1.mp4' playsinline  muted'> </video> </div> <h3> The Habit Loop </h3> <p> The key to understanding habits is the four-step feedback loop that underlies all behavior: cue, craving, response, reward. Some cue or trigger (like a notification on your phone) leads to a craving or desire (wanting to see the message), which motivates a response (checking the phone), which provides a reward (temporarily alleviating boredom or FOMO). Understanding this loop is essential to building good habits and breaking bad ones. </p> <div class='video-container'> <video src='img/ahabits2.mp4' playsinline  muted'> </video> </div> <h3> Identity-Based Habits </h3> <p> But where do you start when trying to change habits? Clear outlines three levels of behavior change: outcomes (changing results), processes (changing habits and systems), and identity (changing beliefs, worldview, judgments about yourself and others). Most people start with outcomes, but the most effective approach is to begin with identity. Figure out the type of person you want to be, then prove it to yourself with small wins. </p><p>Use the Habits Scorecard to become aware of your current habits. </p> <div class='video-container'> <video src='img/ahabits3.mp4' playsinline  muted'> </video> </div> <h3> The Four Laws of Behavior Change </h3> <p> The book then lays out the &quot;Four Laws of Behavior Change,&quot; a simple set of rules for creating good habits and breaking bad ones. Each law comes with specific strategies you can implement: </p> <h4>Make it obvious</h4> <p>This relates to the cue, you must make it obvious if you want the habit to take place. Inversely, remove the cue if you want the habit to stop. If you want to make running at 6pm a habit, place running shoes in a visually obvious spot where you usually are at 6pm. If you want to stop drinking sugary drinks, place them at the back of the fridge where they are harder to see and reach. Keep in mind that all habits require external triggers at first, usually things that you see or hear. However, repeated reinforcement of the habit may make it such that you develop an internal trigger. For example, Instagram usage starts off needing an external trigger, usually the sight of an app on the home screen or the ding of a notification. However, you later start associating Instagram with eliminating boredom. So whenever you feel bored, you’ll open Instagram. As a business, you want to find ways to develop internal triggers associated with your product. They’re a lot cheaper and more effective than external triggers.<br><br> Use habit stacking to tie a new habit to an existing one. Use implementation intentions (&quot;I will [BEHAVIOR] at [TIME] in [LOCATION]&quot;) to give your habits a time and place. For example, you can plan to do 10 pushups at your desk at 10am. The location and time both serve as cues for the habit.</p> <div class='video-container'> <video src='img/ahabits4.mp4' playsinline  muted'> </video> </div> <h4>Make it attractive</h4> <p>The mere thought of a reward often releases more dopamine than the reward itself. The more dopamine, the more motivated you are to provide a response. It's the anticipation of a reward - not the fulfillment of it - that gets us to take action. Use temptation bundling to make habits more appealing by linking them to something you enjoy. Ensure that the link doesn’t take anything away from the efficacy of the habit. If you dislike running but like listening to podcasts, try listening to podcasts while running. Listening doesn’t subtract from the fitness benefits of running. Join a culture or group where your desired behavior is the normal behavior. And create a motivational ritual by doing something you enjoy immediately before a difficult habit.</p> <div class='video-container'> <video src='img/ahabits5.mp4' playsinline  muted'> </video> </div> <h4>Make it easy</h4> <p>Repetition is key. You must make the response portion as frictionless as possible so that you can get as many reps in as you can on a consistent basic. Reduce friction by decreasing the number of steps between you and your good habits. If you want to make something a daily habit, never miss more than a day in a row. Don't worry too much about quality; instead, concentrate on being consistent and showing up every day. For bad habits, try to make the action as unpleasant as possible. If you want to write daily reflections, create a template with questions that you can fill in. If you want to stop spending time on social media, log out of your accounts and only commit to using them on your laptop.<br><br> Momentum is an amazing thing. The hardest part is usually the start. So, commit yourself to miniaturised versions of habits first. You’ll usually find that once you’re in the zone, it becomes hard to stop. If you want to read for one hour a day, commit to reading for 5 minutes at least. After 5 minutes, assess how you feel. Usually, your momentum would make you continue anyway.<br><br> Prime your environment to make future actions easier. Master the decisive moment - optimise the small choices that deliver outsized impact. And automate your habits wherever possible.</p> <div class='video-container'> <video src='img/ahabits6.mp4' playsinline  muted'> </video> </div> <h4>Make it (immediately) satisfying</h4> <p>Immediate rewards reinforce habits, immediate punishments deter them. Habits are unaffected by long term consequences. We want to see noticeable rewards after every iteration of a habit, no matter how small the reward is. That’s why losing weight is so hard. We work out for a day, but when we step on the scale at the end, we weigh the same. We can’t measure the rewards of our effort, even though we know the effort was worthwhile. Most good habits feel bad at first, but have good long term effects. Inverse for bad habits.<br><br> If you aim to shed some weight, treat yourself to something enjoyable after each workout session. Just make sure this reward aligns with your goals and values. For instance, indulging in a cheeseburger wouldn't be the best choice. Additionally, consider adding a consequence for skipping a workout. Studies show that people are more averse to losing than they are driven by winning. Give yourself an immediate reward when you complete your habit. When avoiding a bad habit, design a way to see the benefits. Use a habit tracker to keep your streak going and &quot;don't break the chain.&quot; Try to get back on track immediately when you slip up.</p> <div class='video-container'> <video src='img/ahabits7.mp4' playsinline  muted'> </video> </div> <h3> The Power of Repetition </h3> <p> Another key insight is the power of repetition. Habits form based on frequency, not time. It doesn't matter how long your habit streak is; what matters is the number of times you've performed the behavior. That's why the best way to form a habit is to start with repetition, not perfection. Every night, review your day to see if you’ve done all your habits. Experiment with it, see how you can be more consistent. The mere act of ticking off items from a list is satisfying, so make this habit tracking a habit in itself </p> <h3> Habits are Sticky </h3> <p> Of course, the flip side of this is that once a habit becomes automatic, it can be hard to shake. Clear warns that habits are sticky - they persist even when we know they're not serving us. The key is to update them with small wins, one at a time. And to maintain good habits for the long haul, it's crucial to find a balance between the thrill of novelty and the comfort of familiarity. We need to keep habits interesting by following the Goldilocks Rule and seeking challenges of &quot;just manageable difficulty&quot;. </p> <h3> A Powerful Guide to Behavior Change </h3> <p> Throughout the book, the importance of environment is emphasised. Habits are easier to build when they fit into the flow of your life, and you're far more likely to maintain good habits in a conducive environment. The inverse is also true - bad habits can often be eliminated simply by removing the cues that trigger them. Design your environment to optimise the habits that you want to do. Leave the cues to good habits in plain sight and easy to reach, while burying the cues to bad habits deep somewhere. Try to have a specific spot for a habit. For example, if you want to read, make sure to do it on the couch. You begin to associate the couch with reading, so you’ll be less likely to do anything else. And if you want to get serious work done, never do the work in the same place where you sleep. You get conflicted. Give everything a space. <br><br>In the end, Atomic Habits is a powerful guide to behavior change. It takes complex psychological theories and distills them down to a simple set of rules that anyone can apply to build good habits and break bad ones. Armed with these insights, we can design our habits and our environment to deliver. </p> <div class='video-container'> <video src='img/ahabits8.mp4' playsinline  muted'> </video> </div>",
      category: "Productivity"
    },
    
    {
      title: "The 4-Hour Workweek",
      author: "Tim Ferriss",
      image: {
        light: "img/4hww.svg",
        dark: "img/4hww-dark.svg"
      },
      desc: "Book Summary",
      content: "<h3>For the New Rich, wealth means luxury in the here and now.</h3> <p>The main goal is to become a member of the &quot;New Rich&quot; - a subculture characterised by mobility and financial freedom. They've realised that the right moment to truly live your life is now, not in some distant retirement. You need to focus on what truly matters and take action accordingly.<br><br>If you can't define a concept or act upon it, it's best to let it go and direct your energy elsewhere. Don't fall into the trap of being a &quot;deferrer&quot; - someone who continually puts off their dreams and aspirations until it's too late. Embrace the present moment and make the most of every opportunity.<br><br>When it comes to work, aim to be your own boss rather than an employee. Better yet, strive to be an owner who has others working for you. This allows you to dictate your own schedule and work on your own terms. Instead of chasing after a distant payday or a one-time windfall, prioritise consistent cashflow and ensure that you're generating income every single day.<br><br> Remember, relative income is more important than total income. Someone earning $100,000 per year while working just 10 hours per week is better off than someone earning the same amount but putting in 50 hours per week. Always consider your hourly rate, not just your overall earnings.<br><br>Surprisingly, doing the unrealistic is often easier than doing the realistic. When you set an extraordinarily large goal, it infuses you with the adrenaline and motivation needed to overcome inevitable obstacles. Realistic goals, on the other hand, tend to be uninspiring and less likely to drive you forward. So, don't be afraid to dream big and aim high.<br><br>If you're feeling insecure or doubtful, remember that everyone else is likely feeling the same way. The key is to push through those feelings and take action anyway. Start by asking yourself, &quot;What would excite me&quot; and use that as a guidepost for setting your goals. After all, the opposite of happiness isn't sadness - it's boredom. Chasing excitement and embracing challenges is a far more practical path to fulfilment.<br><br>When setting your sights on a big goal, ask yourself, &quot;What if there was no way I could fail? What if I were 10 times smarter than everyone else?&quot; These questions help to remove limiting beliefs and unleash your full potential.<br><br> Finally, focus on converting your skills and knowledge into tangible actions. If you're a great cook, challenge yourself to prepare an entire Christmas dinner without any help. If you're fluent in Chinese, strike up a 5-minute conversation with a Chinese co-worker. By putting your abilities into practice, you'll build confidence and make meaningful progress towards your goals.</p> <h3>Redefine wealth and happiness.</h3> <p>The DEAL formula for achieving the New Rich lifestyle starts with Definition. Imagine having $100 million at your disposal. What would you do with it? The key is to focus on doing what excites you, not just buying things. It's about being who you want to be and having the freedom to choose your path. Aim to be the owner, not just the boss or employee, and prioritise immediate cash flow over a distant payday.<br><br> To maximise the value of your money, seek to control the four W's in your life:</p> <ul> <li>What you do</li> <li>When you do it</li> <li>Where you do it</li> <li>Who you do it with</li> </ul> <p>This &quot;freedom multiplier&quot; is more powerful than raw income. Remember, options and the ability to choose are the real sources of power.<br><br>If you find yourself stuck in a rut or facing subpar results, consider doing the opposite of what everyone else is doing. Challenge the status quo and think outside the box. Don't put off your dreams until retirement; instead, distribute &quot;mini-retirements&quot; throughout your life. Embrace discomfort and take action, even if conditions aren't perfect.<br><br>Focus on leveraging your strengths rather than fixing your weaknesses, and be wary of having too much idle time. Don't use a lack of money as an excuse to postpone living the life you want. Measure your income in terms of dollars per hour, and aim for a high rate.<br><br>When setting goals, be unrealistic. Competition is fiercest for &quot;realistic&quot; targets, so aim high and harness the adrenaline rush that comes with pursuing something extraordinary. Chase excitement, not just happiness, and let that be your guiding force.<br><br> Use the concept of &quot;dreamlining&quot; to turn your ambiguous wants into defined steps. Focus on the activities that will fill the void when work is removed, and identify the four dreams that would change everything for you in the next 6-12 months. Calculate the cost and set your target monthly income accordingly.<br><br>Avoid long-term planning and far-off goals, as they can become excuses for postponing action. Instead, set 3-6 month dreamlines and take immediate steps towards achieving them. Seek out people who have already done what you want to do and learn from their experiences.<br><br>Remember, the most important actions are often uncomfortable. Be assertive, propose solutions, and develop the habit of making decisions for yourself and others. By following these principles and embracing the freedom to choose your own path, you'll be well on your way to living an extraordinary, fulfilling life.</p><div class='video-container'> <video src='img/4hww3.mp4' playsinline  muted'> </video> </div> <h3>Save time by applying the 80/20 principle and eliminating time wasters.</h3> <p>The E in DEAL stands for Elimination. The Pareto Principle states that 80% of consequences come from 20% of causes. What this means is that the majority of your outcomes, both positive and negative, are driven by a small portion of your efforts. Hence, start identifying which 20% of activities result in 80% of your problems/unhappiness. Inversely, identify which 20% of activities result in 80% of your successes/happiness. The aim is to double down on your strengths while getting rid of inefficiencies and time-wasters.<br><br>Note that being busy is not equivalent to being productive. Conversely, feeling overwhelmed is a form of laziness - lazy thinking combined with indiscriminate action. You need to be ruthlessly selective and focus only on matters to you. A lack of time usually results from lack of priorities.<br><br>Counter-intuitively, tighter deadlines often lead to higher quality work, as they eliminate room for overthinking and unnecessary complexities.<br><br>To maximise productivity, combine the 80/20 Principle with Parkinson's Law:</p> <ul> <li>Identify the small number of activities that generate the majority of your results.</li> <li>Schedule them with clear, ambitious timeframes.</li> </ul> <p>Parkinson’s Law is another important concept. It states that work expands to fill the time allotted. You should set short, sometimes unrealistic deadlines for your most important tasks. It guarantees that you strip down tasks to the essentials and execute with intensity. Define a concise daily to-do list with one or two mission-critical items. Then, create a &quot;not-to-do&quot; list to avoid filling your time with unproductive busywork. If you had to cut your working hours dramatically, what would you focus on? Let that clarity guide your priorities. Approach each critical task separately, from start to finish, with full concentration.<br><br>By internalising these principles and putting them into practice consistently, you can achieve more by doing less. Leverage the power of the vital few to get the results you want while reclaiming your time and energy. Work smarter, not harder.</p><div class='video-container'> <video src='img/4hww1.mp4' playsinline  muted'> </video> </div> <h3>Regular office employees can also live the New Rich lifestyle.</h3> <p>Employees must liberate themselves from the office to achieve a 4-hour workweek, so the DEAL formula becomes DELA.</p> <ul> <li>Increase your employer's investment in you by asking for company-funded training. The more they invest, the greater the loss if you quit.</li> <li>Prove increased output when working remotely. Call in sick for two days but work from home, doubling your productivity to show how well you perform outside the office.</li> <li>Prepare a list of quantifiable business benefits that demonstrate your increased achievement when working remotely.</li> <li>Propose a remote working trial period, starting with one day per week.</li> <li>Gradually increase your remote working time by ensuring your most productive days are those spent working remotely. Set a meeting with your employer to discuss the results.</li> </ul> <p>However, some jobs simply aren't worth salvaging, no matter how much time you've invested. Fear frequently keeps people from making the leap; these four issues are addressed:</p> <ul> <li>Quitting is permanent: False. You can always pick up your career path with a different company later.</li> <li>You won't be able to pay the bills: If you can secure a new income stream before quitting, great. If not, temporarily eliminate most expenses and live off savings for a short while.</li> <li>Health insurance and retirement funds will cease: False. Research and transfer your benefits to another company.</li> <li>It will ruin your resume: False. Get creative with your CV. Quitting to do something interesting can make you more attractive to future employers.</li> </ul> <p>Instead of saving all your retirement time for the end of your life, take several mini-retirements, relocating to another place for six months at a time. This allows you to re-examine your life and unplug from the materialism and comparative mindset of a speed- and size-obsessed culture. To finance your mini-retirements, get creative. Living abroad may even save you money compared to your current expenses. Use this opportunity to declutter your life, keeping only the 20% of belongings you use 80% of the time. Upon arriving at your mini-retirement, you may feel a void where work once distracted you. To combat this, find a focus or goal. If existential questions persist, ask yourself:</p> <ul> <li>Have you given each term a specific definition and meaning?</li> <li>Will the answer improve your life?</li> <li>If you can neither define it nor act upon it, forget about it.</li> </ul> <p>In order to have a fulfilling life and feel good about yourself, you should be aware of two essential elements of the New Rich: ongoing learning and service. Learn a language to hone clear thinking and immerse yourself in the culture. Find an area of service that appeals to you and do your part to improve life beyond your own.<br><br>To prepare for your mini-retirement, try:</p> <ul> <li>Revisiting ground zero: Do nothing and face your inner demons, possibly at a silence retreat.</li> <li>Anonymously donating to a service organization to find ideas for how you'd like to contribute.</li> <li>Combining a learning mini-retirement with local volunteering, noting any negative self-talk in a journal.</li> <li>Revisiting and resetting your dream lines, as your mini-retirement may have provided new perspective.</li> <li>Considering a new part- or full-time vocation—a true calling or dream occupation—based on the results of the previous steps.</li> </ul> <p>By following these steps and demonstrating the value of remote work to your employer, you too can liberate yourself from the office and embrace the freedom to work from wherever you choose. Remember, the key is to increase your value, prove your productivity, and make a compelling case for the benefits of this arrangement. With persistence and strategic planning, you'll be well on your way to geographic independence and greater control over your work life.</p><div class='video-container'> <video src='img/4hww2.mp4' playsinline  muted'> </video> </div> <h3>Build a business that functions on autopilot without any work on your part.</h3> <p>Automation, the A in DEAL, is key to detaching time spent working from money earned. The goal is to establish automated sources of income that can be maintained from anywhere in the world. Your business should basically run itself while you read reports and interject only when needed. Hire virtual assistants to handle responsibilities, it marks the moment you transition from being commanded to being the commander. It's a litmus test for your entrepreneurial skills, asking the question: Can you effectively manage other people?<br><br>Using a virtual assistant (VA) is a low-risk exercise that covers the basics of management in a 2-4 week trial period, costing just $100-$400. This is an investment in building a system to replace yourself, not an expense.<br><br>Preparing someone to take over your tasks will help you refine your processes, eliminating redundancies and streamlining your schedule. While you may be able to do certain things better than an assistant, the goal is to free up your time to focus on bigger and better things.<br><br>Remote management and communication are critical skills to master. Remember, it's not just about working smarter; it's about building a system to replace yourself. Before delegating tasks, eliminate what you can and automate or streamline the rest. Don't waste anyone's time, including your VA's.<br><br>Each delegated task should be time-consuming and well-defined. The biggest challenge is often the language barrier, which can quadruple the back-and-forth discussion and increase costs. Test a few assistants to sharpen your communication skills and determine who is worth hiring. Focus on per-task cost rather than per-hour cost to gauge the ultimate expense.<br><br>Use a VA firm instead of a solo operator for redundancy and the ability to switch assistants if needed. Never allow small-operation VAs to subcontract work without your written permission. Take precautions when giving VAs access to websites or financial information.<br><br>Be precise in your instructions, using simple language suitable for a 2nd-grade reading level. Ask foreign VAs to rephrase tasks to confirm understanding, and request status updates to ensure the task is understood and achievable. Assign tasks with a 24-72 hour completion timeline, and prioritise their importance.<br><br>Consider reputable VA firms like BrickWork or GetFriday. For higher-level support, an online business manager can help 6-figure-income clients achieve 7-figures through business model redesigns.<br><br>Identify your top 5 time-consuming non-work tasks and 5 personal tasks you could assign for fun. Examine your pain points and longest-standing to-do list items. Ask yourself, &quot;Could a VA do this?&quot; each time you're interrupted or change tasks.<br><br>Don't lose sight of your dreams by falling into work for work's sake. Avoid handling problems your outsourcers or co-workers can handle, and give them if-then rules for solving issues independently. Perform regular 80/20 analyses for your business and personal life. Strive for a process-driven, not founder-driven, business. Limit contact with managers to force the development of operational rules that enable others to solve problems without your constant input. Use detailed reports from outsourcers to ensure things are running smoothly, and only step in when necessary. Remember, being bound to one place will be the new defining feature of the middle class. Aim for unrestricted mobility and the freedom to work wherever and whenever you want, as long as the work gets done.<br><br> Take an asset and cash-flow snapshot to identify what you can eliminate that creates stress or distraction without adding significant value. Focus on the 20% of your belongings that you use 80% of the time, and consider eliminating the rest to simplify your life and reduce maintenance costs and distractions. In the world of business, both employees and entrepreneurs should strive for a similar goal: maximising access to necessary information and independent decision-making ability. However, the approach to achieving this goal differs depending on your role. As an employee, your aim is to have full access to the information you need to do your job effectively and the autonomy to make decisions without constantly seeking approval from higher-ups. This empowers you to take ownership of your work and find creative solutions to problems.<br><br> For entrepreneurs, the objective is to grant as much information and independent decision-making ability to employees or contractors as possible. This may feel counterintuitive at first, but it's essential for building a self-sufficient team that can handle challenges without relying on you for every little thing. When delegating authority to your employees, set clear guidelines and expectations. Tell them, &quot;Keep the customer happy. If it's a problem that takes less than $100 to fix, use your judgment and fix it yourself. Fix these problems without contacting me. I am no longer your customer; my customers are your customer. Don't ask me for permission. Do what you think is right, and we'll make adjustments as we go along.&quot;<br><br>Trusting your team to make decisions independently can be challenging, but it's crucial for growth. People are often smarter and more capable than you give them credit for. Give them a chance to prove themselves, and you might be surprised at how well they rise to the occasion. When it comes to making decisions or granting requests, adopt the mindset of a two-year-old: say &quot;no&quot; to absolutely everything. Make &quot;no&quot; your default answer. This may sound harsh, but it's an effective way to filter out unnecessary distractions and maintain focus on your priorities. Don't feel compelled to make up lies or excuses; a simple &quot;no&quot; will suffice.<br><br>By implementing these strategies, you can create a work environment that fosters autonomy, trust, and problem-solving skills. As an employee, seek out opportunities to gain access to information and decision-making power. As an entrepreneur, empower your team to take ownership of their work and make decisions independently. Together, these approaches can lead to a more efficient, effective, and fulfilling workplace for everyone involved.</p> <h3>You need a muse for your automated income.</h3> <p>To create an automated income stream that generates cash without consuming your time, focus on filling existing demand rather than trying to create new demand. The key is to identify a target market, define your ideal customers, and then develop or find a product that meets their needs effectively.<br><br>When searching for profitable niches, start by listing all the social, industry, and professional groups you have been involved with or have a deep understanding of. Then, narrow down this list to groups that can be reached through one or two targeted channels. These can be niche magazines, online forums or social media platforms etc. This approach helps you identify unique opportunities with less competition.<br><br>As you brainstorm product ideas, ensure that the main benefit can be clearly explained in one sentence or phrase. Aim for a price point between $50-200, as this range tends to provide the best profit margins while minimising customer service issues. Your product should take less than four weeks to manufacture and be easily explained in a comprehensive online FAQ to reduce customer inquiries.<br><br>Consider three primary options for your product:</p> <ul> <li>Reselling: While this is the easiest approach, it is also the least profitable and leaves you vulnerable to price competition from other resellers. </li> <li>Licensing: You can either invent a product and let others handle production and distribution or manufacture and sell someone else's idea. This allows you to focus on your strengths while leveraging the capabilities of others. </li> <li>Creating: Information products, such as e-books, courses, and digital content, are low-cost to produce, quick to bring to market, and difficult for competitors to duplicate. </li> </ul> <p>If you choose to create an information product, you have three main options for content creation:</p> <ul> <li>Develop the content yourself by researching, paraphrasing, and combining information from multiple reputable sources. </li> <li>Repurpose content that is already in the public domain and not subject to copyright restrictions. </li> <li>License existing content or compensate subject matter experts to help you create original content. </li> </ul> <p>To validate the viability of your product idea, use micro-testing. Instead of simply asking potential customers if they would buy your product, ask them to actually make a purchase. You can test your ideas using pay-per-click (PPC) advertising campaigns in just five days for $500 or less. Start by creating a compelling offer that outshines the competition, presented on a simple 1-3 page website. Then, test your offer using targeted PPC ads. Cut your losses on underperforming products and invest in manufacturing and scaling the winners for a full sales rollout. <br><br>Once you have a product that consistently sells, design a self-correcting business architecture that can run without your constant involvement. You can build a scalable business in three phases: </p> <ul> <li>0-50 units shipped: Handle all aspects of the business yourself, using customer interactions to gather common questions and create a comprehensive online FAQ. </li> <li>Over 100 units shipped per week: Partner with local fulfilment companies to handle inventory storage, packing, and shipping. </li> <li>Over 200 units shipped per week: Work with end-to-end fulfilment houses that manage the entire process, from order processing to returns and refunds. </li> </ul> <p>To reduce service overhead by 20-80%, offer fewer options to your customers: </p> <ul> <li>Limit purchase options to one or two choices. </li> <li>Provide a single fast shipping method at a premium price, eliminating overnight, expedited, and international shipping. </li> <li>Direct customers to online ordering instead of accepting phone orders. </li> </ul> <p>Focus on attracting high-profit, low-maintenance customers by implementing the following strategies: </p> <ul> <li>Accept payments only through secure online methods, avoiding checks, money orders, and Western Union. </li> <li>Raise wholesale minimums and require a tax ID for resellers to discourage small, time-consuming orders. </li> <li>Direct resellers to a printable online order form that must be faxed, reducing casual inquiries. </li> <li>Offer low-priced products to capture contact information for follow-up sales, rather than providing free items. </li> <li>Provide a &quot;lose-win&quot; guarantee instead of free trials, where customers can receive a refund and keep the product if they are unsatisfied. </li> <li> Reject orders from countries known for high rates of mail fraud to minimise potential issues. </li> </ul> <p>Finally, to project a professional Fortune 500 image: </p> <ul> <li>Give yourself a mid-level title like Director of Sales or VP of Marketing instead of CEO. </li> <li>Display multiple email addresses and phone numbers on your website to give the impression of a larger organization. </li> <li>Set up an Interactive Voice Response (IVR) remote receptionist to handle incoming calls professionally. </li> </ul> <h3>Embrace a low-information diet by interrupting interruptions and eliminating time wasters</h3> <p>Accepting a low-information diet is one of the book's more widely applicable ideas. You must eliminate any time-consuming and pointless inputs that don't directly advance your objectives. For example, consider eliminating habits like watching the news or reading newspapers, which often focus on negative and unimportant information. Be extremely selective about how often you check emails and voicemails, and don't be afraid to disconnect completely when traveling or focusing on critical projects. Protect your time and attention by minimising interruptions. Be assertive and develop a reputation for being difficult when it counts. This will help you receive preferential treatment without constantly fighting for it. Define clear boundaries and limit access to your time by funnelling communication towards immediate action.<br><br>Emails and meetings are consistent time wasters in the workplace. Minimise email consumption and production by checking messages only once a day and using autoresponders to manage expectations. Screen and limit phone calls by providing one urgent contact number that you always answer and another for non-urgent matters that goes directly to voicemail. When someone does call, get straight to the point and ask how you can help, keeping the conversation focused and efficient. Learn to say no to meetings and discussions that lack clear objectives. If you must attend, set a definite end time and keep everyone on task. Respond to voicemails via email to train people to be concise, and write emails that preemptively answer questions to reduce back-and-forth. When someone wants to talk on the phone, ask them to define the agenda upfront, including the specific topics and questions to be addressed.<br><br>By implementing these strategies consistently, you'll be able to take back control of your time and focus on what truly matters. Embrace the low-information diet, master the art of refusal, and create an environment that supports your productivity and success.</p>",
      category: "Entrepreneurship"
    },
    
    


  ];
  
  

  function renderNotes(notes, isMovingRight) {
    const notesSection = document.getElementById("notes");
    notesSection.innerHTML = ""; // Clear existing notes
  
    const currentTheme = localStorage.getItem('theme');
  
    notes.forEach(note => {
      const noteElement = document.createElement("div");
      noteElement.classList.add("note-item");
      noteElement.innerHTML = `
        <div class="note-content">
          <h3>${note.title}</h3>
          <p>${note.author}</p>
        </div>
        <div class="note-image">
          <img src="${currentTheme === 'dark-mode' ? note.image.dark : note.image.light}" alt="Icon" height="50px" width="50px">
        </div>
      `;
      noteElement.addEventListener("click", () => showNotePopup(note));
      notesSection.appendChild(noteElement);
    });
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
  "Entrepreneurship",
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

  
}
  
  const categoryLinks = document.querySelectorAll(".menu a");
  categoryLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const category = event.target.getAttribute("data-category");
      filterNotesByCategory(category);
    });
  });

  

  
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
  
  const noteScrollPositions = {};

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
  
    // Reset the scroll position to the stored position or top
    if (noteScrollPositions[note.title]) {
      popupContent.scrollTop = noteScrollPositions[note.title];
    } else {
      popupContent.scrollTop = 0;
    }
  
    const videoElements = contentDiv.querySelectorAll('video');
    videoElements.forEach(videoElement => {
      const videoSrc = videoElement.src;
      const darkModeVideoSrc = videoSrc.replace('.mp4', '-dark.mp4');
      const lightModeVideoSrc = videoSrc.replace('-dark.mp4', '.mp4');
  
      const currentTheme = localStorage.getItem('theme');
      if (currentTheme === 'dark-mode') {
        videoElement.src = darkModeVideoSrc;
        console.log(videoElement.src);
      } else {
        videoElement.src = lightModeVideoSrc;
        console.log(videoElement.src);
      }
  
      const videoOptions = {
        root: popupContent,
        rootMargin: '0px',
        threshold: 0.5
      };
  
      const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            videoElement.play();
            observer.unobserve(entry.target);
          }
        });
      }, videoOptions);
  
      videoObserver.observe(videoElement);
    });
  
    const popup = document.querySelector('.note-popup');
    popup.addEventListener('wheel', handlePopupScroll);
  
    document.body.style.overflow = 'hidden'; // Prevent page scrolling
  
    notePop.play();
  }

function closeNotePopup(closeButton) {
  const popup = closeButton.closest('.note-popup');
  const popupContent = popup.querySelector('.popup-content');
  const noteTitle = popupContent.querySelector('h1').textContent;

  // Store the scroll position of the current note
  noteScrollPositions[noteTitle] = popupContent.scrollTop;

  popup.removeEventListener('wheel', handlePopupScroll);
  
  notePop.reverse();

  // Reset page scrolling 
  document.body.style.overflow = 'auto';
}

  

  let isAtTop = false;
let isScrolling = false;
const scrollSpeedThreshold = 170; // Adjust this value as needed
const maxPopupOffset = 50; // Adjust this value as needed

function handlePopupScroll(event) {
  const popup = event.currentTarget;
  const popupContent = popup.querySelector('.popup-content');
  const scrollTop = popupContent.scrollTop;

  if (scrollTop === 0) {
    isAtTop = true;
  } else {
    isAtTop = false;
  }

  const scrollSpeed = Math.abs(event.deltaY);

  if (isAtTop && event.deltaY < 0) {
    if (scrollSpeed >= scrollSpeedThreshold) {
      if (!isScrolling) {
        isScrolling = true;
        closeNotePopup(popup.querySelector('.popup-close'));
      }
    } else {
      if (!isScrolling) {
        isScrolling = true;
        const popupOffset = Math.min(scrollSpeed / 2, maxPopupOffset);
        gsap.to(popup, {
          duration: 0.3,
          y: `${popupOffset}%`,
          ease: Power2.easeInOut,
          onComplete: () => {
            gsap.to(popup, {
              duration: 0.3,
              y: 0,
              ease: Power2.easeInOut,
              onComplete: () => {
                isScrolling = false;
              }
            });
          }
        });
      }
    }
  }
}



document.addEventListener("DOMContentLoaded", function() {
  const toggleSwitch = document.querySelector('#mode-switch');
  const currentTheme = localStorage.getItem('theme');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  if (currentTheme) {
    document.body.classList.add(currentTheme);

    if (currentTheme === 'dark-mode') {
      toggleSwitch.checked = true;
      metaThemeColor.setAttribute('content', '#000000'); // Dark mode color
    }
  }

  toggleSwitch.addEventListener('change', function(e) {
    if (e.target.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark-mode');
      metaThemeColor.setAttribute('content', '#000000'); // Dark mode color
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light-mode');
      metaThemeColor.setAttribute('content', '#e7672e'); // Light mode color
    }
  });
});





  
// Select the "all" category by default when the page loads
document.addEventListener("DOMContentLoaded", function() {
  const allCategoryLink = document.querySelector('.menu a[data-category="all"]');
  allCategoryLink.classList.add("active");
  filterNotesByCategory("all");
});
  renderNotes(notesData);