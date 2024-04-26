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
    delay: .5 + index * .5,
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
    delay: .5,
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
    delay: .5,
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
    delay: .5,
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
    delay: .5,
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
    delay: .5,
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
    delay: .5,
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
    delay: .5,
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
    delay: .5,
    scrollTrigger: small
  });
});

gsap.utils.toArray('button').forEach(button => {
  gsap.fromTo(button, {
    opacity: 0,
  }, {
    opacity: 1,
    duration: 1,
    delay: 1,
    scrollTrigger: button
  });
});

gsap.from('.pyramid', {
  opacity: 0,
  scale: .5,
  duration: 1,
  delay: .5
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
  delay: .5,
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
    delay: 1,
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
    delay: 1,
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
  delay: .5,
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
  delay: .5,
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
      content: "",
      category: "Productivity"
    },
    {
      title: "On Writing Well",
      author: "William Zinsser",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "<h3>The Habit Loop Explained</h3><p>Habits form through a three-part loop: a cue triggers a routine, which is followed by a reward. This loop allows the brain to perform tasks efficiently by chunking sequences into automatic routines. Even with brain damage, habits can persist due to their formation in the basal ganglia, a deep brain structure responsible for habit formation and maintenance.</p><h3>The Power of Craving and Rewards</h3><p>Habits create powerful cravings for the associated rewards, making them incredibly difficult to break. Companies like Pepsodent have intentionally created rewarding sensations, such as the cool, tingling sensation of their toothpaste, to induce cravings in consumers. Positive cravings can also reinforce good habits; for instance, people who exercise habitually often crave the endorphin rush, sense of accomplishment, or post-workout treat.</p><h3>Strategies for Changing Habits</h3><p>To change a habit effectively, replace the routine with a new behavior while keeping the cue and reward intact. Belief in the possibility of change and focusing on keystone habits like willpower can help resist relapse during stressful events. Techniques like Alcoholics Anonymous' approach of substituting drinking routines with healthier alternatives have proven successful for many.</p><h3>Organizational Habits and Crises</h3><p>Organizations can develop ingrained habits that, left unchecked, can lead to dangerous consequences, as exemplified by the King's Cross station fire tragedy. However, crises can provide opportunities to reform organizational habits by instilling a sense of urgency and facilitating change.</p><h3>Habit-Based Marketing Strategies</h3><p>Companies leverage consumer habits through tactics like strategic product placement, targeted marketing, and creating familiar experiences. Their aim is to induce cravings and influence purchasing behavior. Retailers like Target have used data analysis to target specific consumer segments, such as expectant parents, with tailored marketing campaigns.</p><h3>Social Movements and the Power of Habits</h3><p>Societal movements like the Montgomery bus boycott are facilitated by strong social ties, peer pressure, and the formation of new, self-propelling habits. Habits can become powerful forces for change when combined with strong community bonds, social influence, and the adoption of new routines aligned with the movement's goals.</p> ",

      category: "Writing"
    },
    {
      title: "The Lean Startup",
      author: "Eric Ries",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "",
      category: "Entrepreneurship"
    },
    {
      title: "Deep Work",
      author: "Cal Newport",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "",
      category: "Productivity"
    },
    {
      title: "The Power of Habit",
      author: "Charles Duhigg",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "<h3>The Habit Loop Explained</h3><p>Habits form through a three-part loop: a cue triggers a routine, which is followed by a reward. This loop allows the brain to perform tasks efficiently by chunking sequences into automatic routines. Even with brain damage, habits can persist due to their formation in the basal ganglia, a deep brain structure responsible for habit formation and maintenance.</p><h3>The Power of Craving and Rewards</h3><p>Habits create powerful cravings for the associated rewards, making them incredibly difficult to break. Companies like Pepsodent have intentionally created rewarding sensations, such as the cool, tingling sensation of their toothpaste, to induce cravings in consumers. Positive cravings can also reinforce good habits; for instance, people who exercise habitually often crave the endorphin rush, sense of accomplishment, or post-workout treat.</p><h3>Strategies for Changing Habits</h3><p>To change a habit effectively, replace the routine with a new behavior while keeping the cue and reward intact. Belief in the possibility of change and focusing on keystone habits like willpower can help resist relapse during stressful events. Techniques like Alcoholics Anonymous' approach of substituting drinking routines with healthier alternatives have proven successful for many.</p><h3>Organizational Habits and Crises</h3><p>Organizations can develop ingrained habits that, left unchecked, can lead to dangerous consequences, as exemplified by the King's Cross station fire tragedy. However, crises can provide opportunities to reform organizational habits by instilling a sense of urgency and facilitating change.</p><h3>Habit-Based Marketing Strategies</h3><p>Companies leverage consumer habits through tactics like strategic product placement, targeted marketing, and creating familiar experiences. Their aim is to induce cravings and influence purchasing behavior. Retailers like Target have used data analysis to target specific consumer segments, such as expectant parents, with tailored marketing campaigns.</p><h3>Social Movements and the Power of Habits</h3><p>Societal movements like the Montgomery bus boycott are facilitated by strong social ties, peer pressure, and the formation of new, self-propelling habits. Habits can become powerful forces for change when combined with strong community bonds, social influence, and the adoption of new routines aligned with the movement's goals.</p><h3>The Habit Loop Explained</h3><p>Habits form through a three-part loop: a cue triggers a routine, which is followed by a reward. This loop allows the brain to perform tasks efficiently by chunking sequences into automatic routines. Even with brain damage, habits can persist due to their formation in the basal ganglia, a deep brain structure responsible for habit formation and maintenance.</p><h3>The Power of Craving and Rewards</h3><p>Habits create powerful cravings for the associated rewards, making them incredibly difficult to break. Companies like Pepsodent have intentionally created rewarding sensations, such as the cool, tingling sensation of their toothpaste, to induce cravings in consumers. Positive cravings can also reinforce good habits; for instance, people who exercise habitually often crave the endorphin rush, sense of accomplishment, or post-workout treat.</p><h3>Strategies for Changing Habits</h3><p>To change a habit effectively, replace the routine with a new behavior while keeping the cue and reward intact. Belief in the possibility of change and focusing on keystone habits like willpower can help resist relapse during stressful events. Techniques like Alcoholics Anonymous' approach of substituting drinking routines with healthier alternatives have proven successful for many.</p><h3>Organizational Habits and Crises</h3><p>Organizations can develop ingrained habits that, left unchecked, can lead to dangerous consequences, as exemplified by the King's Cross station fire tragedy. However, crises can provide opportunities to reform organizational habits by instilling a sense of urgency and facilitating change.</p><h3>Habit-Based Marketing Strategies</h3><p>Companies leverage consumer habits through tactics like strategic product placement, targeted marketing, and creating familiar experiences. Their aim is to induce cravings and influence purchasing behavior. Retailers like Target have used data analysis to target specific consumer segments, such as expectant parents, with tailored marketing campaigns.</p><h3>Social Movements and the Power of Habits</h3><p>Societal movements like the Montgomery bus boycott are facilitated by strong social ties, peer pressure, and the formation of new, self-propelling habits. Habits can become powerful forces for change when combined with strong community bonds, social influence, and the adoption of new routines aligned with the movement's goals.</p>",
      category: "Productivity"
    },
    {
      title: "The War of Art",
      author: "Steven Pressfield",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "",
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
      content: "",
      category: "Entrepreneurship"
    },
    {
      title: "The $100 Startup",
      author: "Chris Guillebeau",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "",
      category: "Entrepreneurship"
    },
    {
      title: "The E-Myth Revisited",
      author: "Michael E. Gerber",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "",
      category: "Entrepreneurship"
    },
    {
      title: "The Personal MBA",
      author: "Josh Kaufman",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "",
      category: "Entrepreneurship"
    },
    {
      title: "The 7 Habits of Highly Effective People",
      author: "Stephen R. Covey",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "",
      category: "Self-Help"
    },
    {
      title: "The Stuff of Thought",
      author: "Steven Pinker",
      image: "img/icons8-canva.svg",
      desc: "Book Summary",
      content: "",
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
  
  function renderNotes(notes) {
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

function filterNotesByCategory(category) {
  const filteredNotes = category === "all"
    ? notesData
    : notesData.filter(note => note.category === category);

  renderNotes(filteredNotes);

  // Remove active class from all category links
  const categoryLinks = document.querySelectorAll(".menu a");
  categoryLinks.forEach(link => link.classList.remove("active"));

  // Add active class to the selected category link
  const selectedLink = document.querySelector(`.menu a[data-category="${category}"]`);
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
  
  renderNotes(notesData);